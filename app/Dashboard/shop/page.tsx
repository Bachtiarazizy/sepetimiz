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
      verificationStatus: true,
      id: true,
      shops: {
        select: {
          id: true,
          name: true,
          description: true,
          location: true,
          shopImage: true,
        },
      },
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
    return <VerificationAlert />;
  }

  // Check if user has any shops
  if (data.shops && data.shops.length > 0) {
    // User has at least one shop, render shop details
    const shop = data.shops[0]; // Display the first shop as an example

    return (
      <div className="flex md:justify-start flex-col items-start mt-8 px-6">
        <h1 className="text-2xl font-bold mb-4">Store Details</h1>
        <div className=" shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Name: {shop.name}</h2>
          <p className=" mb-2">Description: {shop.description}</p>
          <p className=" mb-4">Location: {shop.location}</p>
          {shop.shopImage.length > 0 && (
            <div className="relative w-full max-w-md mb-4">
              <img src={shop.shopImage[0]} alt="Shop Image" className="w-full h-auto object-cover rounded-lg border border-gray-300" />
            </div>
          )}
        </div>
      </div>
    );
  }

  // User does not have a shop, render ShopForm
  return (
    <div className="container mx-auto p-6">
      <ShopForm />
    </div>
  );
}
