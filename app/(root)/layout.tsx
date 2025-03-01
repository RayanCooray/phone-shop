import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-screen">
    <div className="mx-auto w-full">
      <div className="mt-20 pb-20">{children}</div>
    </div>
  </main>
  );
};

export default Layout;