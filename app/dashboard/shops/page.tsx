import { Preview } from "@/components/provider/preview";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/db";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { FilePlus2Icon, Pencil, MapPin, Calendar, Shield, ShieldCheck, ShieldX, Store } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const MyShopsPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const shops = await prisma.shop.findMany({
    where: {
      userId: userId,
    },
    include: {
      products: true,
      verifications: {
        select: {
          status: true,
        },
      },
    },
  });

  if (shops.length === 0) {
    return redirect("/dashboard/shops/create");
  }

  const getVerificationStatus = (shop: any) => {
    if (!shop.verifications?.[0]) {
      return {
        label: "Not Verified",
        color: "bg-gray-500",
        icon: Shield,
      };
    }

    switch (shop.verifications[0].status) {
      case "APPROVED":
        return {
          label: "Verified",
          color: "bg-green-500",
          icon: ShieldCheck,
        };
      case "REJECTED":
        return {
          label: "Rejected",
          color: "bg-red-500",
          icon: ShieldX,
        };
      default:
        return {
          label: "Pending",
          color: "bg-yellow-500",
          icon: Shield,
        };
    }
  };

  const shop = shops[0]; // Since we're only dealing with one shop
  const verificationStatus = getVerificationStatus(shop);
  const StatusIcon = verificationStatus.icon;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-secondary/50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold">Your Shop</h2>
            <p className="text-muted-foreground mt-1">Manage your shop and products</p>
          </div>
          <div className="flex gap-3">
            <Link href={`/dashboard/verification`} className={cn(buttonVariants({ variant: "outline" }), "flex items-center gap-1")}>
              <Shield className="h-4 w-4" />
              Verification
            </Link>
            <Link href={`/dashboard/shops/${shop.id}/products/create`} className={cn(buttonVariants({}), "flex items-center gap-1")}>
              <FilePlus2Icon className="h-4 w-4" />
              Create Product
            </Link>
          </div>
        </div>

        <Card className="group relative overflow-hidden">
          {/* Top - Image Section */}
          <div className="relative h-64">
            {shop.images ? (
              <img src={shop.images} alt={shop.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <Store className="h-16 w-16 text-muted-foreground/50" />
              </div>
            )}

            {/* Edit Button */}
            <Link href={`/dashboard/shops/${shop.id}/edit`} className="absolute top-4 right-4 p-2 bg-background/80 rounded-full transition-opacity z-10 hover:bg-background">
              <Pencil className="w-4 h-4" />
            </Link>
          </div>

          {/* Bottom - Content Section */}
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Shop Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">{shop.title}</CardTitle>
                  <Badge className={cn(verificationStatus.color, "flex items-center gap-1")}>
                    <StatusIcon className="h-3 w-3" />
                    {verificationStatus.label}
                  </Badge>
                </div>

                {shop.location && (
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {shop.location}
                  </div>
                )}
              </div>

              {/* Shop Description */}
              <div className="text-muted-foreground">
                <Preview value={shop.description || ""} />
              </div>

              {/* Shop Stats */}
              <div className="pt-6 border-t flex items-center justify-between text-muted-foreground">
                <div className="flex items-center gap-2">
                  <FilePlus2Icon className="h-5 w-5" />
                  {shop.products.length} Products
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Created {format(new Date(shop.createdAt), "MMMM yyyy")}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyShopsPage;
