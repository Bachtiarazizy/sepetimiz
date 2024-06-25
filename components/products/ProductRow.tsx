import { notFound } from "next/navigation";

import { LoadingProductCard, ProductCard } from "./ProductCard";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import prisma from "@/lib/db";

interface iAppProps {
  category: "newest" | "fashion" | "food" | "electronics" | "exchanges" | "baggages" | "others";
}

async function getData({ category }: iAppProps) {
  switch (category) {
    case "fashion": {
      const data = await prisma.product.findMany({
        where: {
          category: "fashion",
        },
        select: {
          price: true,
          name: true,
          description: true,
          id: true,
          images: true,
        },
        take: 4,
      });

      return {
        data: data,
        title: "fashion",
        link: "/products/fashion",
      };
    }
    case "newest": {
      const data = await prisma.product.findMany({
        select: {
          price: true,
          name: true,
          description: true,
          id: true,
          images: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 4,
      });

      return {
        data: data,
        title: "Newest Products",
        link: "/products/all",
      };
    }
    case "food": {
      const data = await prisma.product.findMany({
        where: {
          category: "food",
        },
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          images: true,
        },
        take: 4,
      });

      return {
        title: "food",
        data: data,
        link: "/products/food",
      };
    }
    case "electronics": {
      const data = await prisma.product.findMany({
        where: {
          category: "electronics",
        },
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          images: true,
        },
        take: 4,
      });

      return {
        title: "electronics",
        data: data,
        link: "/products/electronics",
      };
    }
    case "baggages": {
      const data = await prisma.product.findMany({
        where: {
          category: "baggages",
        },
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          images: true,
        },
        take: 4,
      });

      return {
        title: "baggages",
        data: data,
        link: "/products/baggages",
      };
    }
    case "exchanges": {
      const data = await prisma.product.findMany({
        where: {
          category: "exchanges",
        },
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          images: true,
        },
        take: 4,
      });

      return {
        title: "exchanges",
        data: data,
        link: "/products/exchanges",
      };
    }
    default: {
      return notFound();
    }
  }
}

export function ProductRow({ category }: iAppProps) {
  return (
    <section className="mt-12">
      <Suspense fallback={<LoadingState />}>
        <LoadRows category={category} />
      </Suspense>
    </section>
  );
}

async function LoadRows({ category }: iAppProps) {
  const data = await getData({ category: category });
  return (
    <>
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tighter ">{data.title}</h2>
        <Link href={data.link} className="text-sm hidden font-medium text-primary hover:text-primary/90 md:block">
          All Products <span>&rarr;</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 mt-4 gap-10">
        {data.data.map((product) => (
          <ProductCard images={product.images} key={product.id} id={product.id} name={product.name} price={product.price} description={product.description} />
        ))}
      </div>
    </>
  );
}

function LoadingState() {
  return (
    <div>
      <Skeleton className="h-8 w-56" />
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-10 lg:grid-cols-3">
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
      </div>
    </div>
  );
}