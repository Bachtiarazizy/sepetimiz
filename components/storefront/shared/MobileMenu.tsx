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
  const location = usePathname();
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const handleDropdownToggle = (id: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleMouseLeave = () => {
    setOpenDropdownId(null);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between" onMouseLeave={handleMouseLeave}>
        <div>
          <ModeToggle />
          <div className="mt-5 flex space-y-1 flex-col">
            {NavLinks.map((item) => (
              <div key={item.id} className="relative">
                {item.dropdown ? (
                  <>
                    <button onClick={() => handleDropdownToggle(item.id)} className={cn(location === item.href ? "bg-muted" : "hover:bg-muted hover:bg-opacity-75", "group flex items-center w-full px-2 py-2 font-medium rounded-md")}>
                      {item.name}
                      <ChevronDown className="ml-2" size={16} />
                    </button>
                    {openDropdownId === item.id && (
                      <div className="ml-0 mt-2 bg-zinc-50 dark:bg-gray-800 dark:border-none border border-gray-200 rounded-md shadow-lg left-0 w-full">
                        {item.dropdown.map((subItem) => (
                          <Link href={subItem.href} key={subItem.id} className="block px-4 py-2 text-gray-800 dark:text-gray-100 transition dark:hover:bg-gray-600 hover:bg-gray-100">
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={item.href} className={cn(location === item.href ? "bg-muted" : "hover:bg-muted hover:bg-opacity-75", "group flex items-center px-2 py-2 font-medium rounded-md")}>
                    {item.name}
                  </Link>
                )}
              </div>
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
