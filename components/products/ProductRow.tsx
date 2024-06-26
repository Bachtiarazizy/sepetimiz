import { notFound } from "next/navigation";
import { LoadingProductCard, ProductCard } from "./ProductCard";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import prisma from "@/lib/db";

interface iAppProps {
  category?: "newest" | "fashion" | "food" | "electronics" | "exchanges" | "baggages" | "others";
}

async function getData({ category }: iAppProps) {
  if (!category) {
    const data = await prisma.product.findMany({
      select: {
        price: true,
        name: true,
        description: true,
        id: true,
        images: true,
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10, // Example: Take 10 products
    });

    return {
      data: data,
      title: "All Products",
      link: "/products/all",
    };
  }

  switch (category) {
    case "fashion":
    case "food":
    case "electronics":
    case "exchanges":
    case "baggages": {
      const data = await prisma.product.findMany({
        where: {
          category: category,
        },
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          images: true,
          category: true,
        },
        take: 4,
      });

      return {
        title: category,
        data: data,
        link: `/products/${category}`,
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
          category: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 6,
      });

      return {
        data: data,
        title: "Newest Products",
        link: "/products/all",
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
    <main className="my-10">
      <div className="flex flex-row justify-between mb-8 items-center">
        <h2 className="text-lg sm:text-lg md:text-xl lg:text-2xl font-extrabold tracking-tighter ">{data.title}</h2>
        <Link href={data.link} className="text-sm font-medium text-primary hover:text-primary/90">
          All Products <span>&rarr;</span>
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-y-8 gap-5 sm:gap-5 md:gap-8 lg:gap-9 mt-4 mx-auto">
        {data.data.map((product) => (
          <ProductCard images={product.images} key={product.id} id={product.id} name={product.name} price={product.price} category={product.category} description={product.description} />
        ))}
      </div>
    </main>
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
