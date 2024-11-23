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
                className={cn(
                  "relative px-4 py-2 font-medium rounded-lg transition-all duration-300 ease-in-out",
                  "group hover:text-primary",
                  "before:absolute before:inset-0 before:rounded-lg before:bg-primary/10 before:scale-x-0 before:opacity-0 before:transition-transform before:duration-300 group-hover:before:scale-x-100 group-hover:before:opacity-100",
                  pathname === item.href ? "text-primary bg-primary/10 before:scale-x-100 before:opacity-100" : "text-muted-foreground"
                )}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {item.name}
                  <span className={cn("h-1 w-1 rounded-full bg-primary transition-all duration-300", pathname === item.href ? "opacity-100" : "opacity-0 group-hover:opacity-100")} />
                </span>
                <div className={cn("absolute bottom-0 left-0 h-0.5 w-full transform bg-primary transition-transform duration-300 ease-out", pathname === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100")} />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col mt-4 space-y-2">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <div className="flex flex-row gap-2">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
              />
              <Link href={`/shops`} className="mr-3">
                <Button>Dashboard</Button>
              </Link>
            </div>
          </SignedIn>
        </div>
      </SheetContent>
    </Sheet>
  );
}
