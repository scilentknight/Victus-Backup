"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Register User
  const registerUser = async (data) => {
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
        router.push("/user/login");
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
    <div className="bg-gray-200 lg:px-8 px-5 w-full flex justify-center items-center py-30 mb-10">
      {/* Registration Form */}
      <div className="max-w-md w-full rounded-md px-8 py-7 shadow-md bg-white">
        <h1 className="text-2xl text-gray-800 font-bold text-center">Register</h1>
        <form className="space-y-4" onSubmit={handleSubmit(registerUser)}>
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-900 mb-2">Full Name</label>

            <input
              {...register("name", {
                required: "The name field is required.",

                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters long.",
                },

                pattern: {
                  value: /^[A-Z][a-z]+(\s[A-Z][a-z]+)+$/,
                  message: "Enter full name starting with capital letters.",
                },
              })}
              type="text"
              className="border border-gray-200 px-3 py-2 rounded"
              placeholder="Enter Full Name"
            />

            {errors?.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="" className="text-sm text-gray-800 mb-1">
              Email
            </label>
            <input
              {...register("email", {
                required: "The email field is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              type="text"
              placeholder="Enter Email"
              className="px-3 py-2 border border-gray-200 shadow rounded-md"
            />
            {errors?.email && <p className="text-red-500"> {errors?.email.message}</p>}
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-800 mb-1">Phone</label>

            <input
              {...register("phone", {
                required: "Phone number is required.",

                validate: (value) => {
                  if (!value) return "Phone number is required.";

                  if (!/^\d+$/.test(value)) {
                    return "Phone must contain only numbers";
                  }

                  if (value.length !== 10) {
                    return "Phone must be exactly 10 digits long";
                  }

                  if (!/^(98|97)/.test(value)) {
                    return "Phone must start with 98 or 97";
                  }

                  return true;
                },
              })}
              type="text"
              className="border border-gray-200 px-3 py-2 rounded"
              placeholder="Enter Phone number"
            />

            {errors?.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-800 mb-1">Password</label>

            <input
              {...register("password", {
                required: "Password is required.",

                validate: (value) => {
                  if (value.length < 8) {
                    return "Password must be at least 8 characters long";
                  }

                  if (!/^[A-Z]/.test(value)) {
                    return "Password must start with a capital letter";
                  }

                  if (!/[a-z]/.test(value)) {
                    return "Password must include at least one lowercase letter";
                  }

                  if (!/\d/.test(value)) {
                    return "Password must include at least one number";
                  }

                  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                    return "Password must include at least one special character";
                  }

                  return true;
                },
              })}
              type="password"
              placeholder="Enter Password"
              className="px-3 py-2 border border-gray-200 shadow rounded-md"
            />

            {errors?.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-800 mb-1">Confirm Password</label>

            <input
              {...register("confirmPassword", {
                required: "Confirm password is required",

                validate: (value) => value === watch("password") || "Passwords do not match",
              })}
              type="password"
              placeholder="Enter Confirm Password"
              className="px-3 py-2 border border-gray-200 shadow rounded-md"
            />

            {errors?.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          <div className="flex flex-col space-y-2 pt-3">
            <button disabled={loading} className="bg-gray-900 px-5 py-2 w-full text-md rounded-md text-white text-center hover:bg-gray-700">
              {loading ? "Please wait ..." : "Register"}
            </button>
          </div>

          <div className="text-center text-sm text-gray-800">
            Already have an accocut?{" "}
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
