"use server";

import { revalidatePath } from "next/cache";
import { createProduct, updateProduct } from "@/lib/products";
import type { ProductInput } from "@/types/product";

export async function createProductAction(data: ProductInput) {
  await createProduct(data);
  revalidatePath("/products");
}

export async function updateProductAction(id: string, data: ProductInput) {
  await updateProduct(id, data);
  revalidatePath("/products");
  revalidatePath(`/products/${id}`);
}
