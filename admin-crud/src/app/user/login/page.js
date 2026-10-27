"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      if (data.token) localStorage.setItem("token", data.token);
      toast.success(data.message || "Login successful");
      router.push("/user/dashboard");
    } else {
      toast.error(data.message || "Invalid credentials");
    }
  };

  return (
    <div className="bg-gray-200 lg:px-8 px-5 w-full flex justify-center items-center py-30 mb-10">
      <div className="max-w-md w-full rounded-md px-8 py-7 shadow-md bg-white">
        <h1 className="text-2xl text-gray-800 font-bold text-center">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-800 mb-1">Email</label>
            <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} className="px-3 py-2 border border-gray-200 shadow rounded-md" />
          </div>

          {/* Password */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-800 mb-1">Password</label>
            <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} className="px-3 py-2 border border-gray-200 shadow rounded-md" />
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button type="submit" className="bg-green-400 px-5 py-2 w-full text-md rounded-md text-gray-800 hover:bg-gray-900 hover:text-white">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
