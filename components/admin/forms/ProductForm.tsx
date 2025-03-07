"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { phoneSchema } from "@/lib/validations";
import ColorPicker from "../ColorPicker";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { addProduct } from "@/lib/actions/Product";

interface Props {
  type?: "create" | "update";
}

const ProductForm = ({ type }: Props) => {
  const { data: session } = useSession();
  const [token, setToken] = useState<string | null>(null);

  // Set token once session data is available
  useEffect(() => {
    if (session?.user?.accessToken) {
      setToken(session?.user?.accessToken);
    }
  }, [session]);

  const form = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      ProductName: "",
      ProductDescription: "",
      ProductPrice: "",
      ProductQuantity: "",
      ProductCategory: "",
      ProductBrand: "",
      ProductColor: "", // default color value
      ProductSize: "",
      ProductRating: "",
      ProductImage: "",
    },
  });

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
        form.setValue("ProductImage", result.url); // Set the uploaded image URL
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed!");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading image.");
    }
  };

  const onSubmit = async (values: z.infer<typeof phoneSchema>) => {
    if (!token) {
      toast.error("Access token is missing.");
      return;
    }

    try {
      // Validate data against schema
      const parsedData = phoneSchema.safeParse(values);

      if (!parsedData.success) {
        const errorMessages = parsedData.error.errors.map((error) => error.message);
        toast.error(`Validation failed: ${errorMessages.join(", ")}`);
        return;
      }

      const response = await addProduct({
        productData: parsedData.data,
        accessToken: token,
      });

      if (response.success) {
        toast.success(`Product saved successfully! Token used: ${token}`);
      } else {
        toast.error(`Add Product to shop failed: ${response.error}`);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Something went wrong while adding the product.");
    }

    console.log("Form Values:", values);
    console.log("Token used:", token);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {Object.keys(form.getValues()).map((key) => {
          if (key === "ProductImage") {
            return (
              <FormField
                key={key}
                control={form.control}
                name={key as any}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-base font-normal text-dark-500">
                      Product Image
                    </FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        {form.getValues("ProductImage") && (
                          <div className="mt-4">
                            <Image
                              src={form.getValues("ProductImage")}
                              alt="Uploaded Image"
                              width={200}
                              height={200}
                              className="object-cover rounded-md"
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          } else if (key === "ProductColor") {
            return (
              <FormField
                key={key}
                control={form.control}
                name={key as any}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-base font-normal text-dark-500">
                      Primary Color
                    </FormLabel>
                    <FormControl>
                      <ColorPicker
                        onPickerChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          } else {
            return (
              <FormField
                key={key}
                control={form.control}
                name={key as any}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-base font-normal text-dark-500">
                      {key.replace("Product", "").replace(/([A-Z])/g, " $1").trim()}
                    </FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder={key.replace("Product", "")}
                        {...field}
                        className="product-form_input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          }
        })}
        <Button type="submit" className="product-form_btn text-white bg-blue-950">
          {type === "update" ? "Update Product" : "Add Product"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
