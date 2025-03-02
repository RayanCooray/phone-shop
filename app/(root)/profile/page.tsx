"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";


const profileSchema = z.object({
  firstName: z.string().min(2, "First Name must be at least 2 characters"),
  lastName: z.string().min(2, "Last Name must be at least 2 characters"),
  contact: z.string().min(10, "Enter a valid contact number"),
  addressLine1: z.string().min(5, "Address must be at least 5 characters"),
  apartment: z.string().optional(),
  province: z.string().min(2, "Enter a valid province"),
  country: z.string().min(2, "Enter a valid country"),
  postalCode: z.string().min(4, "Enter a valid postal code"),
  profileImage: z.string().optional(),
});

export default function ProfileEditPage() {
  const [profileImage, setProfileImage] = useState("");

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      contact: "",
      addressLine1: "",
      apartment: "",
      province: "",
      country: "",
      postalCode: "",
      profileImage: "",
    },
  });

  const onSubmit = (data: unknown) => {
    console.log("Profile Data:", data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setProfileImage(reader.result);
          form.setValue("profileImage", reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
     
      <motion.div
        className="w-2 md:w-1/4 bg-gray-900 text-white p-5 rounded-2xl shadow-lg"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
        <ul className="space-y-3">
          <li className="hover:text-gray-400 cursor-pointer">Account</li>
          <li className="hover:text-gray-400 cursor-pointer">Security</li>
          <li className="hover:text-gray-400 cursor-pointer">Notifications</li>
        </ul>
      </motion.div>

      
      <Card className="w-full md:w-3/4 p-6 shadow-xl">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              
              <motion.div
                className="flex flex-col md:flex-row items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
              >
                <Avatar className="w-20 h-20">
                  <AvatarImage src={profileImage || "https://via.placeholder.com/100"} />
                  <AvatarFallback>IMG</AvatarFallback>
                </Avatar>
                <input
                  type="file"
                  className="hidden"
                  id="profile-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="profile-upload"
                  className="cursor-pointer bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
                >
                  Upload
                </label>
              </motion.div>

              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="firstName" render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="lastName" render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="contact" render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Contact" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="addressLine1" render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Address Line 1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="apartment" render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Apartment (Optional)" {...field} />
                    </FormControl>
                  </FormItem>
                )} />

                <FormField control={form.control} name="province" render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Province" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="country" render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="postalCode" render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Postal Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>


             
              <Button type="submit" className="mt-6 w-full bg-blue-600 hover:bg-blue-700">
                Save Changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
