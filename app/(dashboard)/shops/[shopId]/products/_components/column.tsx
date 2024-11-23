"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ClipboardIcon, Edit2, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { formatPrice } from "@/lib/format-price";
import { Product } from "@prisma/client";

// Extend the Prisma Product model to include related category data
interface ExtendedProduct extends Product {
  category: {
    title: string;
  } | null;
}

// Props for columns function
interface ColumnsProps {
  shopId: string;
}

export const columns = ({ shopId }: ColumnsProps): ColumnDef<ExtendedProduct>[] => [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Product Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Category <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const category = row.original.category;
      return <Badge variant="outline">{category?.title || "Uncategorized"}</Badge>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Price <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const price = row.getValue("price") as number | null;
      const currency = row.original.currency as "IDR" | "USD" | "TRY";

      return (
        <Badge variant={price === 0 ? "secondary" : "outline"} className={price !== 0 && price !== null ? "bg-transparent border-transparent" : ""}>
          {price === 0 && "For Free"}
          {price === null && "Undefined"}
          {price !== 0 && price !== null && formatPrice(price, currency)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Published <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const isPublished = row.getValue("isPublished") as boolean;

      return (
        <Badge variant={isPublished ? "default" : "secondary"}>
          {isPublished ? (
            "Published"
          ) : (
            <>
              <Eye className="mr-1" /> Draft
            </>
          )}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      const [isLoading, setIsLoading] = useState(false);
      const router = useRouter();

      const onDelete = async () => {
        try {
          setIsLoading(true);
          await axios.delete(`/api/shops/${shopId}/products/${product.id}`);
          toast.success("Product Deleted");
          router.refresh();
          router.push(`/shops/${shopId}/products`);
        } catch {
          toast.error("Something went wrong");
        } finally {
          setIsLoading(false);
        }
      };

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(product.id)}>
                <ClipboardIcon className="w-4 h-4 mr-2" />
                Copy Product ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link href={`/shops/${shopId}/products/${product.id}`}>
                <DropdownMenuItem>
                  <Eye className="w-4 h-4 mr-2" />
                  View Product
                </DropdownMenuItem>
              </Link>
              <Link href={`/shops/${shopId}/products/${product.id}/edit`}>
                <DropdownMenuItem>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Product Details
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <DialogTrigger className="flex gap-1 items-center w-full">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Product
                </DialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent className="sm:max-w-[425px] border">
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>This action cannot be undone. This will permanently delete this product and remove its data from our database.</DialogDescription>
            </DialogHeader>
            <div className="flex w-full gap-2 items-center">
              <DialogClose asChild>
                <Button className="w-full rounded-md hover:scale-100" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button className="w-full rounded-md hover:scale-100" variant="destructive" onClick={onDelete} disabled={isLoading}>
                Delete Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
    enableHiding: false,
  },
];
