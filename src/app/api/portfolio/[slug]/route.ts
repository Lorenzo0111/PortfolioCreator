import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = auth(async (req, { params }) => {
  if (!params?.slug || typeof params.slug !== "string")
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const portfolio = await prisma.portfolio.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      projects: true,
    },
  });

  return NextResponse.json(portfolio);
});
