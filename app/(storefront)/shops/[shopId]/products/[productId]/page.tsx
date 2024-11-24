import React from "react";
import { Preview } from "@/components/provider/preview";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { formatPrice } from "@/lib/format-price";
import { Store, MapPin, Phone, CheckCircle2, Share2, Heart, MessageCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// You'll need to update this interface based on your database schema
interface ProductPageProps {
  params: {
    shopId: string;
    productId: string;
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { userId } = await auth();

  const product = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      shop: {
        include: {
          verifications: {
            select: {
              status: true,
            },
          },
        },
      },
      category: true,
    },
  });

  if (!product) {
    return redirect(`/shops/${params.shopId}`);
  }

  const isShopVerified = product.shop.verifications?.[0]?.status === "APPROVED";

  const displayPrice = (price: number | null, currency: "IDR" | "USD" | "TRY") => {
    if (!price) return "Price on request";
    return formatPrice(price, currency);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-secondary/50 p-6 md:p-12 md:rounded-tl-3xl">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link href={`/shops/${params.shopId}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ChevronLeft className="w-4 h-4" />
          Back to shop
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Images */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <Carousel className="w-full">
                <CarouselContent>
                  {product.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-square overflow-hidden">
                        <img src={image || "/api/placeholder/800/800"} alt={`${product.title} - Image ${index + 1}`} className="object-cover w-full h-full" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </Card>

            {/* Thumbnail Strip */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <div key={index} className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border cursor-pointer hover:border-primary transition-colors">
                  <img src={image || "/api/placeholder/80/80"} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              {/* Title and Category */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <h1 className="text-3xl font-bold">{product.title}</h1>
                  <Button variant="ghost" size="icon">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
                {product.category && (
                  <Badge variant="secondary" className="text-sm">
                    {product.category.title}
                  </Badge>
                )}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">{displayPrice(product.price, product.currency)}</span>
              </div>
            </div>

            {/* Shop Info Card */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Store className="w-5 h-5 text-muted-foreground" />
                    <span className="font-semibold">{product.shop.title}</span>
                    {isShopVerified && <CheckCircle2 className="w-5 h-5 text-primary" />}
                  </div>
                  <Link href={`/shops/${params.shopId}`}>
                    <Button variant="outline" size="sm">
                      View Shop
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for Description and Details */}
            <Tabs defaultValue="description" className="space-y-4">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-4">
                {product.description ? <Preview value={product.description} /> : <p className="text-muted-foreground">No description available</p>}
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p>{product.category?.title || "Uncategorized"}</p>
                  </div>
                  {/* Add more details as needed */}
                </div>
              </TabsContent>

              <TabsContent value="shipping" className="space-y-4">
                <p className="text-muted-foreground">Contact seller for shipping information</p>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              {product.phone && (
                <Button asChild className="flex-1">
                  <a href={`https://wa.me/${product.phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Contact Seller
                  </a>
                </Button>
              )}

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MessageCircle className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Send Message</SheetTitle>
                  </SheetHeader>
                  {/* Add your message form here */}
                </SheetContent>
              </Sheet>

              <Button variant="outline" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Location */}
            {product.location && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t">
                <MapPin className="w-4 h-4" />
                <span>{product.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
