"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ClipboardIcon, Edit2, Eye, Trash2 } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { useState } from "react";
import { Product } from "@prisma/client";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(price);

      return (
        <Badge variant={price === 0 ? "secondary" : "outline"} className={price !== 0 && price !== null ? " bg-transparent border-transparent" : ""}>
          {price === 0 && "For Free"}
          {price === null && "Undefined"}
          {price !== 0 && price !== null && <>{formatted}</>}
        </Badge>
      );
    },
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Published
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isPublished = row.getValue("isPublished") || false;
      const [isLoading, setIsLoading] = useState(false);
      const router = useRouter();

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
      const course = row.original;
      const [isLoading, setIsLoading] = useState(false);
      const router = useRouter();

      const onDelete = async () => {
        try {
          setIsLoading(true);
          await axios.delete(`/api/courses/${course.id}`);
          toast.success("Course Deleted");
          router.refresh();
          router.push(`/dashboard/teacher/courses`);
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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(course.id)}>
                <ClipboardIcon className="w-4 h-4 mr-2" />
                Copy Course ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link href={`/courses/${course.id}`}>
                <DropdownMenuItem>
                  <Eye className="w-4 h-4 mr-2" />
                  View Course
                </DropdownMenuItem>
              </Link>
              <Link href={`/dashboard/teacher/courses/${course.id}`}>
                <DropdownMenuItem>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Course Details
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <DialogTrigger className="flex gap-1 items-center w-full">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Course
                </DialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent className="sm:max-w-[425px] border">
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>This action cannot be undone. This will permanently delete this course and remove its data from our database.</DialogDescription>
            </DialogHeader>
            <div className="flex w-full gap-2 items-center">
              <DialogClose asChild>
                <Button className="w-full rounded-md hover:scale-100" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button className="w-full rounded-md hover:scale-100" variant="destructive" onClick={onDelete} disabled={isLoading}>
                Delete Course
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
    enableHiding: false,
  },
];
