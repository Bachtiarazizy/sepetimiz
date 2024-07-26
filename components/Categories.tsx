"use client";

import { useRouter } from "next/navigation";

import { categoryFilters } from "@/constant";

const Categories = () => {
  const router = useRouter();

  const handleTags = (href: string) => {
    router.push(href);
  };

  return (
    <div className="flex justify-between items-center w-full gap-5 flex-wrap">
      <ul className="flex gap-2 overflow-auto hide-scrollbar">
        {categoryFilters.map((filter) => (
          <button key={filter.name} type="button" onClick={() => handleTags(filter.href)} className={`${"bg-light-white-300 font-medium" ? "font-normal" : ""} px-4 py-3 rounded-full border capitalize whitespace-nowrap`}>
            {filter.name}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
