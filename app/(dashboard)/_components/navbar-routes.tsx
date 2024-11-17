"use client";

import { Button } from "@/components/ui/button";
import { useAuth, UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const NavbarRoutes = () => {
  return (
    <>
      <div className="flex gap-x-2 ml-auto">
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};
