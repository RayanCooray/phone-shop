"use client";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { DollarSign, ShoppingCart, MoreHorizontal, Filter } from "lucide-react";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@/components/ui/menubar";
import { useSession } from "next-auth/react";
import { getAllOrders } from "@/lib/actions/Order";
import { toast } from "sonner";

Chart.register(ArcElement, Tooltip, Legend);


const computeChartData = (orders) => {
  const statusCounts = {
    Shipped: 0,
    Cancelled: 0,
    Delivered: 0,
    Pending: 0,
    Processing: 0,
  };

  orders.forEach((order) => {
    if (statusCounts[order.status] !== undefined) {
      statusCounts[order.status] += order.totalAmount;
    }
  });

  return {
    labels: ["Shipped", "Cancelled", "Delivered", "Pending", "Processing"], 
    datasets: [
      {
        data: [
          statusCounts.Shipped, 
          statusCounts.Cancelled, 
          statusCounts.Delivered, 
          statusCounts.Pending, 
          statusCounts.Processing
        ],
        backgroundColor: [
          "#FF6F61",  
          "#6A0572",  
          "#1E88E5",  
          "#FFB400",  
          "#2E8B57"   
        ],
        hoverBackgroundColor: [
          "#D84315",  
          "#4A148C",  
          "#1565C0",  
          "#FF8F00",  
          "#006400"   
        ],
      },
    ],
  };
};


const Page = () => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const [orders, setOrders] = useState([]);
  const totalIncome = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalSales = orders.length;
  const [chartData, setChartData] = useState(computeChartData([]));

  useEffect(() => {
    setChartData(computeChartData(orders));
  }, [orders]);

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
  return (
    <section className="w-full rounded-2xl bg-white p-7 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
      </div>

      <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-gradient-to-r from-green-500 to-green-300 text-white shadow-md flex items-center gap-4 w-full">
          <div className="p-3 bg-white/20 rounded-full">
            <DollarSign size={28} strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-lg font-medium">Total Income</h3>
            <p className="text-3xl font-bold mt-2">Rs {totalIncome}</p>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-r from-blue-500 to-blue-300 text-white shadow-md flex items-center gap-4 w-full">
          <div className="p-3 bg-white/20 rounded-full">
            <ShoppingCart size={28} strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-lg font-medium">Total Sales</h3>
            <p className="text-3xl font-bold mt-2">{totalSales}</p>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap lg:flex-nowrap gap-10">
        <div className="lg:w-2/3 w-full rounded-2xl bg-[#F1F1F1] p-6 text-black shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            <Menubar className="bg-gray-800 text-white rounded-lg">
              <MenubarMenu>
                <MenubarTrigger className="px-4 py-2 flex items-center gap-2">
                  <Filter size={18} />
                  Filter
                </MenubarTrigger>
                <MenubarContent className="bg-gray-900 text-white rounded-lg">
                  <MenubarItem>All</MenubarItem>
                  <MenubarItem>Success</MenubarItem>
                  <MenubarItem>Processing</MenubarItem>
                  <MenubarItem>Failed</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
          
 
          <div className="mt-7 w-full overflow-auto">
            <table className="w-full border-collapse min-w-[400px]">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 text-left min-w-[100px]">Status</th>
                  <th className="py-3 text-left min-w-[150px]">Email</th>
                  <th className="py-3 text-left min-w-[80px]">Amount</th>
                  <th className="py-3 text-left min-w-[50px]"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((payment) => (
                  <tr key={payment._id} className="border-b border-gray-800">
                    <td className="py-4">{payment.status}</td>
                    <td className="py-4">{payment.user.email}</td>
                    <td className="py-4">Rs {payment.totalAmount.toLocaleString()}</td>
                    <td className="py-4">
                      <MoreHorizontal size={20} className="text-gray-500 cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


        <div className="lg:w-1/3 w-full bg-[#F1F1F1] p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Distribution</h2>
          <div className="w-full flex justify-center">
            <Doughnut data={chartData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
