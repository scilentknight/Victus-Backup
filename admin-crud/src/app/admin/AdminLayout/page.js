"use client";

import Link from "next/link";
import { FaHome, FaRegListAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminLayout({ children }) {
  const [displayName, setDisplayName] = useState("Admin");
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      localStorage.removeItem("token");
      toast.success("Logged out successfully");
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    fetch("/api/admin/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.displayName) {
          setDisplayName(data.displayName);
        }
      })
      .catch((err) => console.error("Failed to load user info:", err));
  }, []);

  return (
    <div className="bg-gray-100 flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-white w-64 md:block hidden">
        <div className="pt-4 px-5 pb-3">
          <Link href="#">
            <span className="text-3xl text-green-500 font-bold">Admin</span>
            <span className="text-3xl text-slate-800 font-bold">Panel</span>
          </Link>
        </div>

        <nav className="flex flex-col px-3">
          <Link href="/admin/dashboard" className="text-lg flex items-center text-gray-700 font-medium hover:bg-gray-100 px-3 py-1.5 rounded-md">
            <FaHome className="me-2" />
            Dashboard
          </Link>

          <Link href="/admin/users" className="text-lg flex items-center text-gray-700 font-medium hover:bg-gray-100 px-3 py-1.5 rounded-md">
            <FaRegListAlt className="me-2" />
            Manage Users
          </Link>

          <Link href="/admin/products" className="text-lg flex items-center text-gray-700 font-medium hover:bg-gray-100 px-3 py-1.5 rounded-md">
            <FaRegListAlt className="me-2" />
            Manage Products
          </Link>

          <Link href="/admin/payments" className="text-lg flex items-center text-gray-700 font-medium hover:bg-gray-100 px-3 py-1.5 rounded-md">
            <FaRegListAlt className="me-2" />
            Manage Payments
          </Link>

          <Link href="/admin/queries" className="text-lg flex items-center text-gray-700 font-medium hover:bg-gray-100 px-3 py-1.5 rounded-md">
            <FaRegListAlt className="me-2" />
            Manage Queries
          </Link>

          <Link href="/admin/settings" className="text-lg flex items-center text-gray-700 font-medium hover:bg-gray-100 px-3 py-1.5 rounded-md">
            <FaRegListAlt className="me-2" />
            Settings
          </Link>
        </nav>
      </div>

      {/* Right Container */}
      <div className="flex-1 p-5">
        <div className="bg-white rounded-md px-4 py-3.5 w-full flex justify-between">
          <div className="text-gray-700">
            Welcome, <span className="text-gray-900 font-bold">{displayName}</span>
          </div>

          <button onClick={handleLogout} className="bg-red-400 rounded-md text-sm px-3 py-1 text-white hover:bg-red-500 cursor-pointer transition-colors duration-200">
            Logout
          </button>
        </div>

        {/* PAGE CONTENT GOES HERE */}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
