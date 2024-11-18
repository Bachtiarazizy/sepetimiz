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
        <Link href="/" className="flex items-center w-full transition-all hover:opacity-70 py-1">
          <div className="text-2xl font-semibold flex flex-row items-center gap-2">
            <ShoppingBag />
            <span className="text-base md:text-xl">Sepetimiz</span>
          </div>
        </Link>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes shopId={shopId} />
      </div>
    </div>
  );
};
