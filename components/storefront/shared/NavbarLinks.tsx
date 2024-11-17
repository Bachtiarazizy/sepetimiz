"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { NavLinks } from "@/constant";

export default function NavbarLinks() {
  const location = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="hidden md:flex justify-center items-center col-span-6 gap-x-2">
      {NavLinks.map((item) =>
        item.dropdown ? (
          <div key={item.id} className="relative" onMouseLeave={handleMouseLeave}>
            <button onClick={handleDropdownToggle} className={cn(location === item.href ? "text-primary " : "transition duration-200 hover:text-indigo-600 hover:text-opacity-75", "group flex items-center px-2 py-2 font-medium rounded-sm")}>
              {item.name}
              <ChevronDown className="ml-2" size={16} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 border bg-zinc-50 dark:bg-gray-800 rounded-md shadow-lg z-50" onMouseLeave={handleMouseLeave}>
                {item.dropdown.map((subItem) => (
                  <Link href={subItem.href} key={subItem.id} className="block px-4 py-2 text-gray-800 dark:text-gray-100 transition duration-200 dark:hover:bg-gray-600 hover:bg-gray-100">
                    {subItem.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Link
            href={item.href}
            key={item.id}
            className={cn(location === item.href ? "text-primary bg-muted" : "transition duration-200 hover:text-indigo-600 hover:text-opacity-75", "group flex items-center px-2 py-2 font-medium rounded-lg")}
          >
            {item.name}
          </Link>
        )
      )}
    </div>
  );
}
