"use client";

import { Suspense } from "react";
import SearchBox from "./search-box";

function SearchSkeleton() {
  return (
    <div className="relative">
      <div className="h-10 w-full bg-slate-100 animate-pulse rounded-full" />
    </div>
  );
}

export default function SearchSection() {
  return (
    <Suspense fallback={<SearchSkeleton />}>
      <SearchBox />
    </Suspense>
  );
}
