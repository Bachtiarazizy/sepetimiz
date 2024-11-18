"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = useMemo(() => {
    // Extract the current route segments
    const currentSegments = pathname.split("/").filter(Boolean);
    const hrefSegments = href.split("/").filter(Boolean);

    // For customer service route - exact match only
    if (href === "/customer-service") {
      return pathname === "/customer-service";
    }

    // For shop detail route (/shops/[shopId])
    if (hrefSegments.length === 2 && hrefSegments[0] === "shops") {
      // Only active when exactly at /shops/[shopId]
      return currentSegments.length === 2 && currentSegments[0] === "shops" && currentSegments[1] === hrefSegments[1];
    }

    // For products route (/shops/[shopId]/products) and its nested routes
    if (href.includes("/products")) {
      return currentSegments.length >= 3 && currentSegments[0] === "shops" && currentSegments[1] === hrefSegments[1] && currentSegments[2] === "products";
    }

    // For verification route (/shops/[shopId]/verification) and its nested routes
    if (href.includes("/verification")) {
      return currentSegments.length >= 3 && currentSegments[0] === "shops" && currentSegments[1] === hrefSegments[1] && currentSegments[2] === "verification";
    }

    return false;
  }, [pathname, href]);

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn("flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20", isActive && "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700")}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={22} className={cn("text-slate-500", isActive && "text-sky-700")} />
        {label}
      </div>
      <div className={cn("ml-auto opacity-0 border-2 border-sky-700 h-full transition-all", isActive && "opacity-100")} />
    </button>
  );
};
