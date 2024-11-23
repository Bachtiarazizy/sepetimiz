import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { FilePlus2Icon, Pencil } from "lucide-react";
import { Preview } from "@/components/provider/preview";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const MyShopsPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  // Ambil semua toko milik user berdasarkan userId
  const shops = await prisma.shop.findMany({
    where: {
      userId: userId, // Filter berdasarkan userId
    },
  });

  // Jika tidak ada toko, arahkan ke halaman pembuatan toko
  if (!shops || shops.length === 0) {
    return redirect("/shops/create");
  }

  // Cek setiap toko apakah sudah dipublikasikan
  for (const shop of shops) {
    if (shop.isPublished) {
      // Jika ada toko yang sudah dipublikasikan, tampilkan daftar toko
      return (
        <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Shops</h2>
            <Link href={`/products/create`} className={cn(buttonVariants({}), "ml-auto flex items-center gap-1")}>
              <FilePlus2Icon className="h-4 w-4" /> Create product
            </Link>
          </div>
          <div className="w-full">
            {shops.map((shop) => (
              <Card key={shop.id} className="relative hover:shadow-lg transition-shadow">
                <Link href={`/shops/${shop.id}/edit`} className="absolute top-2 right-2 p-2 bg-background rounded-full hover:bg-background/80">
                  <Pencil className="w-4 h-4" />
                </Link>
                <div className="w-full">
                  {shop.images && <img src={shop.images} alt={shop.name} className="w-full h-48 object-cover" />}
                  <CardContent className="mt-4">
                    <CardTitle className="mb-2">{shop.name}</CardTitle>
                    <p className="text-gray-600 mb-2">{shop.location}</p>
                    <div className="text-sm text-gray-500">
                      <Preview value={shop.description || ""} />
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      );
    } else {
      return redirect(`/shops/${shop.id}/edit`);
    }
  }

  // Jika tidak ada toko yang dipublikasikan, arahkan ke halaman create
  return redirect("/shops/create");
};

export default MyShopsPage;
