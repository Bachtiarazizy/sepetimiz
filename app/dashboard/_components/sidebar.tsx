"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { SidebarRoutes } from "./sidebar-routes";
import { useParams } from "next/navigation";

export const Sidebar = () => {
  const params = useParams();
  const shopId = params.shopId as string;

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-background shadow-sm">
      <div className="p-6">
        <Link href="https://sepetimiz.vercel.app" className="flex items-center space-x-2">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Sepetimiz</span>
          <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">Beta</span>
        </Link>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};
