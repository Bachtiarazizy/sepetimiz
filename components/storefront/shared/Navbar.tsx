"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import NavbarLinks from "./NavbarLinks";
import { ShoppingBag, Settings } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/provider/ModeToggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Navbar() {
  return (
    <nav className="w-full justify-between flex items-center px-4 md:px-20 mx-auto py-4 sm:py-5 lg:py-5 border-b">
      <div className="md:col-span-3 pr-8">
        <Link href="/">
          <div className="text-2xl font-semibold flex flex-row items-center gap-2">
            <ShoppingBag />
            <span className="text-base md:text-xl">Sepetimiz</span>
          </div>
        </Link>
      </div>
      <NavbarLinks />

      <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
        <div className="hidden md:flex">
          <ModeToggle />
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline">Sign In</Button>
              </SignInButton>
            </SignedOut>
          </div>

          <div className="hidden md:flex gap-4">
            <SignedIn>
              <Link href="/shops">
                <Button className="relative">Dashboard</Button>
              </Link>
              <UserButton
                userProfileMode="modal"
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
