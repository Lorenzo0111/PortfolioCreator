import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const createSchema = z.object({
  title: z.string(),
  description: z.string(),
  url: z.string().optional(),
  imageUrl: z.string().optional(),
  order: z.number().optional(),
  slug: z.string(),
});

export const PUT = auth(async (req, { params }) => {
  if (!params?.slug || typeof params.slug !== "string")
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  if (!req.auth?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const data = createSchema.safeParse(body);

  if (!data.success) {
    return NextResponse.json(
      {
        error: "Invalid request body",
      },
      { status: 400 }
    );
  }

  try {
    const projects = await prisma.project.count({
      where: {
        portfolio: { slug: params.slug },
      },
    });

    const project = await prisma.project.create({
      data: {
        ...data.data,
        order: data.data.order || projects + 1,
        portfolio: { connect: { slug: params.slug } },
      },
    });

    if (data.data.order) {
      await prisma.project.updateMany({
        where: {
          portfolio: { slug: params.slug },
          order: { gte: data.data.order },
          id: { not: project.id },
        },
        data: {
          order: {
            increment: 1,
          },
        },
      });
    }

    return NextResponse.json(project);
  } catch (_) {
    return NextResponse.json({ error: "Slug already in use" }, { status: 400 });
  }
});
