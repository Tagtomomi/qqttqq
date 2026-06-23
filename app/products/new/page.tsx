import Link from "next/link";
import ProductForm from "@/components/ProductForm";
import { createProductAction } from "../actions";

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6">
        <Link
          href="/products"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← 목록으로
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-gray-900">상품 추가</h1>
      </div>

      <ProductForm onSubmit={createProductAction} />
    </div>
  );
}
