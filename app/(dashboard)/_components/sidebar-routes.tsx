"use client";

import { BarChart, CircleHelp, Compass, Layout, LayoutDashboard, List, Package, ShieldCheck, ShoppingCart, User2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";

interface SidebarRoutesProps {
  shopId: string;
  verificationId?: string;
}

export const SidebarRoutes = ({ shopId, verificationId }: SidebarRoutesProps) => {
  const pathname = usePathname();

  const sellerRoutes = [
    {
      icon: Layout,
      label: "Shops",
      href: `/shops/${shopId}`,
    },
    {
      icon: List,
      label: "Products",
      href: `/shops/${shopId}/products`,
    },
    {
      icon: ShieldCheck,
      label: "Verification",
      href: `/shops/${shopId}/verification/${verificationId || ""}`,
    },
    {
      icon: CircleHelp,
      label: "Help center",
      href: "/customer-service",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {sellerRoutes.map((route) => (
        <SidebarItem key={route.href} icon={route.icon} label={route.label} href={route.href} />
      ))}
    </div>
  );
};
