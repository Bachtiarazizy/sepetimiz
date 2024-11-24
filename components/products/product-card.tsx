"use client";

import React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Store, CheckCircle2 } from "lucide-react";
import { formatPrice } from "@/lib/format-price";
import { Preview } from "../provider/preview";
import Link from "next/link";

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
    id: string;
    title: string;
    isVerified: boolean;
  };
  category: {
    title: string;
  } | null;
}

const ProductCard = ({ product }: { product: Product }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const displayPrice = (price: number | null, currency: "IDR" | "USD" | "TRY") => {
    if (!price) return "Price on request";
    return formatPrice(price, currency);
  };

  const productUrl = `/shops/${product.shop.id}/products/${product.id}`;
  const shopUrl = `/shops/${product.shop.id}`;

  return (
    <Card className="group w-full bg-card hover:bg-accent/5 transition-all duration-300 overflow-hidden">
      <Link href={productUrl} className="cursor-pointer">
        <CardHeader className="p-0">
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-square overflow-hidden">
                    <img src={image || "/api/placeholder/400/400"} alt={`${product.title} - Image ${index + 1}`} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="opacity-0 group-hover:opacity-100 transition-opacity" />
            <CarouselNext className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </Carousel>
        </CardHeader>
      </Link>

      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <Link href={productUrl} className="hover:underline">
              <h3 className="font-semibold text-lg text-card-foreground line-clamp-2">{product.title}</h3>
            </Link>
            {product.category && (
              <Badge variant="secondary" className="shrink-0">
                {product.category.title}
              </Badge>
            )}
          </div>
          <p className="text-2xl font-bold text-primary">{displayPrice(product.price, product.currency)}</p>
        </div>

        {product.description && (
          <div className="text-muted-foreground text-sm max-h-24 overflow-hidden">
            <Preview value={product.description} />
          </div>
        )}

        <div className="pt-2 border-t border-border space-y-3">
          <Link href={shopUrl} className="block">
            <div className="flex items-center gap-2 text-sm text-card-foreground hover:text-primary transition-colors">
              <Store className="w-4 h-4 text-muted-foreground" />
              <span className="flex items-center gap-2">
                {product.shop.title}
                {product.shop.isVerified && <CheckCircle2 className="w-4 h-4 text-primary" />}
              </span>
            </div>
          </Link>

          {product.location && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-card-foreground transition-colors">
              <MapPin className="w-4 h-4" />
              <span>{product.location}</span>
            </div>
          )}

          {product.phone && (
            <a href={`https://wa.me/${product.phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-card-foreground transition-colors">
              <Phone className="w-4 h-4" />
              <span>{product.phone}</span>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
