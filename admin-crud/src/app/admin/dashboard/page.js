"use client";

import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout/page";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    revenue: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, productsRes] = await Promise.all([fetch("/api/admin/users"), fetch("/api/admin/products")]);

        const usersData = await usersRes.json();
        const productsData = await productsRes.json();

        setStats({  
          totalUsers: usersData?.data?.length || 0,
          totalProducts: productsData?.data?.length || 0,
          totalOrders: 0,
          revenue: 0,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-gray-700 font-semibold text-2xl my-4">Dashboard</h2>

      <div className="grid md:grid-cols-4 grid-cols-2 gap-5">
        <div className="bg-white shadow-lg px-5 py-5 rounded-md">
          <h2 className="text-gray-700 text-xl font-medium">Total Users</h2>
          <p className="text-gray-900 font-bold text-2xl">{stats.totalUsers}</p>
        </div>

        <div className="bg-white shadow-lg px-5 py-5 rounded-md">
          <h2 className="text-gray-700 text-xl font-medium">Total Products</h2>
          <p className="text-gray-900 font-bold text-2xl">{stats.totalProducts}</p>
        </div>

        <div className="bg-white shadow-lg px-5 py-5 rounded-md">
          <h2 className="text-gray-700 text-xl font-medium">Total Orders</h2>
          <p className="text-gray-900 font-bold text-2xl">{stats.totalOrders}</p>
        </div>

        <div className="bg-white shadow-lg px-5 py-5 rounded-md">
          <h2 className="text-gray-700 text-xl font-medium">Revenue</h2>
          <p className="text-gray-900 font-bold text-2xl">Rs {stats.revenue}</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
