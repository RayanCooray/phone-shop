"use client";

import React, { FC, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { GetAllProducts } from "@/lib/actions/Product";
import { useSession } from "next-auth/react";


const ProductList: FC = () => {
  const { data: session } = useSession();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.accessToken) {
      fetchProducts(session.user.accessToken);
    }
  }, [session]);

  const fetchProducts = async (accessToken: string) => {
    setLoading(true);
    const result = await GetAllProducts(accessToken); // Call the function from product.ts

    if (result.success) {
      setProducts(result.data);
    } else {
      setError(result.error || "Failed to fetch products");
    }
    setLoading(false);
  };


  return (
    <div className="container mx-auto py-10 px-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-amber-400 text-center mb-8">
        Featured Products
      </h2>
      <div className="w-full flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
                {products.slice(0, 3).map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              title={product.ProductName}
              price={product.ProductPrice}
              image={product.ProductImage}
              rating={product.ProductRating}
              BaseColor={product.ProductColor}
            />
            ))}
                </div>
              </div>
    </div>
  );
};




export default ProductList;
