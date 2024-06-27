import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import { UserRole } from "@prisma/client";

async function getData(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      userRole: true,
    },
  });

  return user;
}

export default async function AdminPage() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  const userData = await getData(user.id);

  if (!userData || userData.userRole !== UserRole.ADMIN) {
    redirect("/unauthorized"); // Redirect to an unauthorized page or any other page you prefer
  }

  return (
    <div className="flex w-full flex-col justify-center">
      <h1 className="text-3xl font-bold">Admin Page</h1>
      <div className="text-3xl">admin Table</div>
    </div>
  );
}
