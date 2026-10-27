"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLayout from "../AdminLayout/page";

const ShowPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // GET PAYMENTS
  const getPayments = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/payments");
      const data = await res.json();

      if (data.success) {
        setPayments(data.data);
      } else {
        toast.error(data.message || "Failed to load payments");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/payments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Status updated");
        getPayments();
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <AdminLayout>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Payments</h2>

        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">S.N</th>
              <th className="p-2 text-left">Paid By</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Method</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-5">
                  Loading...
                </td>
              </tr>
            ) : payments.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-5">
                  Payments not found
                </td>
              </tr>
            ) : (
              payments.map((payment, index) => (
                <tr key={payment.id} className="border-t">
                  <td className="p-2">{index + 1}</td>

                  <td className="p-2">{payment.paid_by}</td>

                  <td className="p-2">{payment.amount}</td>

                  <td className="p-2">{payment.payment_method}</td>

                  <td className="p-2">
                    {payment.payment_date
                      ? new Date(payment.payment_date).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="p-2 text-center">
                    {payment.status === "PENDING" ? (
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => updateStatus(payment.id, "SUCCESS")}
                          className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => updateStatus(payment.id, "REJECTED")}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          payment.status === "SUCCESS"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                      >
                        {payment.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ShowPayments;