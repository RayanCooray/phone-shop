import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductForm from "@/components/admin/forms/ProductForm";

const Page = () => {
  return (
    <>
      <Button asChild className="mb-10 w-fit border border-light-300 bg-white text-xs font-medium text-dark-200 hover:bg-light-300">
        <Link href="/admin/products">Go Back</Link>
      </Button>

      <section className="w-full max-w-2xl">
        <ProductForm />
      </section>
    </>
  );
};
export default Page;