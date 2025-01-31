"use client";

import { Category } from "@prisma/client";
import { IconType } from "react-icons";
import { usePathname, useSearchParams } from "next/navigation";
import { FaUtensils, FaGlobe, FaDollarSign, FaTshirt, FaShoppingCart, FaHeadphones, FaGamepad, FaHome, FaBook, FaCar, FaGift, FaEllipsisH } from "react-icons/fa";

// Comprehensive icon mapping for various categories
const IconMap: Record<string, IconType> = {
  Foods: FaUtensils,
  Fashion: FaTshirt,
  Electronics: FaHeadphones,
  Baggage: FaShoppingCart,
  Exchange: FaDollarSign,
  Other: FaEllipsisH,
};

interface CategoryItemProps {
  id: string;
  title: string;
  selected: boolean;
}

const CategoryItem = ({ id, title, selected }: CategoryItemProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const Icon = IconMap[title] || FaEllipsisH;

  const createQueryString = (categoryId: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId) {
      params.set("categoryId", categoryId);
    } else {
      params.delete("categoryId");
    }
    return params.toString();
  };

  const href = `${pathname}?${createQueryString(selected ? null : id)}`;

  return (
    <a
      href={href}
      className={`
        group
        flex flex-col items-center
        min-w-[80px] p-2
        rounded-xl
        transition-all duration-200 ease-in-out
        hover:bg-accent
        ${selected ? "bg-primary text-primary-foreground shadow-lg scale-105" : "bg-background hover:shadow-md"}
      `}
    >
      <div
        className={`
        p-2 rounded-full
        ${selected ? "bg-primary-foreground/20" : "bg-secondary group-hover:bg-accent-foreground/10"}
        transition-colors duration-200
      `}
      >
        <Icon
          size={20}
          className={`
            transition-transform duration-200
            ${selected ? "text-primary-foreground" : "text-muted-foreground"}
            group-hover:scale-110
          `}
        />
      </div>
      <span
        className={`
        mt-2 text-xs font-medium
        transition-colors duration-200
        ${selected ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"}
      `}
      >
        {title}
      </span>
    </a>
  );
};

interface CategoriesProps {
  items: Category[];
}

const Categories = ({ items }: CategoriesProps) => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  return (
    <div className="relative">
      <div
        className="
        flex items-center gap-3
        px-4 py-2
        overflow-x-auto
        scrollbar-hide
        mask-image: linear-gradient(to right, transparent, white 10px, white 90%, transparent)
      "
      >
        {items.map((item) => (
          <CategoryItem key={item.id} id={item.id} title={item.title} selected={categoryId === item.id} />
        ))}
      </div>

      {/* Fade edges for scroll indication */}
      <div
        className="
        pointer-events-none
        absolute inset-y-0 left-0 w-8
        bg-gradient-to-r from-background to-transparent
      "
      />
      <div
        className="
        pointer-events-none
        absolute inset-y-0 right-0 w-8
        bg-gradient-to-l from-background to-transparent
      "
      />
    </div>
  );
};

export default Categories;
