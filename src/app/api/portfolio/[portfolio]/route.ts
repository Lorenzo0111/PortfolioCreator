import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { upsertSchema } from "../create/route";

export const GET = auth(async (req, { params }) => {
  if (!params?.portfolio || typeof params.portfolio !== "string")
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const query = req.nextUrl.searchParams;

  const portfolio = await prisma.portfolio.findUnique({
    where: {
      slug: params.portfolio,
    },
    include: {
      projects: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  if (portfolio && query.has("view")) {
    await prisma.portfolio.update({
      where: {
        slug: portfolio.slug,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  }

  return NextResponse.json(portfolio);
});

export const PATCH = auth(async (req, { params }) => {
  if (!params?.portfolio || typeof params.portfolio !== "string")
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  if (!req.auth?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const portfolio = await prisma.portfolio.findUnique({
    where: {
      userId: req.auth.user.id,
      slug: params.portfolio,
    },
  });

  if (!portfolio)
    return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });

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
    await prisma.portfolio.update({
      where: {
        slug: portfolio.slug,
      },
      data: data.data,
    });

    return NextResponse.json({ success: true });
  } catch (_) {
    return NextResponse.json({ error: "Slug already in use" }, { status: 400 });
  }
});
