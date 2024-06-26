import React from "react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
  images: string[];
  name: string;
  price: string;
  description: string;
  id: string;
}

export function ProductCard({ images, id, price, description, name }: iAppProps) {
  return (
    <div className="rounded-lg h-full flex flex-col">
      <Carousel className="w-full mx-auto">
        <CarouselContent>
          {images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative h-24 sm:h-32 md:h-44 lg:h-52">
                <Image alt="Product image" src={item} fill className="object-cover w-full h-full rounded-lg" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-14 sm:ml-14 md:ml-14 lg:ml-16 h-4 w-4 sm:h-6 sm:w-6 md:h-6 md:w-6 lg:h-8 lg:w-8" />
        <CarouselNext className="mr-14 sm:mr-14 md:mr-14 lg:mr-16 h-4 w-4 sm:h-6 sm:w-6 md:h-6 md:w-6 lg:h-8 lg:w-8" />
      </Carousel>

      <div className="flex justify-between items-center mt-2">
        <h1 className="font-medium lg:font-semibold text-sm lg:text-xl sm:text-sm md:text-base">{name}</h1>
        <h3 className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs  lg:font-medium text-primary ring-1 ring-inset ring-primary/10">{price}</h3>
      </div>
      <p className="text-gray-600 line-clamp-2 text-xs lg:text-sm mt-2 flex-grow sm:hidden">{description}</p>
      <Button asChild className="w-full mt-5">
        <Link href={`/product/${id}`}>Learn More!</Link>
      </Button>
    </div>
  );
}

export function LoadingProductCard() {
  return (
    <div className="flex flex-col h-full">
      <Skeleton className="w-full h-[230px]" />
      <div className="flex flex-col mt-2 gap-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="w-full h-6" />
      </div>

      <Skeleton className="w-full h-10 mt-5" />
    </div>
  );
}
