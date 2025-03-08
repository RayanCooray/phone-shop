"use client";

import { getProductById } from "@/lib/actions/Product";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, X } from "lucide-react"; // Added X icon for closing the slide
import Policy from "@/components/page/Policy";

const Page = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();
  const [product, setProduct] = useState<any>(null);
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);
  const [isSlideOpen, setIsSlideOpen] = useState(false); // New state to control the sliding window

  const fetchProductById = async (id: string, accessToken: string) => {
    try {
      const response = await getProductById(id, accessToken);
      if (response.success) {
        setProduct(response.data);
        setSelectedStorage(response.data.ProductStorageOptions?.[0]);
      }
    } catch (error) {
      console.error("GetProductById Error:", error);
      toast.error("Error fetching product");
    }
  };

  useEffect(() => {
    if (session) {
      fetchProductById(params.id, session.accessToken);
    }
  }, [params.id, session]);

  if (!product) {
    return (
      <h1 className="text-3xl text-black text-center mt-10">Loading...</h1>
    );
  }

  // Toggle the sliding window
  const toggleSlide = () => {
    setIsSlideOpen(!isSlideOpen);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-10 p-10 text-black max-w-6xl mx-auto bg-white">
        <div className="w-full md:w-1/2 bg-gray-100 p-4 rounded-lg shadow-lg">
          <Image
            src={product.ProductImage}
            alt={product.ProductName}
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>

        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold">{product.ProductName}</h1>
          <p className="text-lg text-gray-600">{product.ProductDescription}</p>
          <p className="text-2xl font-semibold text-yellow-600">
            {product.ProductPrice} LKR
          </p>

          <div className="grid grid-cols-2 gap-4 text-gray-700 text-lg">
            <p>
              <strong>Brand:</strong> {product.ProductBrand}
            </p>
            <p>
              <strong>Color:</strong> {product.ProductColor}
            </p>
          </div>

          <div className="flex items-center text-yellow-500 text-lg mt-2">
            <Star className="w-6 h-6 fill-yellow-500" />
            <span className="ml-2 font-semibold">
              {product.ProductRating} / 5
            </span>
          </div>

          <div className="flex gap-4 mt-6">
            <Button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg text-lg">
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </Button>
            <Button
              onClick={toggleSlide}
              className="bg-black text-white py-3 px-6 rounded-lg text-lg hover:bg-gray-800"
            >
              Buy It Now
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 transition-all duration-300 ${
          isSlideOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={toggleSlide}
        style={{ zIndex: 50 }}
      >
        <div
          className={`fixed top-0 right-0 bg-white w-1/4 h-full p-6 transition-all duration-300 transform ${
            isSlideOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Product Details</h2>
            <Button onClick={toggleSlide}>
              <X className="w-6 h-6 text-gray-600" />
            </Button>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="font-semibold">Product Name:</span>
              <span>{product.ProductName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold">Brand:</span>
              <span>{product.ProductBrand}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold">Price:</span>
              <span>{product.ProductPrice} LKR</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold">Color:</span>
              <span>{product.ProductColor}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold">Rating:</span>
              <span>{product.ProductRating} / 5</span>
            </div>
            <div className="mt-6">
              <Image
                src={product.ProductImage}
                alt={product.ProductName}
                width={150}
                height={150}
                className="rounded-lg"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-5 rounded-lg text-sm">
              {" "}
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-10 text-black max-w-6xl mx-auto bg-white">
        <Policy />
      </div>
    </div>
  );
};

export default Page;
