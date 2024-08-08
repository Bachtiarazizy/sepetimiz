import React from "react";
import prisma from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Card } from "@/components/ui/card";
import VerificationForm from "@/components/form/VerificationForm";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

async function getData(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      profileImage: true,
      userRole: true,
      verificationStatus: true,
      createdAt: true,
    },
  });

  return user;
}

export default async function Verification() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  const dbUser = await getData(user.id);

  if (!dbUser) {
    redirect("/api/auth/login");
  }

  const isVerified = dbUser.verificationStatus === "success";

  return (
    <section className="w-full mx-auto px-4 md:px-8 mb-14">
      {!isVerified && (
        <Card>
          <VerificationForm />
        </Card>
      )}
      {isVerified && (
        <>
          <Alert>
            <AlertTitle className="text-2xl">Verification Completed</AlertTitle>
            <AlertDescription className="text-sm sm:text-lg">Your account has been successfully verified. You can now proceed to sell products.</AlertDescription>
          </Alert>
          <Button variant="outline" className="shad-primary-btn mt-8" asChild>
            <Link href={`/Dashboard/sell-product`}>Sell Now</Link>
          </Button>
        </>
      )}
    </section>
  );
}
