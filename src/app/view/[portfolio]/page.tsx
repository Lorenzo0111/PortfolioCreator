"use client";

import { useFetcher } from "@/components/fetcher";
import Project from "@/components/view/Project";
import type { Portfolio, Project as ProjectType } from "@prisma/client";
import { notFound } from "next/navigation";

export default function PortfolioView({
  params,
}: {
  params: { portfolio: string };
}) {
  const { data, isLoading } = useFetcher<
    Portfolio & {
      projects: ProjectType[];
    }
  >(`/api/portfolio/${params.portfolio}?view=true`);

  if (isLoading) return null;
  if (!data) return notFound();

  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-3">
      <title>{data.title}</title>

      <h1 className="font-extrabold text-2xl">{data.title}</h1>
      {data.projects.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </div>
  );
}
