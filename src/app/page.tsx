import Navbar from "@/components/home/Navbar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home({ skipAuth }: { skipAuth?: boolean }) {
  if (!skipAuth) {
    const session = await auth();
    if (session) return redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen w-full flex-col p-2 gap-3">
      <Navbar />

      <h1 className="text-4xl font-extrabold mt-10 ml-10">
        Create your next portfolio,<br /> for free
      </h1>
    </main>
  );
}
