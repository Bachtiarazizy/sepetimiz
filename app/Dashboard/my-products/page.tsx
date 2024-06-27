import ProductsTable from "@/components/products/ProductsTable";
import Tables from "@/components/products/Table";
import { unstable_noStore as noStore } from "next/cache";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return null;
}

export default async function myProductsPage() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  const data = await getData(user.id);
  return (
    <>
      <div className="flex flex-col justify-between items-center my-6 gap-3  px-10 ">
        <h1 className="text-3xl font-bold">My Products</h1>
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]" />
        </div>
        <Tables />
      </div>
    </>
  );
}
