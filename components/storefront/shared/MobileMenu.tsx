"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { NavLinks } from "@/constant";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/provider/ModeToggle";
import SearchBars from "@/components/search/search-bars";

export default function MobileMenu({}) {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-primary/25 transition-colors">
          <Menu className="w-5 h-5 text-primary" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between bg-background border-r border-primary/20" side="left">
        <div>
          <div className="flex justify-between items-center">
            <ModeToggle />
          </div>

          {/* Search Bar */}
          <div className="mt-6">
            <SearchBars />
          </div>

          <nav className="mt-8 flex flex-col gap-2">
            {NavLinks.map((item) => (
              <Link
                href={item.href}
                key={item.id}
                className={cn(
                  "relative px-4 py-3 font-medium rounded-lg transition-all duration-300",
                  "hover:bg-primary/10 hover:text-primary",
                  "group flex items-center",
                  pathname === item.href ? "text-primary bg-primary/15 shadow-sm" : "text-muted-foreground"
                )}
              >
                <span className="relative flex items-center gap-3">
                  {item.name}
                  {pathname === item.href && <span className="absolute right-0 w-1 h-1 rounded-full bg-primary animate-pulse" />}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          <SignedOut>
            <SignInButton>
              <Button className="w-full bg-primary hover:bg-primary/90">Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-4">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 border-2 border-primary/20",
                  },
                }}
              />
              <Link href="/dashboard/shops" className="flex-1">
                <Button className="w-full bg-primary hover:bg-primary/90">Dashboard</Button>
              </Link>
            </div>
          </SignedIn>
        </div>
      </SheetContent>
    </Sheet>
  );
}
