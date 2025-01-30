import React from "react";

import { MobileSidebar } from "./mobile-sidebar";
import { NavbarRoutes } from "./navbar-routes";

export default function DashboardHeader() {
  return (
    <div className="p-6 border-b h-full flex items-center justify-between bg-background shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
}
