import { auth } from "@/lib/auth";
import { Button } from "../ui/button";
import Login from "../Login";
import Link from "next/link";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="w-full flex justify-between items-center p-2 px-4 rounded-lg border">
      <h3 className="font-bold text-xl">Portfolio Creator</h3>
      {session?.user ? (
        <Button asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      ) : (
        <Login />
      )}
    </nav>
  );
}
