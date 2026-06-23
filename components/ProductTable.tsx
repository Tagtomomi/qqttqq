import { PRODUCT_LIST_GRID } from "@/components/CheckBox";
import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductTableProps {
  products: Product[];
}

export default function ProductTable({ products }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center text-sm text-gray-500">
        검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <div className="min-w-0">
          <div
            className={`${PRODUCT_LIST_GRID} gap-y-0 border-b border-gray-200 bg-gray-50 px-1 py-2 text-[11px] font-medium text-gray-500 sm:text-xs`}
          >
            <span />
            <span>제목</span>
            <span className="text-center">상페</span>
            <span className="text-right">원가</span>
            <span className="text-right">판매가</span>
            <span className="text-center">판매</span>
            <span />
          </div>
          <div className="divide-y divide-gray-100">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
