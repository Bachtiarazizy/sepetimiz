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

const MyShopsPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
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
    return redirect("/shops/create");
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

  return (
    <div className="min-h-[calc(100vh-80px)] bg-secondary/50 p-6 md:p-12 md:rounded-tl-3xl">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold">Your Shops</h2>
            <p className="text-muted-foreground mt-1">Manage your shops and their products</p>
          </div>
          <div className="flex gap-3">
            <Link href={`/verification`} className={cn(buttonVariants({ variant: "outline" }), "flex items-center gap-1")}>
              <Shield className="h-4 w-4" />
              Verification
            </Link>
            <Link href={`/shops/${shops[0]?.id}/products/create`} className={cn(buttonVariants({}), "flex items-center gap-1")}>
              <FilePlus2Icon className="h-4 w-4" />
              Create Product
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shops.map((shop) => {
            const verificationStatus = getVerificationStatus(shop);
            const StatusIcon = verificationStatus.icon;

            return (
              <Card key={shop.id} className="group relative overflow-hidden">
                {/* Edit Button */}
                <Link href={`/shops/${shop.id}/edit`} className="absolute top-2 right-2 p-2 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-background">
                  <Pencil className="w-4 h-4" />
                </Link>

                {/* Shop Image */}
                <div className="relative h-48 overflow-hidden">
                  {shop.images ? (
                    <img src={shop.images} alt={shop.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <Store className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Shop Header */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <CardTitle>{shop.name}</CardTitle>
                        <Badge className={cn(verificationStatus.color, "flex items-center gap-1")}>
                          <StatusIcon className="h-3 w-3" />
                          {verificationStatus.label}
                        </Badge>
                      </div>

                      {shop.location && (
                        <div className="flex items-center text-muted-foreground text-sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          {shop.location}
                        </div>
                      )}
                    </div>

                    {/* Shop Description */}
                    <div className="text-sm text-muted-foreground line-clamp-2">
                      <Preview value={shop.description || ""} />
                    </div>

                    {/* Shop Stats */}
                    <div className="pt-4 border-t flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <FilePlus2Icon className="h-4 w-4" />
                        {shop.products.length} Products
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(shop.createdAt), "MMM yyyy")}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyShopsPage;
