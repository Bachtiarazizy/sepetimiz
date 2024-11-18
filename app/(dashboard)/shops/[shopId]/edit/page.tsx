import { IconBadge } from "@/components/ui/icon-badge";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { Banner } from "@/components/ui/banner";
import { ShopAction } from "@/app/(dashboard)/shops/_components/shop-action";
import NameForm from "@/app/(dashboard)/shops/_components/shop-name-form";
import ShopDescriptionForm from "@/app/(dashboard)/shops/_components/shop-description";
import ShopLocationForm from "@/app/(dashboard)/shops/_components/shop-location";
import ShopImageForm from "@/app/(dashboard)/shops/_components/shop-image-form";
import Link from "next/link";

export default async function Page({ params }: { params: { shopId: string } }) {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const shop = await prisma.shop.findUnique({
    where: {
      id: params.shopId,
      userId,
    },
  });

  if (!shop) {
    return redirect(`/shops/create`);
  }

  const requiredFields = [shop.name, shop.description, shop.images, shop.location];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields} / ${totalFields}) fields completed`;
  const completionPercentage = (completedFields / totalFields) * 100;

  const isCompleted = requiredFields.every(Boolean);
  const canPublish = isCompleted && shop.isVerified;

  // Create a custom Banner wrapper component that accepts both the message and a link
  const VerificationBanner = () => {
    if (!shop.isPublished) {
      if (!shop.isVerified) {
        return (
          <div className="bg-yellow-100 p-4 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <div className="flex-1 text-sm text-yellow-700">
                <p>
                  This shop needs verification before it can be published.{" "}
                  <Link href={`/shops/${params.shopId}/verification/create`} className="font-medium underline text-blue-600 hover:text-blue-800">
                    Complete verification
                  </Link>
                </p>
              </div>
            </div>
          </div>
        );
      }
      return <Banner label="This shop is not published. It will not be visible to buyers." />;
    }
    return null;
  };

  return (
    <>
      <VerificationBanner />
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Shop setup</h1>
            <span className="text-sm text-slate-700">{completionText}</span>
          </div>
          <ShopAction disabled={!canPublish} shopId={params.shopId} isPublished={shop.isPublished} />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl"> Customize your course</h2>
            </div>

            <NameForm initialData={shop} shopId={shop.id} />
            <ShopDescriptionForm initialData={shop} shopId={shop.id} />
            <ShopLocationForm
              initialData={{
                ...shop,
                location: shop.location ?? "",
              }}
              shopId={shop.id}
            />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Shop Image</h2>
              </div>
              <ShopImageForm initialData={shop} shopId={shop.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
