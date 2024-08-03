import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Project } from "@prisma/client";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function Project({ project }: { project: Project }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable(project);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      className="w-[350px]"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>
          <div>
            <p>{project.description}</p>
            <p>
              <span className="font-bold">{project.views}</span> views
            </p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full" asChild>
          <Link href={`/dashboard/${project.portfolioSlug}/${project.slug}`}>
            Edit
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
