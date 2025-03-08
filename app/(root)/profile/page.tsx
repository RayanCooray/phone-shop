"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useSession } from "next-auth/react";
import { ProfileCreate ,fetchProfile } from "@/lib/actions/Profile";
import { toast } from "sonner";
import { auth } from "@/auth";

const profileSchema = z.object({
  firstName: z.string().min(2, "First Name must be at least 2 characters"),
  lastName: z.string().min(2, "Last Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  contact: z.string().min(10, "Enter a valid contact number"),
  addressLine1: z.string().min(5, "Address must be at least 5 characters"),
  apartment: z.string().optional(),
  province: z.string().min(2, "Enter a valid province"),
  country: z.string().min(2, "Enter a valid country"),
  postalCode: z.string().min(4, "Enter a valid postal code"),
  profileImage: z.string().optional(),
});

const Page = () => {
  const { data: session, status } = useSession();
  const [profileImage, setProfileImage] = useState("");
  const [currentSession, setCurrentSession] = useState(null);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: session?.user?.name?.split(" ")[0] || "",
      lastName: session?.user?.name?.split(" ")[1] || "",
      email: session?.user?.email || "",
      contact: "",
      addressLine1: "",
      apartment: "",
      province: "",
      country: "",
      postalCode: "",
      profileImage: "",
    },
  });

  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("hasReloaded");
    if (!hasReloaded) {
      sessionStorage.setItem("hasReloaded", "true");
      window.location.reload();
    }
  }, []);

  // Fetch session on component load
  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await auth();
      setCurrentSession(sessionData);
    };

    fetchSession();
  }, []);

  useEffect(() => {
    if (!session?.user?.accessToken) return;

    const getProfile = async () => {
      try {
        const accessToken = session.user.accessToken;
        const accessedUserEmail = session.user.email;

        const result = await fetchProfile(accessToken, accessedUserEmail);

        if (result.success && result.data) {
          console.log("Profile Data:", result.data);
          form.reset(result.data);
          setProfileImage(result.data.profileImage || "");
        } else {
          console.error("Error fetching profile:", result.error);
        }
      } catch (error) {
        console.error("Unexpected error fetching profile:", error);
      }
    };

    getProfile();
  }, [session]);

  useEffect(() => {
    console.log("Session from useSession:", session);
    console.log("Current session from getSession:", currentSession);
    console.log("Status:", status);
  }, [session, currentSession, status]);

  const onSubmit = (data: z.infer<typeof profileSchema>) => {
    const token = session?.user?.accessToken;
    
    console.log("Session Object:", session);
    console.log("Access Token:", token);

    if (!token) {
        console.error("No access token found!");
        return;
    }

    ProfileCreate({
      ...data,
      accessToken: token
    }).then((response) => {
      if (response.success) {
        toast.success("Profile successfully updated!");
        
    } else {
        toast.error(`Profile update failed: ${response.error}`);
    }
    });
};

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
  
    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("folder", "/uploads");
  
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
      if (result.url) {
        setProfileImage(result.url);
        form.setValue("profileImage", result.url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed!");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading image.");
    }
  };
  

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      <motion.div
        className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-gray-900 text-white p-5 rounded-2xl shadow-lg"
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
                  <AvatarImage
                    src={profileImage || "https://via.placeholder.com/100"}
                  />
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
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Email" {...field} readOnly disabled/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Contact" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Address Line 1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="apartment"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Apartment (Optional)" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Province" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Postal Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700"
              >
                Save Changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
