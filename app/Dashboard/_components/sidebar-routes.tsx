"use client";

import { CircleHelp, Compass, Layout, LayoutDashboard, List, Package, ShoppingCart, User2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";

const routes = [
  {
    icon: LayoutDashboard,
    label: "My Store",
    href: "/Dashboard/shop",
  },
  {
    icon: Package,
    label: "My Product",
    href: "/Dashboard/products",
  },
  {
    icon: ShoppingCart,
    label: "Sell Product",
    href: "/Dashboard/sell-product",
  },
  {
    icon: User2,
    label: "Verification",
    href: "/Dashboard/verification",
  },
  {
    icon: CircleHelp,
    label: "Help center",
    href: "/customer-service",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem key={route.href} icon={route.icon} label={route.label} href={route.href} />
      ))}
    </div>
  );
};
