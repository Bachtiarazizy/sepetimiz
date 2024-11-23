"use client";

import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Badge } from "@/components/ui/badge";

interface CategoryItemProps {
  id: string;
  title: string;
  selected?: boolean;
}

const CategoryItem = ({ id, title, selected }: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: searchParams.get("title"),
          categoryId: selected ? null : id,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <Badge
      onClick={onClick}
      className={`
        px-3 
        py-2
        rounded-full 
        cursor-pointer
        hover:opacity-75 
        transition
        ${selected ? "bg-primary" : "bg-secondary"}
      `}
    >
      {title}
    </Badge>
  );
};

export default CategoryItem;
