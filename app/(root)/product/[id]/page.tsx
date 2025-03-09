"use client";

import { getProductById } from "@/lib/actions/Product";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, X } from "lucide-react"; 
import Policy from "@/components/page/Policy";
import Link from "next/link";

const Page = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();
  const [product, setProduct] = useState<any>(null);
  const [isSlideOpen, setIsSlideOpen] = useState(false); 
  const [cart, setCart] = useState<any[]>([]);

  const fetchProductById = async (id: string, accessToken: string) => {
    try {
      const response = await getProductById(id, accessToken);
      if (response.success) {
        setProduct(response.data);
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


  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(cartItems);
  }, [isSlideOpen]); 

  if (!product) {
    return (
      <h1 className="text-3xl text-black text-center mt-10">Loading...</h1>
    );
  }

  
  const toggleSlide = () => {
    setIsSlideOpen(!isSlideOpen);
  };

  
  const addToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const productExists = wishlist.find((item: any) => item._id === product._id);

    if (productExists) {
      toast.error("Product is already in your wishlist!");
    } else {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      toast.success("Product added to wishlist!");
    }
  };

  
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const productExists = cart.find((item: any) => item._id === product._id);

    if (productExists) {
      toast.error("Product is already in your cart!");
    } else {
      cart.push(product); 
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("Product added to cart!");
    }
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
            <Button
              onClick={addToCart}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg text-lg"
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </Button>
            <Button
              onClick={addToWishlist}
              className="bg-black text-white py-3 px-6 rounded-lg text-lg hover:bg-gray-800"
            >
              Add to Wishlist
            </Button>

            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-5 rounded-lg text-sm"
              onClick={toggleSlide}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 transition-all duration-300 ${isSlideOpen ? "translate-x-0" : "translate-x-full"}`}
        onClick={toggleSlide}
        style={{ zIndex: 50 }}
      >
        <div
          className={`fixed top-0 right-0 bg-white w-1/4 h-full p-6 transition-all duration-300 transform ${
            isSlideOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Cart Items</h2>
            <Button onClick={toggleSlide}>
              <X className="w-6 h-6 text-gray-600" />
            </Button>
          </div>

          <div className="mt-6 space-y-4">
            {cart.length > 0 ? (
              cart.map((item: any, index: number) => (
                <div key={index} className="flex gap-4 items-center">
                  <Image
                    src={item.ProductImage}
                    alt={item.ProductName}
                    width={50}
                    height={50}
                    className="rounded-lg"
                  />
                  <div className="space-y-2">
                    <p className="font-semibold">{item.ProductName}</p>
                    <p className="text-yellow-600 font-semibold">{item.ProductPrice} LKR</p>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-5 h-5 fill-yellow-500" />
                      <span className="ml-2 font-semibold">{item.ProductRating} / 5</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>

          <div className="flex justify-end mt-6">
            <Link href="/checkout">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-5 rounded-lg text-sm">
                Proceed to Checkout
              </Button>
            </Link>
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
