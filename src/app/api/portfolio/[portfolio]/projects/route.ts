import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export const upsertSchema = z.object({
  title: z.string(),
  description: z.string(),
  url: z.string().optional(),
  imageUrl: z.string().optional(),
  slug: z.string().toLowerCase(),
});

export const PUT = auth(async (req, { params }) => {
  if (!params?.portfolio || typeof params.portfolio !== "string")
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  if (!req.auth?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const data = upsertSchema.safeParse(body);

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
        portfolio: { slug: params.portfolio },
      },
    });

    const project = await prisma.project.create({
      data: {
        ...data.data,
        order: projects + 1,
        portfolio: { connect: { slug: params.portfolio } },
      },
    });

    return NextResponse.json(project);
  } catch (_) {
    return NextResponse.json({ error: "Slug already in use" }, { status: 400 });
  }
});
