import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/db";
import { ProductCard } from "@/components/products/ProductCard";
import { Category } from "@prisma/client";

async function getData(productCategory: string) {
  switch (productCategory) {
    case "All": {
      const data = await prisma.product.findMany({
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
        where: {
          status: "published",
        },
      });

      return {
        title: "All Products",
        data: data,
      };
    }
    case "Fashion": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "fashion",
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Fashion Products",
        data: data,
      };
    }
    case "Food": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "food",
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Food Products ",
        data: data,
      };
    }
    case "Electronics": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "electronics",
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Electronics Products",
        data: data,
      };
    }
    case "Baggage": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "baggages",
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Baggage Products",
        data: data,
      };
    }
    case "Exchanges": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "exchanges",
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Exchanges Products",
        data: data,
      };
    }
    default: {
      return notFound();
    }
  }
}

export default async function CategoriesPage({ params }: { params: { name: string } }) {
  noStore();
  const { data, title } = await getData(params.name);
  return (
    <section>
      <h1 className="font-semibold text-3xl my-5">{title}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((item) => (
          <ProductCard item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}
