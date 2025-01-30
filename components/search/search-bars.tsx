"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SearchBars() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex flex-row gap-2">
          {/* Search Input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full h-10 pl-10 pr-4 text-sm rounded-md border bg-background 
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          {/* Search Button */}
          <Button type="submit" className="w-full sm:w-auto h-10">
            Search
          </Button>
        </div>
      </form>
    </div>
  );
}
