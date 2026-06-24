import { calculateMargin } from "./calculations";
import { createServerSupabase } from "./supabase/server";
import type { Product, ProductInput } from "@/types/product";

type ProductRow = {
  id: string;
  thumbnail_url: string;
  name: string;
  detail_page_status: Product["detailPageStatus"];
  detail_page_url: string;
  cost_price: number;
  sale_price: number;
  margin_amount: number;
  margin_rate: number;
  sale_status: Product["saleStatus"];
  memo: string;
  created_at: string;
  updated_at: string;
};

function rowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    thumbnailUrl: row.thumbnail_url,
    name: row.name,
    detailPageStatus: row.detail_page_status,
    detailPageUrl: row.detail_page_url,
    costPrice: row.cost_price,
    salePrice: row.sale_price,
    marginAmount: row.margin_amount,
    marginRate: Number(row.margin_rate),
    saleStatus: row.sale_status,
    memo: row.memo,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function inputToRow(input: ProductInput) {
  const margin = calculateMargin(input.costPrice, input.salePrice);

  return {
    thumbnail_url: input.thumbnailUrl,
    name: input.name,
    detail_page_status: input.detailPageStatus,
    detail_page_url: input.detailPageUrl,
    cost_price: input.costPrice,
    sale_price: input.salePrice,
    margin_amount: margin.marginAmount,
    margin_rate: margin.marginRate,
    sale_status: input.saleStatus,
    memo: input.memo,
    updated_at: new Date().toISOString(),
  };
}

export async function getProducts(): Promise<Product[]> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(`상품 목록 조회 실패: ${error.message}`);
  }

  return (data as ProductRow[]).map(rowToProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`상품 조회 실패: ${error.message}`);
  }

  return data ? rowToProduct(data as ProductRow) : null;
}

export async function createProduct(input: ProductInput): Promise<Product> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("products")
    .insert(inputToRow(input))
    .select("*")
    .single();

  if (error) {
    throw new Error(`상품 추가 실패: ${error.message}`);
  }

  return rowToProduct(data as ProductRow);
}

export async function updateProduct(
  id: string,
  input: ProductInput,
): Promise<Product | null> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("products")
    .update(inputToRow(input))
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (error) {
    throw new Error(`상품 수정 실패: ${error.message}`);
  }

  return data ? rowToProduct(data as ProductRow) : null;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const supabase = createServerSupabase();
  const { error, count } = await supabase
    .from("products")
    .delete({ count: "exact" })
    .eq("id", id);

  if (error) {
    throw new Error(`상품 삭제 실패: ${error.message}`);
  }

  return (count ?? 0) > 0;
}
