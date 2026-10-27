"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import toast from "react-hot-toast";
import AdminLayout from "../../AdminLayout/page";

const CreateUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  /* =====================
     CREATE USER
  ===================== */
  const saveUser = async (data) => {
    setLoading(true);

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        toast.success(result.message);
        router.push("/admin/users");
      } else {
        toast.error(result.message || "Failed to create user");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center py-5">
        <h2 className="text-gray-700 font-semibold text-xl">Create User</h2>

        <Link href="/admin/users" className="bg-gray-900 px-4 py-2 rounded text-white">
          Back
        </Link>
      </div>

      <div className="w-full">
        <div className="shadow-lg bg-white px-5 py-4 rounded-md">
          <form className="space-y-4" onSubmit={handleSubmit(saveUser)}>
            {/* NAME */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-900 mb-2">Name</label>
              <input
                {...register("name", {
                  required: "The name field is required.",
                })}
                type="text"
                className="border border-gray-200 px-3 py-2 rounded"
                placeholder="Enter Name"
              />
              {errors?.name && <p className="text-red-500 text-sm">{errors?.name.message}</p>}
            </div>

            {/* USERNAME */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-900 mb-2">Username</label>
              <input
                {...register("username", {
                  required: "The username field is required.",
                })}
                type="text"
                className="border border-gray-200 px-3 py-2 rounded"
                placeholder="Enter Username"
              />
              {errors?.username && <p className="text-red-500 text-sm">{errors?.username.message}</p>}
            </div>

            {/* EMAIL */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-900 mb-2">Email</label>
              <input
                {...register("email", {
                  required: "The email field is required.",
                })}
                type="email"
                className="border border-gray-200 px-3 py-2 rounded"
                placeholder="Enter Email"
              />
              {errors?.email && <p className="text-red-500 text-sm">{errors?.email.message}</p>}
            </div>

            {/* PHONE */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-900 mb-2">Phone</label>
              <input {...register("phone")} type="text" className="border border-gray-200 px-3 py-2 rounded" placeholder="Enter Phone" />
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-900 mb-2">Password</label>
              <input
                {...register("password", {
                  required: "The password field is required.",
                })}
                type="password"
                className="border border-gray-200 px-3 py-2 rounded"
                placeholder="Enter Password"
              />
              {errors?.password && <p className="text-red-500 text-sm">{errors?.password.message}</p>}
            </div>

            {/* VERIFIED */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-900 mb-2">Verified</label>
              <select {...register("isVerified")} className="border border-gray-200 px-3 py-2 rounded">
                <option value={0}>Not Verified</option>
                <option value={1}>Verified</option>
              </select>
            </div>

            {/* ADMIN */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-900 mb-2">Admin</label>
              <select {...register("isAdmin")} className="border border-gray-200 px-3 py-2 rounded">
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </div>

            {/* BUTTON */}
            <button disabled={loading} className="bg-gray-900 px-4 py-2 cursor-pointer rounded text-white">
              {loading ? "Please wait ..." : "Create"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateUser;
