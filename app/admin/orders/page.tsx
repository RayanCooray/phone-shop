"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { getAllOrders, updateOrderStatus } from "@/lib/actions/Order";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Page = () => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (token) {
      fetchOrders(token);
    }
  }, [token]);

  const fetchOrders = async (token) => {
    const result = await getAllOrders(token);
    if (result.success) {
      setOrders(result.data);
      toast.success("Orders fetched successfully!");
    } else {
      toast.error(result.error || "Failed to fetch orders");
    }
  };

  const handleStatusUpdate = async () => {
    if (!selectedOrder || !status) {
      toast.error("Please select an order and a status");
      return;
    }

    const result = await updateOrderStatus(selectedOrder, status, token);
    if (result.success) {
      fetchOrders(token);
      toast.success("Order status updated!");
    } else {
      toast.error(result.error || "Failed to update order status");
    }
  };

  return (
    <section className="w-full rounded-3xl bg-white p-7">
    
      <div className="mb-8">
        <h2 className="text-xl font-semibold">All Orders</h2>
        <Table className="mt-5 shadow-md rounded-2xl border">
  <TableCaption>Recent orders</TableCaption>
  <TableHeader className="bg-gray-100">
    <TableRow>
      <TableHead>Order ID</TableHead>
      <TableHead>Customer</TableHead>
      <TableHead>Payment</TableHead>
      <TableHead>Products</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Total Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {orders.length > 0 ? (
      orders.map((order) => (
        <TableRow key={order._id} className="border-b">
         
          <TableCell className="font-medium">{order._id.slice(-6)}</TableCell>

          
          <TableCell>{order.shippingAddress.fullName}</TableCell>

          
          <TableCell>
            {order.payment.paymentMethod} <br />
            <span className="text-gray-500 text-sm">•••• {order.payment.cardLast4Digits}</span>
          </TableCell>

          <TableCell>
            {order.products.map((item) => (
              <div key={item.product._id} className="mb-1">
                <span className="font-semibold">{item.product.ProductName}</span> (x{item.quantity})
              </div>
            ))}
          </TableCell>

          
          <TableCell>
            <span
              className={`px-3 py-1 rounded-full text-white text-sm ${
                order.status === "Pending"
                  ? "bg-yellow-500"
                  : order.status === "Processing"
                  ? "bg-blue-500"
                  : order.status === "Shipped"
                  ? "bg-purple-500"
                  : "bg-green-500"
              }`}
            >
              {order.status}
            </span>
          </TableCell>

          
          <TableCell className="text-right font-semibold">Rs {order.totalAmount.toLocaleString()}</TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={6} className="text-center text-gray-500">
          No orders found.
        </TableCell>
      </TableRow>
    )}
  </TableBody>
</Table>

        
      </div>

      
      <Card className="w-full shadow-lg rounded-xl border border-gray-200 p-6 bg-white">
  <CardHeader className="pb-4">
    <CardTitle className="text-lg font-semibold text-gray-700">
      Update Order Status
    </CardTitle>
    <p className="text-sm text-gray-500">Select an order and update its status</p>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    
      <div>
        <Label className="text-gray-600 font-medium">Select Order</Label>
        <Select onValueChange={setSelectedOrder}>
          <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500">
            <SelectValue placeholder="Choose Order" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-md rounded-lg">
            {orders.map((order) => (
              <SelectItem key={order._id} value={order._id}>
                🆔 {order._id.slice(-6)} - {order.shippingAddress.fullName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      
      <div>
        <Label className="text-gray-600 font-medium">Order Status</Label>
        <Select onValueChange={setStatus}>
          <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-md rounded-lg">
            <SelectItem value="Pending">🟡 Pending</SelectItem>
            <SelectItem value="Processing">🔄 Processing</SelectItem>
            <SelectItem value="Shipped">🚚 Shipped</SelectItem>
            <SelectItem value="Delivered">✅ Delivered</SelectItem>
            <SelectItem value="Cancelled">❌ Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

     
      <div className="flex items-end">
        <Button
          onClick={handleStatusUpdate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all"
        >
          🚀 Update Order
        </Button>
      </div>
    </div>
  </CardContent>
</Card>


    </section>
  );
};

export default Page;
