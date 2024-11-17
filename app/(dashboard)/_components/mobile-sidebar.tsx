import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CircleHelp, Home, LayoutDashboard, LineChart, Menu, Package, Package2, PanelLeft, Settings, ShoppingBag, ShoppingCart, User2, Users2 } from "lucide-react";
import Link from "next/link";
import { Sidebar } from "./sidebar";

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="md:hidden hover:opacity-75 transition">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-background">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
