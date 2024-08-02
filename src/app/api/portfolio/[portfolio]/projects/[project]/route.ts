import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { upsertSchema } from "../route";

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

export const PATCH = auth(async (req, { params }) => {
  if (
    !params?.portfolio ||
    typeof params.portfolio !== "string" ||
    !params?.project ||
    typeof params.project !== "string"
  )
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  if (!req.auth?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const project = await prisma.project.findUnique({
    where: {
      portfolioSlug_slug: {
        portfolioSlug: params.portfolio,
        slug: params.project,
      },
      portfolio: {
        userId: req.auth.user.id,
      },
    },
  });

  if (!project)
    return NextResponse.json({ error: "Project not found" }, { status: 404 });

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

  await prisma.project.update({
    where: {
      id: project.id,
    },
    data: data.data,
  });

  return NextResponse.json({ success: true });
});
