import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const MyShopsPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  return <div>Hello</div>;
};

export default MyShopsPage;
