import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-screen">
    <div className="mx-auto w-full">
      <Header />
      <div className="mt-20 pb-20">{children}</div>
      <Footer />
    </div>
  </main>
  );
};

export default Layout;