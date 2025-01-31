"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLinks } from "@/constant";

export default function NavbarLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-center gap-8">
      {NavLinks.map((item) => (
        <Link href={item.href} key={item.id} className={cn("relative px-3 py-1.5 text-sm font-medium transition-colors", "hover:text-primary", pathname === item.href ? "text-primary" : "text-muted-foreground")}>
          <span className="relative">
            {item.name}
            {pathname === item.href && <span className="absolute -bottom-4 left-0 h-0.5 w-full bg-primary" />}
          </span>
        </Link>
      ))}
    </nav>
  );
}
