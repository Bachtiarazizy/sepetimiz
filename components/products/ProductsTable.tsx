"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, File, Home, LineChart, ListFilter, MoreHorizontal, MoreVertical, Package, Package2, PanelLeft, PlusCircle, Search, Settings, ShoppingCart, Users2, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/db";

import { ActiveToggleDropdownItem, DeleteDropdownItem } from "./Product";
import { useEffect, useState } from "react";
import { Product } from "@/lib/categoryTypes";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function Tables() {
  const [filter, setFilter] = useState<"all" | "available" | "not-available">("all");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, [filter]);

  const fetchProducts = async () => {
    const { getUser } = useKindeBrowserClient();
    const user = await getUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    let where: any = {
      userId: user.id,
    };

    if (filter === "available") {
      where.isAvailable = true;
    } else if (filter === "not-available") {
      where.isAvailable = false;
    }

    const products = await prisma.product.findMany({
      where,
      select: {
        id: true,
        name: true,
        price: true,
        createdAt: true,
        isAvailable: true,
      },
      orderBy: { name: "asc" },
    });

    setProducts(products);
  };

  if (products.length === 0) return <p>No products found</p>;
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>My Products</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all" onClick={() => setFilter("all")}>
                  All
                </TabsTrigger>
                <TabsTrigger value="available" onClick={() => setFilter("available")}>
                  Available
                </TabsTrigger>
                <TabsTrigger value="not-available" onClick={() => setFilter("not-available")}>
                  Not Available
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">{/* Other filter and action buttons */}</div>
            </div>
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>Manage your products and view their sales performance.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Price</TableHead>
                        <TableHead className="hidden md:table-cell">Created at</TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>
                            {product.isAvailable ? (
                              <>
                                <span className="sr-only">Available</span>
                                <CheckCircle2 />
                              </>
                            ) : (
                              <>
                                <span className="sr-only">Unavailable</span>
                                <XCircle className="stroke-destructive" />
                              </>
                            )}
                          </TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>{new Date(product.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>{/* Dropdown actions */}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>{products.length}</strong> products
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
