"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";

const routes = [
  {
    icon: Layout,
    label: "My Product",
    href: "/Dashboard/products",
  },
  {
    icon: List,
    label: "Sell Product",
    href: "/Dashboard/sell-product",
  },
  {
    icon: Compass,
    label: "Verification",
    href: "/Dashboard/verification",
  },
  {
    icon: BarChart,
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
