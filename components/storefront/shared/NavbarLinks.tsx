"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLinks } from "@/constant";

export default function NavbarLinks() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex justify-center items-center col-span-6 gap-x-2">
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
  );
}
