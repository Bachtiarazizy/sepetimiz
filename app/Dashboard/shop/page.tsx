import ShopForm from "@/components/form/shopForm";
import prisma from "@/lib/db";
import React from "react";
import { unstable_noStore } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import VerificationAlert from "@/components/shared/VerificationAlert";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      verificationStatus: true, // Use verificationStatus instead of isVerified
      id: true,
    },
  });

  return data;
}

export default async function Shop() {
  unstable_noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  const data = await getData(user.id);
  if (!data) {
    redirect("/error-page");
  }

  if (data.verificationStatus === "pending") {
    // Use verificationStatus for comparison
    return <VerificationAlert />;
  }

  return (
    <div>
      <ShopForm />
    </div>
  );
}
