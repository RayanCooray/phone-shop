import Sidebar from "@/components/admin/Sidebar";
// import Header from "@/components/Header";
import { ReactNode } from "react";


const Layout = async ({ children }: { children: ReactNode }) => {

  return (
    <main className="flex min-h-screen w-full flex-row">
        <Sidebar />

      <div className="flex w-[calc(100%-264px)] flex-1 flex-col bg-light-300 p-5 xs:p-10">
        {/* <Header/> */}
        {children}
      </div>
    </main>
  );
};
export default Layout;