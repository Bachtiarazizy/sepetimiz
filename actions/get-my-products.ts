"use server";

import { z } from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";

export async function toggleProductAvailability(id: string, isAvailable: boolean) {
  await prisma.product.update({ where: { id }, data: { isAvailable } });

  revalidatePath("/");
  revalidatePath("/products");
}

export async function deleteProduct(id: string) {
  const product = await prisma.product.delete({ where: { id } });

  if (product == null) return notFound();

  revalidatePath("/");
  revalidatePath("/products");
}
