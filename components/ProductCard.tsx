import React, { FC } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProductCardProps {
  title: string;
  price: string;
  image: string;
  id : number
}

const ProductCard: FC<ProductCardProps> = ({ id,title, price, image }) => {
  return (
    <Link href={`/product/${id}`}>
    <Card className="w-full sm:w-72 bg-black text-white border border-gray-800 shadow-lg">
      <CardContent className="p-4 flex flex-col items-center">
        <img src={image} alt={title} className="w-48 h-48 object-contain" />
        <div className="flex items-center justify-between w-full mt-4">
          <span className="text-amber-400 font-medium">New</span>
          <span className="text-xs text-gray-400">🌟 4.8</span>
        </div>
        <h3 className="text-lg font-bold mt-4">{title}</h3>
        <p className="text-amber-400 font-medium mt-2">{price}</p>
      </CardContent>
      <CardFooter className="p-4">
        <Button className="w-full bg-amber-400 text-black hover:bg-amber-300 cursor-pointer">
          Buy Now
        </Button>
      </CardFooter>
    </Card>
    </Link>
  );
};

export default ProductCard;
