"use client";

import CreateProject from "@/components/dashboard/CreateProject";
import Project from "@/components/dashboard/Project";
import { useFetcher } from "@/components/fetcher";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import type { Portfolio, Project as ProjectType } from "@prisma/client";
import axios from "axios";

export default function PortfolioDashboard({
  params,
}: {
  params: { portfolio: string };
}) {
  const { data, isLoading, mutate } = useFetcher<
    Portfolio & {
      projects: ProjectType[];
    }
  >(`/api/portfolio/${params.portfolio}`);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (isLoading) return null;

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      let items = data?.projects.map((project) => project.id) ?? [];
      const oldIndex = items.indexOf(active.id as string);
      const newIndex = items.indexOf(over?.id as string);

      items = arrayMove(items, oldIndex, newIndex);

      axios
        .patch(`/api/portfolio/${params.portfolio}/reorder`, {
          items,
        })
        .then(
          () =>
            data &&
            mutate({
              ...data,
              projects: arrayMove(data.projects, oldIndex, newIndex),
            })
        );
    }
  }

  return (
    <div className="flex flex-col gap-3 p-8">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-2xl font-extrabold">{data?.title}</h1>
        <CreateProject portfolio={params.portfolio} />
      </div>
      <div className="flex gap-3 flex-wrap">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={data?.projects ?? []}
            strategy={horizontalListSortingStrategy}
          >
            {data?.projects.map((project) => (
              <Project project={project} key={project.id} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
