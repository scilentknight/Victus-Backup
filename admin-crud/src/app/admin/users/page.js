"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import AdminLayout from "../AdminLayout/page";
// show users
const ShowUser = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();

      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    } finally {
    }
  };

  // delete user
  const deleteUser = async (id) => {
    console.log("deleteUser called with:", id);

    const confirmed = confirm("Are you sure you want to delete?");
    if (!confirmed) return;

    try {
      console.log("Sending DELETE request...");

      const res = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
      });

      console.log("Response received:", res);

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        getUsers();
      } else {
        toast.error(data.message || "Failed to delete");
      }
    } catch (error) {
      console.log("Fetch error:", error);
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <AdminLayout>
      <div className="p-4">
        <div className="flex justify-between py-5 items-center">
          <h2 className="text-gray-700 font-semibold text-xl">Users</h2>

          <Link href="/admin/users/CreateUser" className="bg-gray-900 px-4 py-2 rounded text-white">
            Create
          </Link>
        </div>

        <div className="w-full">
          <table className="border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-200 border-b border-gray-300">
                <th className="px-3 py-2 text-left">S.N</th>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Email</th>
                <th className="px-3 py-2 text-left">Role</th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-center" width="100">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-10 bg-white text-center text-gray-700 text-sm">
                    Users not found
                  </td>
                </tr>
              )}

              {users.map((user, index) => (
                <tr key={user.id} className="bg-white border-b border-gray-300">
                  <td className="px-3 py-2 text-left">{index + 1}</td>

                  <td className="px-3 py-2 text-left">{user.name}</td>

                  <td className="px-3 py-2 text-left">{user.email}</td>

                  <td className="px-3 py-2 text-left">{user.isAdmin ? <p className="text-green-500">Admin</p> : <p className="text-red-500">User</p>}</td>

                  <td className="px-3 py-2 text-left">{user.isVerified ? <p className="text-green-500">Verified</p> : <p className="text-red-500">Not Verified</p>}</td>

                  <td>
                    <div className="flex justify-center space-x-2">
                      <Link key={user._id} href={`/admin/users/EditUser/${user.id}`} className="text-gray-700">
                        <BsPencilSquare />
                      </Link>

                      <button onClick={() => deleteUser(user.id)} className="text-red-500">
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

export default ShowUser;
