import React, { FC } from "react";
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    title: "iPhone 15 Pro - Titanium Gold",
    price: "$999",
    image: "/images/15gl.webp",
  },
  {
    id: 2,
    title: "iPhone 15 Pro - Silver",
    price: "$999",
    image: "/images/15wh.webp",
  },
  {
    id: 3,
    title: "iPhone 15 Pro - Black",
    price: "$999",
    image: "/images/15blc.webp",
  },
  {
    id: 4,
    title: "iPhone 16 - Blue",
    price: "$999",
    image: "/images/16blu.webp",
  },
  {
    id: 5,
    title: "iPhone 16 - Green",
    price: "$1088",
    image: "/images/16gre.webp",
  },
  {
    id: 6,
    title: "iPhone 16 - Pink",
    price: "$1000",
    image: "/images/16pink.webp",
  },
];

const ProductList: FC = () => {
  return (
    <div className="container mx-auto py-10 px-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-amber-400 text-center mb-8">
        Featured Products
      </h2>
      <div className="w-full flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};




export default ProductList;
