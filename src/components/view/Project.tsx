import type { Project } from "@prisma/client";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";

export default function Project({ project }: { project: Project }) {
  return (
    <Link href={`/view/${project.portfolioSlug}/${project.slug}`}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
