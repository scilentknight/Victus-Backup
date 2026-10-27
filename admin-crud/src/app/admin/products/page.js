"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import AdminLayout from "../AdminLayout/page";

// show products
const ShowProducts = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();

      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    } finally {
    }
  };

  // delete product
  const deleteProduct = async (id) => {
    console.log("deleteProduct called with:", id);

    const confirmed = confirm("Are you sure you want to delete?");
    if (!confirmed) return;

    try {
      console.log("Sending DELETE request...");

      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      console.log("Response received:", res);

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        getProducts();
      } else {
        toast.error(data.message || "Failed to delete");
      }
    } catch (error) {
      console.log("Fetch error:", error);
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <AdminLayout>
      <div className="p-4">
        <div className="flex justify-between py-5 items-center">
          <h2 className="text-gray-700 font-semibold text-xl">Products</h2>

          <Link href="/admin/products/AddProduct" className="bg-gray-900 px-4 py-2 rounded text-white">
            Add
          </Link>
        </div>

        <div className="w-full">
          <table className="border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-200 border-b border-gray-300">
                <th className="px-3 py-2 text-left">S.N</th>
                <th className="px-3 py-2 text-left">Product Name</th>
                <th className="px-3 py-2 text-left">Quantity</th>
                <th className="px-3 py-2 text-left">Price</th>
                <th className="px-3 py-2 text-center" width="100">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-10 bg-white text-center text-gray-700 text-sm">
                    Products not found
                  </td>
                </tr>
              )}

              {products.map((product, index) => (
                <tr key={product.pid} className="bg-white border-b border-gray-300">
                  <td className="px-3 py-2 text-left">{index + 1}</td>

                  <td className="px-3 py-2 text-left">{product.pname}</td>

                  <td className="px-3 py-2 text-left">{product.quantity}</td>

                  <td className="px-3 py-2 text-left">{product.price}</td>

                  <td>
                    <div className="flex justify-center space-x-2">
                      <Link key={product.pid} href={`/admin/products/EditProduct/${product.pid}`} className="text-gray-700">
                        <BsPencilSquare />
                      </Link>

                      <button onClick={() => deleteProduct(product.pid)} className="text-red-500">
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ShowProducts;
