import React from "react";
import { Preview } from "@/components/provider/preview";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/db";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { Store, MapPin, Calendar, Shield, ShieldCheck, ShieldX } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import ProductList from "@/components/products/product-list";

const ShopDetailsPage = async ({ params }: { params: { shopId: string } }) => {
  const { userId } = await auth();

  const shop = await prisma.shop.findUnique({
    where: {
      id: params.shopId,
    },
    include: {
      products: {
        include: {
          category: {
            select: {
              title: true,
            },
          },
        },
      },
      verifications: {
        select: {
          status: true,
        },
      },
    },
  });

  if (!shop) {
    return redirect("/shops");
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

  const verificationStatus = getVerificationStatus(shop);
  const StatusIcon = verificationStatus.icon;

  const formattedProducts = shop.products.map((product) => ({
    ...product,
    shop: {
      id: shop.id,
      title: shop.title,
      isVerified: shop.verifications?.[0]?.status === "APPROVED",
    },
  }));

  return (
    <div className="min-h-[calc(100vh-80px)] bg-secondary/50 p-6 md:p-12 md:rounded-tl-3xl">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Shop Header Section */}
        <Card className="overflow-hidden">
          <div className="relative h-64 overflow-hidden">
            {shop.images ? (
              <img src={shop.images} alt={shop.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <Store className="h-16 w-16 text-muted-foreground/50" />
              </div>
            )}
          </div>

          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h1 className="text-2xl font-bold">{shop.title}</h1>
                  {shop.location && (
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {shop.location}
                    </div>
                  )}
                </div>
                <Badge className={cn(verificationStatus.color, "flex items-center gap-1 px-3 py-1")}>
                  <StatusIcon className="h-4 w-4" />
                  {verificationStatus.label}
                </Badge>
              </div>

              <div className="text-muted-foreground">
                <Preview value={shop.description || ""} />
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground pt-4 border-t">
                <div className="flex items-center gap-1">
                  <Store className="h-4 w-4" />
                  {shop.products.length} Products
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Created {format(new Date(shop.createdAt), "MMMM d, yyyy")}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Products</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Sort by Price
              </Button>
              <Button variant="outline" size="sm">
                Filter
              </Button>
            </div>
          </div>

          {/* Using ProductList Component */}
          <ProductList products={formattedProducts} />
        </div>
      </div>
    </div>
  );
};

export default ShopDetailsPage;
