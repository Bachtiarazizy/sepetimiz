// "use client";
// import { Category } from "@prisma/client";
// import React from "react";
// import { FaUtensils, FaGlobe, FaDollarSign, FaTshirt, FaShoppingCart, FaHeadphones, FaEllipsisH } from "react-icons/fa";
// import { IconType } from "react-icons";
// import CategoryItem from "./category-item";

// interface CategoriesProps {
//   items: Category[];
// }

// const IconMap: Record<string, IconType> = {
//   Foods: FaUtensils,
//   Fashions: FaTshirt,
//   Electronics: FaHeadphones,
//   Baggages: FaShoppingCart,
//   Exchanges: FaDollarSign,
//   Other: FaEllipsisH,
// };

// const Categories = ({ items }: CategoriesProps) => {
//   return (
//     <div>
//       {items.map((item) => (
//         <CategoryItem key={item.id} label={item.title} icon={IconMap[item.title] || FaEllipsisH} value={item.id} />
//       ))}
//     </div>
//   );
// };

// export default Categories;
"use client";

import { Category } from "@prisma/client";
import { IconType } from "react-icons";
import CategoryItem from "./category-item";
import { usePathname, useSearchParams } from "next/navigation";

interface CategoriesProps {
  items: Category[];
}

const Categories = ({ items }: CategoriesProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  return (
    <div className="flex items-center gap-x-2 overflow-x-auto px-6 py-2">
      {items.map((item) => (
        <CategoryItem key={item.id} id={item.id} title={item.title} selected={categoryId === item.id} />
      ))}
    </div>
  );
};

export default Categories;
