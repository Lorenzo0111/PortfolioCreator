import type { Project } from "@prisma/client";
import axios from "axios";
import { Pencil, Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { UploadButton } from "../uploadthing";
import { useState } from "react";

export default function UpsertProject({
  portfolio,
  project,
}: {
  portfolio: string;
  project?: Project;
}) {
  const [image, setImage] = useState<string>();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          {project ? <Pencil /> : <Plus />}
          {project ? "Edit" : "Add"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{project ? "Edit" : "Add"} project</DialogTitle>
          <DialogDescription>
            {project
              ? "Update your project details"
              : "Add a new project to your collection"}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const data = new FormData(e.target as HTMLFormElement);
            const title = data.get("title") as string;
            const description = data.get("description") as string;
            const url = data.get("url") as string;
            const slug = (data.get("slug") as string).toLowerCase();

            axios(
              `/api/portfolio/${portfolio}/projects${
                project ? `/${project.slug}` : ""
              }`,
              {
                method: project ? "PATCH" : "PUT",
                data: {
                  title,
                  description,
                  url,
                  slug,
                },
              }
            )
              .then(() => {
                window.location.reload();
              })
              .catch((error) => {
                alert(error.response.data.error);
              });
          }}
        >
          <div className="flex flex-col gap-3">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Example"
                defaultValue={project?.title}
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="An example project"
                defaultValue={project?.description}
              />
            </div>

            <div>
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                name="url"
                type="url"
                placeholder="https://example.com"
                defaultValue={project?.url ?? ""}
              />
            </div>

            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                placeholder="example"
                className="lowercase"
                defaultValue={project?.slug}
              />
            </div>
          </div>

          <UploadButton
            className="ut-button:w-full ut-allowed-content:hidden mt-3"
            content={{
              button: "Upload Image",
            }}
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImage(res[0].url);
            }}
          />

          <DialogFooter>
            <Button className="mt-3" type="submit">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
