"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Hide the footer on protected admin routes only (show on /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") return null;

  return (
    <footer className="bg-black text-white py-6 text-center">
      <p>© {new Date().getFullYear()} DevCompany. All rights reserved.</p>
    </footer>
  );
}
