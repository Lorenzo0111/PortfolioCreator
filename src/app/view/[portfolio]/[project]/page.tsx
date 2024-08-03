"use client";

import { useFetcher } from "@/components/fetcher";
import { Button } from "@/components/ui/button";
import type { Portfolio, Project } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function ProjectView({
  params,
}: {
  params: { portfolio: string; project: string };
}) {
  const { data, isLoading } = useFetcher<
    Portfolio & {
      projects: Project[];
    }
  >(`/api/portfolio/${params.portfolio}`);
  const { data: projectData, isLoading: isProjectLoading } =
    useFetcher<Project>(
      `/api/portfolio/${params.portfolio}/projects/${params.project}?view=true`
    );

  if (isLoading || isProjectLoading) return null;

  return (
    <div className="flex flex-col gap-3 p-8">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-2xl font-extrabold">
          {data?.title} - {projectData?.title}
        </h1>
      </div>
      <p>{projectData?.description}</p>
      {projectData?.url && (
        <Button asChild>
          <Link href={projectData.url}>View</Link>
        </Button>
      )}

      {projectData?.imageUrl && (
        <Image
          src={projectData.imageUrl}
          width={400}
          height={400}
          alt={projectData.title}
        />
      )}
    </div>
  );
}
