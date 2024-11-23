"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { NavLinks } from "@/constant";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/provider/ModeToggle";

export default function MobileMenu() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between" side="left">
        <div>
          <ModeToggle />
          <div className="mt-5 flex space-y-1 flex-col">
            {NavLinks.map((item) => (
              <Link
                href={item.href}
                key={item.id}
                className={cn(pathname === item.href ? "text-primary bg-muted" : "transition duration-200 hover:text-indigo-600 hover:text-opacity-75", "group flex items-center px-2 py-2 font-medium rounded-lg")}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col mt-4 space-y-2">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </SheetContent>
    </Sheet>
  );
}
