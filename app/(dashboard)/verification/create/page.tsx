import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CreateVerificationForm from "../_components/create-verification-form";
import prisma from "@/lib/db";

export default async function CreateVerificationPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  // Check if the user owns a shop
  const shop = await prisma.shop.findFirst({
    where: { userId: userId },
  });

  // Redirect to shop creation page if no shop is found
  if (!shop) {
    return redirect("/create-shop");
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <CreateVerificationForm shopId={shop.id} />
    </div>
  );
}
