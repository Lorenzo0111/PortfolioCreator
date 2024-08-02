import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  title: z.string(),
  slug: z.string().toLowerCase(),
});

export const POST = auth(async (req) => {
  if (!req.auth?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const data = schema.safeParse(body);

  if (!data.success) {
    return NextResponse.json(
      {
        error: "Invalid request body",
      },
      { status: 400 }
    );
  }

  try {
    const portfolio = await prisma.portfolio.create({
      data: {
        ...data.data,
        user: { connect: { id: req.auth.user.id } },
      },
    });

    return NextResponse.json(portfolio);
  } catch (_) {
    return NextResponse.json({ error: "Slug already in use" }, { status: 400 });
  }
});
