"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, Package, Package2, Settings, ShoppingCart, Menu, LayoutDashboard, CircleHelp, User2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ModeToggle } from "@/components/provider/ModeToggle";
import { Button } from "@/components/ui/button";

export default function DashboardNav() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside className={`fixed inset-y-0 left-0 z-10 flex flex-col border-r bg-background ${isExpanded ? "w-64" : "w-14"} transition-width duration-300`}>
      <nav className="flex flex-col gap-4 px-2 py-5">
        <div>
          <button onClick={toggleSidebar} className="flex  items-center justify-center bg-transparent rounded-full p-2 hover:bg-muted text-muted-foreground">
            <Menu className="h-5 w-5" />
          </button>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/" className="flex items-center w-full rounded-lg text-muted-foreground transition-colors hover:text-foreground px-2 py-1">
                <Home className="h-5 w-5" />
                {isExpanded && <span className="ml-4">Home</span>}
              </Link>
            </TooltipTrigger>
            {!isExpanded && <TooltipContent side="right">Home</TooltipContent>}
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/Dashboard" className="flex items-center w-full rounded-lg text-muted-foreground transition-colors hover:text-foreground px-2 py-1">
                <LayoutDashboard className="h-5 w-5" />
                {isExpanded && <span className="ml-4">Dashboard</span>}
              </Link>
            </TooltipTrigger>
            {!isExpanded && <TooltipContent side="right">Dashboard</TooltipContent>}
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/Dashboard/sell-products" className="flex items-center w-full rounded-lg text-muted-foreground transition-colors hover:text-foreground px-2 py-1">
                <ShoppingCart className="h-5 w-5" />
                {isExpanded && <span className="ml-4">Sell Products</span>}
              </Link>
            </TooltipTrigger>
            {!isExpanded && <TooltipContent side="right">Sell Products</TooltipContent>}
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/Dashboard/my-products" className="flex items-center w-full rounded-lg text-muted-foreground transition-colors hover:text-foreground px-2 py-1">
                <Package className="h-5 w-5" />
                {isExpanded && <span className="ml-4">My Products</span>}
              </Link>
            </TooltipTrigger>
            {!isExpanded && <TooltipContent side="right">My Products</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/Dashboard/verification" className="flex items-center w-full rounded-lg text-muted-foreground transition-colors hover:text-foreground px-2 py-1">
                <User2 className="h-5 w-5" />
                {isExpanded && <span className="ml-4">Verification</span>}
              </Link>
            </TooltipTrigger>
            {!isExpanded && <TooltipContent side="right">Verification</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/customer-service" className="flex items-center w-full rounded-lg text-muted-foreground transition-colors hover:text-foreground px-2 py-1">
                <CircleHelp className="h-5 w-5" />
                {isExpanded && <span className="ml-4">Customer Service</span>}
              </Link>
            </TooltipTrigger>
            {!isExpanded && <TooltipContent side="right">Customer Service</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
      </nav>

      <nav className="mt-auto flex flex-col gap-4 px-2 py-5">
        <div>
          <ModeToggle />
          {isExpanded && <span className="ml-4 text-muted-foreground transition-colors hover:text-foreground px-2 py-1">Change Mode</span>}
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/Dashboard/settings" className="flex items-center w-full rounded-lg text-muted-foreground transition-colors hover:text-foreground px-2 py-1">
                <Settings className="h-5 w-5" />
                {isExpanded && <span className="ml-4">Settings</span>}
              </Link>
            </TooltipTrigger>
            {!isExpanded && <TooltipContent side="right">Settings</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}
