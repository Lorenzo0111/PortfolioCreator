"use client";

import UpsertPortfolio from "@/components/dashboard/UpsertPortfolio";
import { useFetcher } from "@/components/fetcher";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Portfolio } from "@prisma/client";
import Link from "next/link";

export default function Dashboard() {
  const { data, isLoading } = useFetcher<Portfolio[]>("/api/portfolio/list");
  if (isLoading) return null;

  return (
    <div className="flex flex-col gap-3 p-8">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-2xl font-extrabold">Dashboard</h1>
        <UpsertPortfolio />
      </div>
      <div className="flex gap-3 flex-wrap">
        {data?.map((portfolio) => (
          <Link href={`/dashboard/${portfolio.slug}`} key={portfolio.slug}>
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>{portfolio.title}</CardTitle>
                <CardDescription>
                  <span className="font-bold">{portfolio.views}</span> views
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
