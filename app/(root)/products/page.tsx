"use client";

import React, { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const brands = ["Apple", "Samsung", "OnePlus", "Xiaomi", "Google"];
const models = ["iPhone", "Galaxy", "Pixel", "Nord", "Redmi"];
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

const Page = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleSelection = (
    item: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setList(
      list.includes(item) ? list.filter((i) => i !== item) : [...list, item]
    );
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedModels([]);
    setPriceRange([0, 2000]);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full flex items-center justify-between"
        >
          Filters{" "}
          {isFilterOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <Card
          className={`w-full lg:w-64 p-4 bg-gray-100 rounded-lg ${
            isFilterOpen ? "block" : "hidden lg:block"
          }`}
        >
          <h3 className="text-xl font-bold mb-4">Filters</h3>

          <div className="mb-6">
            <h4 className="font-semibold">Brand</h4>
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() =>
                    toggleSelection(brand, selectedBrands, setSelectedBrands)
                  }
                />
                <span>{brand}</span>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h4 className="font-semibold">Model</h4>
            {models.map((model) => (
              <div key={model} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedModels.includes(model)}
                  onCheckedChange={() =>
                    toggleSelection(model, selectedModels, setSelectedModels)
                  }
                />
                <span>{model}</span>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h4 className="font-semibold">Price Range</h4>
            <Slider
              min={0}
              max={2000}
              step={10}
              value={priceRange}
              onValueChange={(val) => setPriceRange(val)}
            />
            <span className="block text-sm mt-2">
              ${priceRange[0]} - ${priceRange[1]}
            </span>
          </div>

          <Button variant="outline" onClick={resetFilters} className="w-full">
            Reset Filters
          </Button>
        </Card>

        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
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
    </div>
  );
};

export default Page;
