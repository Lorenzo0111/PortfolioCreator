import axios from "axios";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
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

export default function CreateProject({ portfolio }: { portfolio: string }) {
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add project</DialogTitle>
          <DialogDescription>
            Add a new project to your collection
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

            axios
              .put(`/api/portfolio/${portfolio}/projects`, {
                title,
                description,
                url,
                slug,
              })
              .then(() => {
                router.refresh();
              })
              .catch((error) => {
                alert(error.response.data.error);
              });
          }}
        >
          <div className="flex flex-col gap-3">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Example" />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="An example project"
              />
            </div>
            <div>
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                name="url"
                type="url"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                placeholder="example"
                className="lowercase"
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="mt-3" type="submit">
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
