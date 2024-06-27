import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Home, LayoutDashboard, LineChart, Package, Package2, PanelLeft, Settings, ShoppingCart, Users2 } from "lucide-react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { UserNav } from "@/components/shared/UserNav";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ModeToggle } from "@/components/provider/ModeToggle";

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between  border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs flex flex-col justify-between">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="/" className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link href="/" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <Home className="h-5 w-5" />
              Home
            </Link>
            <Link href="/Dashboard" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
            <Link href="/Dashboard/sell-products" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <ShoppingCart className="h-5 w-5" />
              Sell Product
            </Link>
            <Link href="/Dashboard/my-products" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <Package className="h-5 w-5" />
              My Products
            </Link>
            <Link href="customer-service" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <Users2 className="h-5 w-5" />
              Services
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

      <div className="">
        <Link href="/" className="flex items-center w-full rounded-lg text-muted-foreground transition-colors hover:text-foreground px-2 py-1">
          <Package2 className="h-5 w-5" />
          <span className="ml-4">Sepetimiz</span>
        </Link>
      </div>
    </header>
  );
}
