"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <button
      onClick={() => signIn("github")}
      className="bg-green-500 rounded-lg p-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      Login
    </button>
  );
}
