import Navbar from "@/components/home/Navbar";
import Login from "@/components/Login";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home({ skipAuth }: { skipAuth?: boolean }) {
  const session = await auth();
  if (!skipAuth && session) return redirect("/dashboard");

  return (
    <main className="flex min-h-screen w-full flex-col gap-3">
      <div className="flex flex-col h-screen">
        <Navbar />

        <div className="m-auto flex justify-between items-center w-1/2">
          <div className="w-full">
            <h1 className="text-5xl font-extrabold">
              Create your next portfolio,
              <br /> <span className="text-primary">for free</span>
            </h1>

            {session ? (
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <Login />
            )}
          </div>

          <Image
            src="/devices.png"
            alt="Devices frames"
            width={800}
            height={800}
          />
        </div>
      </div>
    </main>
  );
}
