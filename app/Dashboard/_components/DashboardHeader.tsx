import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CircleHelp, Home, LayoutDashboard, LineChart, Menu, Package, Package2, PanelLeft, Settings, ShoppingBag, ShoppingCart, User2, Users2 } from "lucide-react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ModeToggle } from "@/components/provider/ModeToggle";

export default function DashboardHeader() {
  return (
    <div className="p-4 border-b h-full flex items-center justify-between bg-background shadow-sm">
      <div className="sm:hidden">
        <Link href="/" className="flex items-center w-full rounded-lg text-muted-foreground transition-colors hover:text-foreground py-1">
          <ShoppingBag />
          <span className="ml-4">Sepetimiz</span>
        </Link>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="sm:max-w-xs flex flex-col justify-between">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="/" className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link href="/" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <Home className="h-5 w-5" />
              Home
            </Link>
            <Link href="/Dashboard/shop" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <LayoutDashboard className="h-5 w-5" />
              My Store
            </Link>
            <Link href="/Dashboard/products" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <Package className="h-5 w-5" />
              My Products
            </Link>
            <Link href="/Dashboard/sell-product" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <ShoppingCart className="h-5 w-5" />
              Sell Product
            </Link>
            <Link href="/Dashboard/verification" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <User2 className="h-5 w-5" />
              Verification
            </Link>
            <Link href="/customer-service" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <CircleHelp className="h-5 w-5" />
              Help Center
            </Link>
          </nav>

          <nav className="w-full flex justify-between items-center">
            <Link href="/Dashboard/settings" className="flex items-center w-full rounded-lg text-muted-foreground transition-colors hover:text-foreground px-2 py-1">
              <Settings className="h-5 w-5" />
            </Link>
            <div>
              <ModeToggle />
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
