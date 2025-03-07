"use client";
import React from "react";
import { Bar, BarChart } from "recharts";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const page = () => {
  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">DashBoard</h2>
      </div>

      <div className="mt-7 flex gap-4 w-full overflow-hidden">
        {/* Chart on the left with smaller size and border */}
        <ChartContainer
          config={chartConfig}
          className="flex-shrink-0 w-[250px] h-[200px] min-h-[100px] border-2 border-gray-300 rounded-md"
        >
          <BarChart accessibilityLayer data={chartData}>
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </div>

      {/* Orders Table below the chart */}
      <div className="mt-7 w-full overflow-x-auto">
        <Table>
          <TableCaption>A list of recent orders</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Dummy order data */}
            <TableRow>
              <TableCell>ORD001</TableCell>
              <TableCell>Shipped</TableCell>
              <TableCell>$120.00</TableCell>
              <TableCell>2025-03-07</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ORD002</TableCell>
              <TableCell>Processing</TableCell>
              <TableCell>$200.00</TableCell>
              <TableCell>2025-03-06</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ORD003</TableCell>
              <TableCell>Delivered</TableCell>
              <TableCell>$75.00</TableCell>
              <TableCell>2025-03-05</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default page;
