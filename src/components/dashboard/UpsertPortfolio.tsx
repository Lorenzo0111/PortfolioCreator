import axios from "axios";
import { Pencil, Plus } from "lucide-react";
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
import type { Portfolio } from "@prisma/client";

export default function UpsertPortfolio({
  portfolio,
}: {
  portfolio?: Portfolio;
}) {
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          {portfolio ? <Pencil /> : <Plus />}
          {portfolio ? "Edit" : "Add"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{portfolio ? "Edit" : "Add"} portfolio</DialogTitle>
          <DialogDescription>
            {portfolio
              ? "Update your portfolio details"
              : "Create your next amazing portfolio"}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const data = new FormData(e.target as HTMLFormElement);
            const title = data.get("title") as string;
            const slug = (data.get("slug") as string).toLowerCase();
            const domain = data.has("domain")
              ? (data.get("domain") as string).toLowerCase()
              : undefined;

            axios(`/api/portfolio/${portfolio?.slug || "create"}`, {
              method: portfolio ? "PATCH" : "POST",
              data: { title, slug, domain },
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
              <Input
                id="title"
                name="title"
                placeholder="Example"
                defaultValue={portfolio?.title}
              />
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                placeholder="example"
                className="lowercase"
                defaultValue={portfolio?.slug}
              />
            </div>
            {portfolio && (
              <div>
                <Label htmlFor="domain">Domain</Label>
                <Input
                  id="domain"
                  name="domain"
                  placeholder="example.com"
                  className="lowercase"
                  defaultValue={portfolio.domain ?? ""}
                />
              </div>
            )}
          </div>
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
