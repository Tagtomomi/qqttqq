import Link from "next/link";
import ProductList from "@/components/ProductList";
import SupabaseSetupNotice from "@/components/SupabaseSetupNotice";
import { getProducts } from "@/lib/products";
import type { Product } from "@/types/product";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  let products: Product[] = [];
  let errorMessage: string | null = null;

  try {
    products = await getProducts();
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "상품 목록을 불러오지 못했습니다.";
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">キュドッキュ</h1>
          <p className="mt-1 text-sm text-gray-500">상품 목록 관리자</p>
        </div>
        {!errorMessage && (
          <Link
            href="/products/new"
            className="inline-flex items-center justify-center rounded-lg bg-[rgb(57,45,55)] px-4 py-2.5 text-sm font-medium text-white hover:bg-[rgb(45,35,43)]"
          >
            + 상품 추가
          </Link>
        )}
      </div>

      {errorMessage ? (
        <SupabaseSetupNotice message={errorMessage} />
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
}
