import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ShopList from "../_components/shop-list";

const MyShopsPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  return (
    <div>
      <ShopList userId={userId} />
    </div>
  );
};

export default MyShopsPage;
