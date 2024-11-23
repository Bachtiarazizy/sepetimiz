"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLinks } from "@/constant";

export default function NavbarLinks() {
  const pathname = usePathname(); // Current pathname of the page

  return (
    <div className="hidden md:flex justify-center items-center col-span-6 gap-x-2">
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
  );
}
