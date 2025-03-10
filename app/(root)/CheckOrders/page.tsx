"use client";

import { getOrdersByUserId } from "@/lib/actions/Order";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [orders, setOrders] = useState<any[]>([]);
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
      console.log("Fetched Orders:", result);

      if (result?.success && Array.isArray(result.data)) {
        toast.success("Orders fetched successfully!");
        setOrders(result.data);
      } else {
        toast.error(result?.error || "Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
      console.error("Fetch Error:", error);
    }
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900 text-center font-bebas tracking-wide">Track Your Orders</h1>

      <Card className="p-8 bg-white border border-gray-300 rounded-xl shadow-lg">
        <Table aria-label="Orders Table">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="p-4 text-gray-700">Order ID</TableHead>
              <TableHead className="p-4 text-gray-700">Customer</TableHead>
              <TableHead className="p-4 text-gray-700">Products</TableHead>
              <TableHead className="p-4 text-gray-700">Total Amount</TableHead>
              <TableHead className="p-4 text-gray-700">Payment</TableHead>
              <TableHead className="p-4 text-gray-700">Status</TableHead>
              <TableHead className="p-4 text-gray-700">Ordered On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order._id} className="hover:bg-gray-50 transition-all border-b">
                  <TableCell className="p-4 font-mono text-sm">{order._id.slice(-6)}</TableCell>
                  <TableCell className="p-4 font-semibold text-gray-800">{order.shippingAddress?.fullName || "N/A"}</TableCell>
                  <TableCell className="p-4 text-left space-y-2">
                    {order.products && Array.isArray(order.products) ? (
                      order.products.map((item) => (
                        <div key={item._id} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium">
                          {item?.product?.ProductName} x {item?.quantity}
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-500">No products</span>
                    )}
                  </TableCell>
                  <TableCell className="p-4 font-semibold text-gray-900">Rs {order.totalAmount || "0"}</TableCell>
                  <TableCell className="p-4 text-gray-700">{order.payment?.paymentMethod || "N/A"} ({order.payment?.status || "N/A"})</TableCell>
                  <TableCell className={`p-4 font-semibold ${order.status === "Shipped" ? "text-green-600" : "text-blue-600"}`}>{order.status || "Unknown"}</TableCell>
                  <TableCell className="p-4 text-gray-600">{order.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-gray-500 font-medium">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <Button variant="outline" onClick={() => fetchOrderbyUser(User_Id)} className="w-full py-3 text-lg font-semibold border-gray-400 hover:bg-gray-100">
        Refresh Orders
      </Button>
    </div>
  );
};

export default Page;
