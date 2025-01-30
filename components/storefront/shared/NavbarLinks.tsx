"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLinks } from "@/constant";

export default function NavbarLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex justify-center items-center col-span-6 gap-3">
      {NavLinks.map((item) => (
        <Link href={item.href} key={item.id} className={cn("relative px-4 py-2 font-medium rounded-lg transition-all duration-300", "group hover:text-primary", pathname === item.href ? "text-primary" : "text-primary/70")}>
          <span className="relative z-10 flex items-center gap-2">
            {item.name}
            {pathname === item.href && <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />}
          </span>
          <div className={cn("absolute inset-0 rounded-lg transition-all duration-300 ease-out", "bg-primary/0 group-hover:bg-primary/20", pathname === item.href ? "bg-primary/20" : "")} />
        </Link>
      ))}
    </nav>
  );
}
