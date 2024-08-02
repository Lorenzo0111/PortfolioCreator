import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = auth(async (req) => {
  if (!req.auth?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const portfolios = await prisma.portfolio.findMany({
    where: { userId: req.auth.user.id },
  });

  return NextResponse.json(portfolios);
});
