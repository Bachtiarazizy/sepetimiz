import React from "react";

interface IProducts {
  _id: string;
  description?: string;
  location?: string;
  createdAt: Date;
  images: string[];
  name: string;
  price: string;
  url?: string;
  category: { _id: string; name: string };
}

type CollectionProps = {
  data: IProducts[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: "All_Products" | "Newest_Products" | "Favourite_Products" | "Search_Products";
};

export default function Collection({ data, emptyTitle, emptyStateSubtext, collectionType, limit, page, totalPages, urlParamName }: CollectionProps) {
  return <div>Collection</div>;
}
