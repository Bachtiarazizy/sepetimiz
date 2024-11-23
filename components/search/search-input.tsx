"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import qs from "query-string";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const currentTitle = searchParams.get("title");
    if (currentTitle) {
      setValue(currentTitle);
    }
  }, [searchParams]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const current = qs.parse(searchParams.toString());
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          ...current,
          title: value,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  };

  return (
    <form onSubmit={onSubmit} className="relative">
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <Input onChange={(e) => setValue(e.target.value)} value={value} className="w-full pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200" placeholder="Search for a course" />
    </form>
  );
};

export default SearchInput;
