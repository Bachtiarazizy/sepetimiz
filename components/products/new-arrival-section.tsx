"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "./product-card";

interface Product {
  id: string;
  title: string;
  price: number | null;
  currency: "IDR" | "USD" | "TRY";
  images: string[];
  shop: {
    id: string;
  };
  category: {
    title: string;
  } | null;
}

interface NewArrivalsProps {
  products: Product[];
}

export default function NewArrivals({ products }: NewArrivalsProps) {
  return (
    <section className="py-8 sm:py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl sm:items-center font-bold text-foreground">New Arrivals</h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">Discover the latest products from Indonesian students</p>
          </div>
          <Link href="/products">
            <Button variant="ghost" className="hidden sm:flex items-center gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full overflow-hidden"
          >
            <CarouselContent>
              {products.map((product) => (
                <CarouselItem key={product.id} className="basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4 first:pl-0">
                  <div className="h-full">
                    <ProductCard product={product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden sm:block">
              <CarouselPrevious className="-left-4 sm:-left-12" />
              <CarouselNext className="-right-4 sm:-right-12" />
            </div>
          </Carousel>
        </div>

        <Link href="/shops" className="sm:hidden block mt-6">
          <Button className="w-full">View All Products</Button>
        </Link>
      </div>
    </section>
  );
}
