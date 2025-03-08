import React, { FC } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react"; // Import Lucide Icons

interface ProductCardProps {
  title: string;
  price: string;
  image: string;
  rating: string;
  BaseColor: string;
  id: number;
}

const ProductCard: FC<ProductCardProps> = ({ id, title, price, image, rating, BaseColor }) => {
  return (
    <Card className="w-full sm:w-80 bg-gradient-to-b from-gray-900 to-black text-white border border-gray-700 shadow-lg rounded-2xl p-4 transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl">
      <CardContent className="p-0 flex flex-col items-center">
        <Link href={`/product/${id}`} className="relative w-full flex justify-center">
          <Image
            src={image}
            alt={title}
            width={500}
            height={500}
            className="object-cover rounded-xl w-full h-64 transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Rating & Base Color */}
        <div className="flex items-center justify-between w-full mt-4 text-sm text-gray-400 px-2">
          <span className="flex items-center gap-1">⭐ {rating}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs">Color:</span>
            <span
              className="w-5 h-5 rounded-full border border-gray-300"
              style={{ backgroundColor: BaseColor }}
            ></span>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-4 text-center">{title}</h3>
        <p className="text-amber-400 text-lg font-semibold mt-1">Rs {price}</p>

        {/* Size Selection */}
        <div className="flex gap-2 mt-3">
          {["128GB", "256GB", "512GB"].map((size) => (
            <button
              key={size}
              className="px-4 py-2 border border-gray-500 rounded-lg text-xs font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
            >
              {size}
            </button>
          ))}
        </div>
      </CardContent>

      <CardFooter className="mt-4">
        <Button className="w-full bg-amber-500 text-black flex items-center justify-center gap-2 hover:bg-amber-400 transition-all duration-300 py-3 rounded-lg font-semibold text-lg">
          <ShoppingCart size={20} />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
