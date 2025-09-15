"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <Link href="/" className="text-xl font-bold text-blue-600">NextAuthApp</Link>
      <div className="flex gap-6">
        <Link href="/about" className="hover:text-blue-500">About</Link>
        <Link href="/dashboard" className="hover:text-blue-500">Dashboard</Link>
        {session ? (
          <span className="text-sm text-gray-600">{session.user?.email}</span>
        ) : (
          <Link href="/" className="text-blue-500">Login</Link>
        )}
      </div>
    </nav>
  );
}
