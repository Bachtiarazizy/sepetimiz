"use client";

import Link from "next/link";
import { Laptop, ShoppingBag, Briefcase, DollarSign, Utensils, HeartHandshake, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CategorySection() {
  const router = useRouter();

  const categories = [
    {
      name: "Electronics",
      icon: Laptop,
      description: "Gadgets & Tech",
      color: "from-blue-500/20",
      iconColor: "text-blue-500",
      slug: "electronics",
    },
    {
      name: "Fashions",
      icon: ShoppingBag,
      description: "Clothing & Accessories",
      color: "from-pink-500/20",
      iconColor: "text-pink-500",
      slug: "fashions",
    },
    {
      name: "Baggages",
      icon: Briefcase,
      description: "Bags & Luggage",
      color: "from-purple-500/20",
      iconColor: "text-purple-500",
      slug: "baggages",
    },
    {
      name: "Exchanges",
      icon: DollarSign,
      description: "Currency Exchange",
      color: "from-green-500/20",
      iconColor: "text-green-500",
      slug: "exchanges",
    },
    {
      name: "Foods",
      icon: Utensils,
      description: "Indonesian Cuisine",
      color: "from-red-500/20",
      iconColor: "text-red-500",
      slug: "foods",
    },
    {
      name: "Services",
      icon: HeartHandshake,
      description: "Student Services",
      color: "from-amber-500/20",
      iconColor: "text-amber-500",
      slug: "others",
    },
  ];

  const handleCategoryClick = (slug: string) => {
    router.push(`/search?category=${slug}`);
  };

  return (
    <section className="py-12 px-4 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Explore our wide range of products and services offered by Indonesian students in Turkey</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={category.slug}
                onClick={() => handleCategoryClick(category.slug)}
                className={`group relative flex flex-col items-center justify-center p-6 rounded-xl
                  bg-gradient-to-br ${category.color} to-transparent
                  backdrop-blur-sm backdrop-saturate-150 border border-white/10
                  shadow-lg cursor-pointer`}
              >
                <div className={`mb-3 ${category.iconColor}`}>
                  <Icon className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <h3 className="text-foreground font-semibold text-sm md:text-base mb-1">{category.name}</h3>
                <p className="text-muted-foreground text-xs md:text-sm text-center">{category.description}</p>
                <div className="absolute inset-0 rounded-xl border-2 border-transparent transition-all duration-300 group-hover:border-primary/20" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
