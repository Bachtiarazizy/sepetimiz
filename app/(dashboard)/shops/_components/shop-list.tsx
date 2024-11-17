"use client";

import React, { useEffect, useState } from "react";
import { Shop } from "@prisma/client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FilePlus2Icon, Loader, Pencil } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Preview } from "@/components/provider/preview";
import { cn } from "@/lib/utils";

interface ShopListProps {
  userId: string;
}

const ShopList: React.FC<ShopListProps> = ({ userId }) => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const fetchShops = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/shops?userId=${userId}`);
      setShops(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch shops");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, [userId]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Shops</h2>
        <Link href={`/shops/${shops[0]?.id}/products/create`} className={cn(buttonVariants({}), "ml-auto flex items-center gap-1")}>
          <FilePlus2Icon className="h-4 w-4" /> Create product
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Loader className="w-6 h-6 animate-spin" />
        </div>
      ) : shops.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No shops found</div>
      ) : (
        <div className="w-full">
          {shops.map((shop) => (
            <Card key={shop.id} className="relative hover:shadow-lg transition-shadow">
              <Link href={`/shops/${shop.id}/edit`} className="absolute top-2 right-2 p-2 bg-background rounded-full hover:bg-background/80">
                <Pencil className="w-4 h-4" />
              </Link>
              <div className="w-full">
                {shop.images && <img src={shop.images} alt={shop.name} className="w-full h-48 object-cover" />}
                <CardContent className="mt-4">
                  <CardTitle className="mb-2">{shop.name}</CardTitle>
                  <p className="text-gray-600 mb-2">{shop.location}</p>
                  <div className="text-sm text-gray-500">
                    <Preview value={shop.description || ""} />
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopList;
