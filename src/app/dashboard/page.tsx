"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { Portfolio } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["portfolio"],
    queryFn: () =>
      axios.get<Portfolio[]>("/api/portfolio/list").then((res) => res.data),
  });

  if (isLoading) return null;

  return (
    <div>
      {data?.map((portfolio) => (
        <Link href={`/dashboard/${portfolio.slug}`} key={portfolio.slug}>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>{portfolio.title}</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
