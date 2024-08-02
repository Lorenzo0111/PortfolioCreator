import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = auth(async (req, { params }) => {
  if (
    !params?.portfolio ||
    typeof params.portfolio !== "string" ||
    !params?.project ||
    typeof params.project !== "string"
  )
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const project = await prisma.project.findUnique({
    where: {
      portfolioSlug_slug: {
        portfolioSlug: params.portfolio,
        slug: params.project,
      },
    },
  });

  return NextResponse.json(project);
});

export const DELETE = auth(async (req, { params }) => {
  if (
    !params?.portfolio ||
    typeof params.portfolio !== "string" ||
    !params?.project ||
    typeof params.project !== "string"
  )
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  if (!req.auth?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.project.deleteMany({
    where: {
      slug: params.project,
      portfolio: {
        userId: req.auth.user.id,
        slug: params.portfolio,
      },
    },
  });

  return NextResponse.json({ success: true });
});
