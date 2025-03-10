"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import { signOut } from "@/auth";
import { getInitials } from "@/lib/utils";
import { Session } from "next-auth";

const Header = ({ session }: { session: Session }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");


  const logOutfrom = async () => {
    await signOut();
  };
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/80 dark:bg-[#0F172A]/80 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-3xl font-bold tracking-wide text-[#6366F1] dark:text-[#8B5CF6] font-bebas-neue"
        >
          PrimeMobiles
        </Link>

        <div className="hidden md:flex items-center relative  border-black dark:border-white ">
          <Search
            className="absolute left-3 text-gray-500 dark:text-gray-400"
            size={20}
          />
          <Input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-80 text-black bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-[#6366F1] dark:focus:border-[#8B5CF6] focus:ring-0 transition"
          />
        </div>

        <nav className="hidden md:flex space-x-8">
          <Link
            href="/products"
            className="text-gray-800 dark:text-gray-300 hover:text-[#F43F5E] dark:hover:text-[#F87171] transition font-medium ibm-plex-sans"
          >
            Products
          </Link>
          <Link
            href="/about"
            className="text-gray-800 dark:text-gray-300 hover:text-[#F43F5E] dark:hover:text-[#F87171] transition font-medium ibm-plex-sans"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-800 dark:text-gray-300 hover:text-[#F43F5E] dark:hover:text-[#F87171] transition font-medium ibm-plex-sans"
          >
            Contact
          </Link>
          <Link
            href="/CheckOrders"
            className="text-gray-800 dark:text-gray-300 hover:text-[#F43F5E] dark:hover:text-[#F87171] transition font-medium ibm-plex-sans"
          >
            Your Orders
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-6">
          <Button className="px-5 py-2 text-lg font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#4F46E5] hover:to-[#6366F1] transition shadow-lg rounded-lg ibm-plex-sans">
            Buy Now
          </Button>

          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer border border-black dark:border-white">
                <AvatarImage src="/avatar.png" alt="User" />
                <AvatarFallback className="text-black dark:text-white bg-gray-200 dark:bg-gray-800">U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/profile">Edit Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/logout">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}

          <Menubar className="bg-transparent border-none shadow-none">
            <MenubarMenu>
              <MenubarTrigger className="outline-none">
                <Avatar className="cursor-pointer border border-black dark:border-white">
                  <AvatarImage src="/avatar.png" alt="User" />
                  <AvatarFallback className="text-black dark:text-white bg-gray-200 dark:bg-gray-800">
                  {getInitials(session?.user?.name || "IN")}
                  </AvatarFallback>
                </Avatar>
              </MenubarTrigger>
              <MenubarContent
                align="center"
                className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg"
              >
                <MenubarItem asChild>
                  <Link
                    href="/profile"
                    className="block w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    Edit Profile
                  </Link>
                </MenubarItem>
                <MenubarItem asChild>
                  <Link
                    href="/sign-in"
                    className="block w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                    onClick={logOutfrom}>
                    Logout
                  </Link>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>

        <button
          className="md:hidden text-gray-800 dark:text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-[#0F172A] border-t border-gray-200 dark:border-gray-700 absolute w-full left-0 top-full shadow-md">
          <nav className="flex flex-col space-y-4 py-4 px-6">
            <Link
              href="/products"
              className="text-gray-800 dark:text-gray-300 hover:text-[#F43F5E] dark:hover:text-[#F87171] transition font-medium ibm-plex-sans"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-gray-800 dark:text-gray-300 hover:text-[#F43F5E] dark:hover:text-[#F87171] transition font-medium ibm-plex-sans"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-800 dark:text-gray-300 hover:text-[#F43F5E] dark:hover:text-[#F87171] transition font-medium ibm-plex-sans"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                size={20}
              />
              <Input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-[#6366F1] dark:focus:border-[#8B5CF6] focus:ring-0 transition"
              />
            </div>

            <Button
              className="w-full px-5 py-2 text-lg font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#4F46E5] hover:to-[#6366F1] transition shadow-lg rounded-lg ibm-plex-sans"
              onClick={() => setIsOpen(false)}
            >
              Buy Now
            </Button>

            <div className="flex justify-center pt-4 z-30">
              <Menubar className="bg-transparent border-none shadow-none">
                <MenubarMenu>
                  <MenubarTrigger className="outline-none">
                    <Avatar className="cursor-pointer border border-black dark:border-white">
                      <AvatarImage src="/avatar.png" alt="User" />
                      <AvatarFallback className="text-black dark:text-white bg-gray-200 dark:bg-gray-800">
                        U
                      </AvatarFallback>
                    </Avatar>
                  </MenubarTrigger>
                  <MenubarContent
                    align="center"
                    className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg"
                  >
                    <MenubarItem asChild>
                      <Link
                        href="/profile"
                        className="block w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                      >
                        Edit Profile
                      </Link>
                    </MenubarItem>
                    <MenubarItem asChild>
                      <Link
                        href="/logout"
                        className="block w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                      >
                        Logout
                      </Link>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
