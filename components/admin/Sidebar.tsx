"use client";

import Image from "next/image";
import { adminSideBarLinks } from "@/constants";
import Link from "next/link";
import { cn, getInitials } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="sticky left-0 top-0 flex h-dvh flex-col justify-between bg-white px-5 pb-5 pt-10">
      {/* Logo Section */}
      <div>
        <div className="flex items-center gap-3">
          <Image src="/icons/admin/logo.svg" alt="logo" height={37} width={37} />
          <h1 className="text-xl font-bold text-black">PrimeMobiles</h1>
        </div>

        {/* Sidebar Links */}
        <nav className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const isSelected =
              (link.route !== "/admin" && pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;

            return (
              <Link href={link.route} key={link.route}>
                <div
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition",
                    isSelected ? "bg-black text-white shadow-md" : "hover:bg-gray-100"
                  )}
                >
                  <div className="relative size-5">
                    <Image
                      src={link.img}
                      alt={link.text}
                      fill
                      className={`${isSelected ? "brightness-0 invert" : ""} object-contain`}
                    />
                  </div>
                  <p className="text-sm font-medium">{link.text}</p>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Admin Profile Section */}
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback className="bg-amber-100">{getInitials("Ryan")}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <p className="font-semibold text-gray-800">Ryan</p>
          <p className="text-xs text-gray-500">Admin@PrimeMobiles.com</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
