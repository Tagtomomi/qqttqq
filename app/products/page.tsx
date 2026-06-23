import Link from "next/link";
import ProductList from "@/components/ProductList";
import { getProducts } from "@/lib/products";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">キュドッキュ</h1>
          <p className="mt-1 text-sm text-gray-500">
            상품 목록 관리자
          </p>
        </div>
        <Link
          href="/products/new"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          + 상품 추가
        </Link>
      </div>

      <ProductList products={products} />
    </div>
  );
}
