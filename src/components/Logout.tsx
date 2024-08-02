"use client";

import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <button onClick={() => signOut()} className="bg-green-500 rounded-lg p-2">
      Logout
    </button>
  );
}
