"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import toast from "react-hot-toast";
import AdminLayout from "@/app/admin/AdminLayout/page";

const EditProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Fetch the product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/admin/products/${params.id}`);
        const result = await res.json();

        if (result.success) {
          // pre-fill the form
          reset({
            pname: result.data.pname,
            quantity: result.data.quantity,
            price: result.data.price,
          });
        } else {
          toast.error(result.message || "Failed to fetch product");
        }
      } catch (error) {
        toast.error("Something went wrong.");
        console.log(error);
      } finally {
        setFetching(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id, reset]);

  /* =====================
     EDIT PRODUCT
  ===================== */
  const updateProduct = async (data) => {
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/products/${params.id}`, {
        method: "PUT",
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
        toast.error(result.message || "Failed to update product");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <AdminLayout>
        <div className="p-5">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center py-5">
        <h2 className="text-gray-700 font-semibold text-xl">Edit Product</h2>

        <Link href="/admin/products" className="bg-gray-900 px-4 py-2 rounded text-white">
          Back
        </Link>
      </div>

      <div className="w-full">
        <div className="shadow-lg bg-white px-5 py-4 rounded-md">
          <form className="space-y-4" onSubmit={handleSubmit(updateProduct)}>
            {/* PRODUCT NAME */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-900 mb-2">Product Name</label>
              <input
                {...register("pname", {
                  required: "The product is required.",
                })}
                type="text"
                className="border border-gray-200 px-3 py-2 rounded"
                placeholder="Enter Product Name"
              />
              {errors?.pname && <p className="text-red-500 text-sm">{errors?.pname.message}</p>}
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
              {loading ? "Please wait ..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditProduct;
