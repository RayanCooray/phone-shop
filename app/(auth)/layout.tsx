import Image from 'next/image';
import React, { ReactNode } from 'react'
import { auth } from "@/auth";
import { redirect } from "next/navigation";


const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) redirect ("/sign-in");
  return (
    <main className="relative flex flex-col-reverse text-light-100 sm:flex-row">
      {/* Form Section */}
      <section className="my-auto flex h-full min-h-screen flex-1 items-center bg-neutral-50 px-5 py-10">
        <div className="mx-auto flex max-w-xl flex-col gap-6 rounded-lg p-10 bg-dark-700 shadow-lg">
          <div className="flex flex-row gap-3">
            {/* <Image src="/icons/logo.svg" alt="logo" width={37} height={37} /> */}
            <h1 className="text-2xl font-semibold text-purple-400">PrimeMobiles</h1>
          </div>
          <div>{children}</div>
        </div>
      </section>

      {/* Image Section */}
      <section className="sticky h-40 w-full sm:top-0 sm:h-screen sm:flex-1">
        <Image
          src="/images/auth-illustration.jpg"
          alt="auth illustration"
          width={1000}
          height={1000}
          className="size-full object-cover"
        />
      </section>
    </main>
  );
}

export default Layout;
