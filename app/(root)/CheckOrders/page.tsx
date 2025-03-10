"use client";

import { getOrdersByUserId } from "@/lib/actions/Order";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [orders, setOrders] = useState<any[]>([]); // Ensure orders is always an array
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const User_Id = session?.user?.id;

  useEffect(() => {
    if (token && User_Id) {
      fetchOrderbyUser(User_Id);
    }
  }, [token, User_Id]);

  const fetchOrderbyUser = async (User_Id: string) => {
    try {
      const result = await getOrdersByUserId(User_Id);
      console.log("Fetched Orders:", result); // Debugging

      if (result?.success && Array.isArray(result.data)) {
        toast.success("Orders fetched successfully!");
        setOrders(result.data); // Ensure it's an array
      } else {
        toast.error(result?.error || "Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
      console.error("Fetch Error:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Track Your Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-2 border">Order ID</th>
              <th className="px-4 py-2 border">Customer</th>
              <th className="px-4 py-2 border">Products</th>
              <th className="px-4 py-2 border">Total Amount</th>
              <th className="px-4 py-2 border">Payment</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Ordered On</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="text-center">
                  <td className="px-4 py-2 border">{order._id.slice(-6)}</td>
                  <td className="px-4 py-2 border">{order.shippingAddress?.fullName || "N/A"}</td>
                  <td className="px-4 py-2 border text-left">
                    {order.products && Array.isArray(order.products) ? (
                      order.products.map((item) => (
                        <div key={item._id}>
                          {item?.product?.ProductName} x {item?.quantity}
                        </div>
                      ))
                    ) : (
                      <span>No products</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border">Rs {order.totalAmount || "0"}</td>
                  <td className="px-4 py-2 border">{order.payment?.paymentMethod || "N/A"} ({order.payment?.status || "N/A"})</td>
                  <td className="px-4 py-2 border font-semibold text-blue-600">{order.status || "Unknown"}</td>
                  <td className="px-4 py-2 border">{order.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
