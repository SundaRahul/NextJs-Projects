"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center mt-20">
      <h1 className="text-4xl font-bold">🚀 Welcome to NextAuth + Tailwind</h1>
      {session ? (
        <>
          <p className="text-lg">Hello, {session.user?.name}</p>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Sign Out
          </button>
        </>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
}
