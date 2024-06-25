"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { NavLinks } from "@/constant";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

export function MobileMenu() {
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
        <div className="mt-5 flex px-2 space-y-1 flex-col">
          {NavLinks.map((item) => (
            <div key={item.id} className="relative">
              {item.dropdown ? (
                <>
                  <button onClick={() => handleDropdownToggle(item.id)} className={cn(location === item.href ? "bg-muted" : "hover:bg-muted hover:bg-opacity-75", "group flex items-center w-full px-2 py-2 font-medium rounded-md")}>
                    {item.name}
                    <ChevronDown className="ml-2" size={16} />
                  </button>
                  {openDropdownId === item.id && (
                    <div className="ml-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg left-0 w-full">
                      {item.dropdown.map((subItem) => (
                        <Link href={subItem.href} key={subItem.id} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
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
        <div className="flex flex-col mt-4 space-y-2">
          <Button asChild>
            <LoginLink>Login</LoginLink>
          </Button>
          <Button variant="secondary" asChild>
            <RegisterLink>Register</RegisterLink>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
