import type { ProductCategory } from "@/lib/categories";

export type { ProductCategory };

export type DetailPageStatus = "not_started" | "in_progress" | "done";

export type SaleStatus = "draft" | "selling" | "sold_out" | "stopped";

export interface Product {
  id: string;
  thumbnailUrl: string;
  name: string;
  category: ProductCategory;
  detailPageStatus: DetailPageStatus;
  detailPageUrl: string;
  costPrice: number;
  salePrice: number;
  marginAmount: number;
  marginRate: number;
  saleStatus: SaleStatus;
  memo: string;
  createdAt: string;
  updatedAt: string;
}

export type ProductInput = Omit<
  Product,
  "id" | "marginAmount" | "marginRate" | "createdAt" | "updatedAt"
>;
