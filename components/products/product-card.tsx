"use client";

import React from "react";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Store } from "lucide-react";
import { formatPrice } from "@/lib/format-price";

// Types
interface Product {
  id: string;
  title: string;
  price: number | null;
  currency: "IDR" | "USD" | "TRY";
  description: string | null;
  images: string[];
  location: string | null;
  phone: string | null;
  shop: {
    title: string;
    isVerified: boolean;
  };
  category: {
    title: string;
  } | null;
}

// ProductCard Component
const ProductCard = ({ product }: { product: Product }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const displayPrice = (price: number | null, currency: "IDR" | "USD" | "TRY") => {
    if (!price) return "Price on request";
    return formatPrice(price, currency);
  };

  return (
    <Card className="w-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <Carousel className="w-full">
          <CarouselContent>
            {product.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-square">
                  <img src={image || "/api/placeholder/400/400"} alt={`${product.title} - Image ${index + 1}`} className="object-cover w-full h-full rounded-t-lg" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{product.title}</h3>
          {product.category && (
            <Badge variant="secondary" className="text-xs">
              {product.category.title}
            </Badge>
          )}
        </div>

        <p className="text-xl font-bold text-primary mb-2">{displayPrice(product.price, product.currency)}</p>

        {product.description && <p className="text-gray-600 text-sm line-clamp-2 mb-3">{product.description}</p>}

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Store className="w-4 h-4" />
            <span className="flex items-center gap-1">
              {product.shop.title}
              {product.shop.isVerified && (
                <Badge variant="secondary" className="ml-1">
                  Verified
                </Badge>
              )}
            </span>
          </div>

          {product.location && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>{product.location}</span>
            </div>
          )}

          {product.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Phone className="w-4 h-4" />
              <span>{product.phone}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default ProductCard;
