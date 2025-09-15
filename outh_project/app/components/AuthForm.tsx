"use client";
import { signIn } from "next-auth/react";

export default function AuthForm() {
  return (
    <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold">Sign In</h2>
      <button
        onClick={() => signIn("google")}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Sign in with Google
      </button>
    </div>
  );
}
