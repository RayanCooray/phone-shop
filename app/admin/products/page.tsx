"use client"

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { GetAllProducts } from "@/lib/actions/Product";

const Page = () => {
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

  const handleDelete = async (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      // Make a request to delete the product
      // You can use your backend API for this
      console.log(`Delete product with id: ${productId}`);
    }
  };

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Products</h2>
        <Button className="bg-blue-950" asChild>
          <Link href="/admin/products/new" className="text-white">
            + Create a New Product
          </Link>
        </Button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-7 w-full overflow-hidden">
        <Table>
          <TableCaption>A list of all products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <Image src={product.ProductImage} alt={product.ProductName} width={64} height={64} className="object-cover" />
                </TableCell>
                <TableCell>{product.ProductName}</TableCell>
                <TableCell>${product.ProductPrice}</TableCell>
                <TableCell>{product.ProductBrand}</TableCell>
                <TableCell>{product.ProductCategory}</TableCell>
                <TableCell>{product.ProductQuantity}</TableCell>
                <TableCell className="text-right">
                  <Button className="mr-2" asChild>
                    <Link href={`/admin/products/update/${product._id}`} className="text-blue-500">
                      Update
                    </Link>
                  </Button>
                  <Button className="bg-red-500" onClick={() => handleDelete(product._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default Page;
