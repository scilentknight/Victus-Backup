"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // Hide the header on protected admin routes only (show on /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") return null;

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <Link href={"/"} className="text-xl font-bold">
        GargDental
      </Link>

      <nav className="hidden md:flex items-center gap-6 text-gray-600">
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <Link href="#" className="hover:text-black">
          Services
        </Link>
        <Link href="#" className="hover:text-black">
          About
        </Link>
        <Link href="#" className="hover:text-black">
          Contact
        </Link>
      </nav>

      <div className="flex items-center gap-3">
        <Link href="/login" className="px-4 py-2 text-sm text-gray-700 bg-green-600 rounded hover:text-black">
          Login
        </Link>
      </div>
    </header>
  );
}
