import { ShoppingBag } from "lucide-react";
import { SidebarRoutes } from "./sidebar-routes";
import Link from "next/link";

export const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-background shadow-sm">
      <div className="p-6">
        <Link href="/" className="flex items-center w-full rounded-lg text-muted-foreground transition-colors hover:text-foreground py-1">
          <ShoppingBag />
          <span className="ml-4">Sepetimiz</span>
        </Link>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};
