import Login from "@/components/Login";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session) return redirect("/dashboard");

  return (
    <main className="flex min-h-screen w-full justify-center items-center flex-col p-8">
      <Login />
    </main>
  );
}
