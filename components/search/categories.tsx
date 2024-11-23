"use client";
import { Category } from "@prisma/client";
import React from "react";
import { FaUtensils, FaGlobe, FaDollarSign, FaTshirt, FaShoppingCart, FaHeadphones, FaEllipsisH } from "react-icons/fa";
import { IconType } from "react-icons";
import CategoryItem from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const IconMap: Record<string, IconType> = {
  Foods: FaUtensils,
  Fashions: FaTshirt,
  Electronics: FaHeadphones,
  Baggages: FaShoppingCart,
  Exchanges: FaDollarSign,
  Other: FaEllipsisH,
};

const Categories = ({ items }: CategoriesProps) => {
  return (
    <div>
      {items.map((item) => (
        <CategoryItem key={item.id} label={item.name} icon={IconMap[item.name] || FaEllipsisH} value={item.id} />
      ))}
    </div>
  );
};

export default Categories;
