"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import toast from "react-hot-toast";
import AdminLayout from "../../AdminLayout/page";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  /* =====================
     ADD PRODUCT
  ===================== */
  const addProduct = async (data) => {
    setLoading(true);

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        toast.success(result.message);
        router.push("/admin/products");
      } else {
        toast.error(result.message || "Failed to add new product");
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
        <h2 className="text-gray-700 font-semibold text-xl">Add Product</h2>

        <Link href="/admin/products" className="bg-gray-900 px-4 py-2 rounded text-white">
          Back
        </Link>
      </div>

      <div className="w-full">
        <div className="shadow-lg bg-white px-5 py-4 rounded-md">
          <form className="space-y-4" onSubmit={handleSubmit(addProduct)}>
            {/* PRODUCT NAME */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-900 mb-2">Product Name</label>
              <input
                {...register("pname", {
                  required: "The product name field is required.",
                })}
                type="text"
                className="border border-gray-200 px-3 py-2 rounded"
                placeholder="Enter Product Name"
              />
              {errors?.name && <p className="text-red-500 text-sm">{errors?.name.message}</p>}
            </div>

            {/* QUANTITY */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-900 mb-2">Quantity</label>
              <input
                {...register("quantity", {
                  required: "Quantity is required.",
                })}
                type="number"
                className="border border-gray-200 px-3 py-2 rounded"
                placeholder="Enter Product Quantity"
              />
              {errors?.quantity && <p className="text-red-500 text-sm">{errors?.quantity.message}</p>}
            </div>

            {/* PRICE */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-900 mb-2">Price</label>
              <input
                {...register("price", {
                  required: "Price is required.",
                })}
                type="price"
                className="border border-gray-200 px-3 py-2 rounded"
                placeholder="Enter Price"
              />
              {errors?.price && <p className="text-red-500 text-sm">{errors?.price.message}</p>}
            </div>




            {/* BUTTON */}
            <button disabled={loading} className="bg-gray-900 px-4 py-2 cursor-pointer rounded text-white">
              {loading ? "Please wait ..." : "Add"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddProduct;
