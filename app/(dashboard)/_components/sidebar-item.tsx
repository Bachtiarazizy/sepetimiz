"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href?: string;
  onClick?: () => void;
}

export const SidebarItem = ({ icon: Icon, label, href, onClick }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  // Determine if the current route is active
  const isActive = useMemo(() => {
    return href ? pathname === href : false;
  }, [pathname, href]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn("flex items-center gap-x-2 text-slate-500 text-sm font-medium pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20", isActive && "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20")}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={22} className={cn("text-slate-500", isActive && "text-sky-700")} />
        {label}
      </div>
      <div className={cn("ml-auto opacity-0 border-2 border-sky-700 h-full transition-opacity", isActive && "opacity-100")} />
    </button>
  );
};
