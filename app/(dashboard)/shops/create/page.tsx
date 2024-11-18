import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CreateShopForm from "../_components/create-shop-form";

export default async function CreateShopPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <CreateShopForm userId={userId} />
    </div>
  );
}
