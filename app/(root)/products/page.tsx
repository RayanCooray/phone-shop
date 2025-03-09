"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { GetAllProducts } from "@/lib/actions/Product";
import { useSession } from "next-auth/react";
import { FilterProducts } from "@/lib/actions/Product";

const brands = ["Apple", "Samsung", "OnePlus", "Xiaomi", "Google"];
const models = ["iPhone", "Galaxy", "Pixel", "Nord", "Redmi"];

const Page = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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
    const result = await GetAllProducts(accessToken);

    if (result.success) {
      setProducts(Array.isArray(result.data) ? result.data : []);
    } else {
      setError(result.error || "Failed to fetch products");
    }
    setLoading(false);
  };

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
    fetchProducts()
  };

  const applyFilters = async () => {
    if (!session?.user?.accessToken) return;
  
    const filters: { brand?: string; category?: string; minPrice?: number; maxPrice?: number } = {};
    if (selectedBrands.length > 0) filters.brand = selectedBrands.join(",");
    if (selectedModels.length > 0) filters.category = selectedModels.join(",");
    if (priceRange[0] !== 0 || priceRange[1] !== 2000) {
      filters.minPrice = priceRange[0];
      filters.maxPrice = priceRange[1];
    }
  
    setLoading(true);
    try {
      const result = await FilterProducts(session.user.accessToken, filters);
      console.log("Filtered Products Response:", result); 
      
      if (result?.success && Array.isArray(result.data?.data)) {
        setProducts(result.data.data); 
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error filtering products:", error);
    }
    setLoading(false);
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

          <Button onClick={applyFilters} className="w-full mt-4">
            Apply Filters
          </Button>
        </Card>

        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
            {Array.isArray(products) && products.map((product) => (
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
    </div>
  );
};

export default Page;
