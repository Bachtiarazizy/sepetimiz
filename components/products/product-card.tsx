import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format-price";
import Link from "next/link";

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

const ProductCard = ({ product }: { product: Product }) => {
  const displayPrice = (price: number | null, currency: "IDR" | "USD" | "TRY") => {
    if (!price) return "Price on request";
    return formatPrice(price, currency);
  };

  const productUrl = `/shops/${product.shop.id}/products/${product.id}`;

  return (
    <Card className="group w-full h-full rounded-lg overflow-hidden bg-card hover:bg-accent/5 transition-all duration-300">
      <Link href={productUrl} className="block h-full">
        <CardHeader className="p-0 h-0 pb-[100%] relative">
          <img src={product.images[0] || "/api/placeholder/400/400"} alt={product.title} className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </CardHeader>

        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <Link href={productUrl} className="hover:underline flex-1">
              <h3 className="font-semibold text-base sm:text-lg text-card-foreground line-clamp-2">{product.title}</h3>
            </Link>
            {product.category && (
              <Badge variant="secondary" className="shrink-0">
                {product.category.title}
              </Badge>
            )}
          </div>

          <p className="text-xl sm:text-2xl font-bold text-primary">{displayPrice(product.price, product.currency)}</p>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
