import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  items: z.array(z.string()),
});

export const PATCH = auth(async (req, { params }) => {
  if (!params?.portfolio || typeof params.portfolio !== "string")
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
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

  const queries = [];

  for (const id of data.data.items) {
    queries.push(
      prisma.project.update({
        where: {
          id,
          portfolio: {
            userId: req.auth.user.id,
          },
        },
        data: { order: data.data.items.indexOf(id) },
      })
    );
  }

  await prisma.$transaction(queries);

  return NextResponse.json({ success: true });
});
