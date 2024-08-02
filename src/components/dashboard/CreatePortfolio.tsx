import { Plus } from "lucide-react";
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
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreatePortfolio() {
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create portfolio</DialogTitle>
          <DialogDescription>
            Create your next amazing portfolio here
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const data = new FormData(e.target as HTMLFormElement);
            const title = data.get("title") as string;
            const slug = (data.get("slug") as string).toLowerCase();

            axios
              .post("/api/portfolio/create", { title, slug })
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
              <Label htmlFor="title">Name</Label>
              <Input id="title" name="title" placeholder="Example" />
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
