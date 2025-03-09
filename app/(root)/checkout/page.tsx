"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";

const checkoutSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP Code is required"),
  country: z.string().min(1, "Country is required"),
  contactNumber: z.string().min(10, "Enter a valid phone number"),
  paymentMethod: z.enum(["Credit Card", "PayPal", "Google Pay", "Apple Pay"]),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits").optional(),
  cardHolder: z.string().min(1, "Cardholder name is required").optional(),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Enter a valid expiry date (MM/YY)").optional(),
  cvc: z.string().regex(/^\d{3,4}$/, "Enter a valid CVC (3 or 4 digits)").optional(),
});

const Page = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState("Credit Card");

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(cartItems);
    setTotalPrice(cartItems.reduce((sum, item) => sum + Number(item.ProductPrice), 0));
  }, []);

  const form = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      contactNumber: "",
      paymentMethod: "Credit Card",
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvc: "",
    },
  });

  const onSubmit = (data) => {
    toast.success(`Payment of ${totalPrice} LKR made via ${data.paymentMethod}!`);
    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col gap-6">
      <h2 className="text-3xl font-bold">Checkout</h2>
      <div>
        <h3 className="text-xl font-semibold">Order Summary</h3>
        <div className="mt-4 space-y-4">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div key={index} className="flex items-center gap-4 border-b pb-2">
                <Image src={item.ProductImage} alt={item.ProductName} width={50} height={50} className="rounded-lg" />
                <div>
                  <p className="font-semibold">{item.ProductName}</p>
                  <p className="text-yellow-600 font-semibold">{item.ProductPrice} LKR</p>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        {cart.length > 0 && <p className="mt-4 text-lg font-semibold">Total: {totalPrice} LKR</p>}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h3 className="text-xl font-semibold">Shipping Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(checkoutSchema.shape).slice(0, 7).map((field) => (
              <FormField
                key={field}
                name={field}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{field.name.replace(/([A-Z])/g, " $1").trim()}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={field.name} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <h3 className="text-xl font-semibold">Payment Method</h3>
          <select
            {...form.register("paymentMethod")}
            className="w-full border p-2 rounded-lg mt-2"
            onChange={(e) => setSelectedPayment(e.target.value)}
          >
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Google Pay">Google Pay</option>
            <option value="Apple Pay">Apple Pay</option>
          </select>
          <FormMessage />

          {selectedPayment === "Credit Card" && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg">
              {Object.keys(checkoutSchema.shape).slice(7).map((field) => (
                <FormField
                  key={field}
                  name={field}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{field.name.replace(/([A-Z])/g, " $1").trim()}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder={field.name} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <Button type="submit" className="bg-blue-950 hover:bg-blue-700 text-white py-2 px-5 rounded-lg">
              Pay {totalPrice} LKR with {selectedPayment}
            </Button>
            <Link href="/cart">
              <Button className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-5 rounded-lg">Back to Cart</Button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;