"use client";

import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import qs from "query-string";

export default function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (term: string) => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: term || undefined,
          categoryId: searchParams.get("categoryId") || undefined,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="relative">
      <SearchIcon className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <Input onChange={(e) => handleSearch(e.target.value)} defaultValue={searchParams.get("title") ?? ""} className="w-full pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200" placeholder="Search for a course" />
    </div>
  );
}
