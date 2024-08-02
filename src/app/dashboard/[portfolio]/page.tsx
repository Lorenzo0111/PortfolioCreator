"use client";

import CreateProject from "@/components/dashboard/CreateProject";
import { useFetcher } from "@/components/fetcher";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { Portfolio, Project } from "@prisma/client";
import Link from "next/link";

export default function PortfolioDashboard({
  params,
}: {
  params: { portfolio: string };
}) {
  const { data, isLoading } = useFetcher<
    Portfolio & {
      projects: Project[];
    }
  >(`/api/portfolio/${params.portfolio}`);

  if (isLoading) return null;

  return (
    <div className="flex flex-col gap-3 p-8">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-2xl font-extrabold">{data?.title}</h1>
        <CreateProject portfolio={params.portfolio} />
      </div>
      <div className="flex gap-3 flex-wrap">
        {data?.projects.map((project) => (
          <Link
            href={`/dashboard/${params.portfolio}/${project.slug}`}
            key={project.slug}
          >
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
