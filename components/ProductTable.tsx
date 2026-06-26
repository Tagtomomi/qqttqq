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
        <table className="w-full min-w-[480px] table-fixed border-collapse">
          <thead>
            <tr className="bg-gray-50 text-[11px] font-medium text-gray-500 sm:text-xs">
              <th className="w-[100px] px-1 py-2" />
              <th className="py-2 pl-3 pr-1 text-left font-medium">제목</th>
              <th className="w-[52px] px-1 py-2 text-center font-medium">카테</th>
              <th className="w-8 px-1 py-2 text-center font-medium">상페</th>
              <th className="w-[72px] px-1 py-2 text-right font-medium">원가</th>
              <th className="w-[88px] px-1 py-2 text-right font-medium">판매가</th>
              <th className="w-8 px-1 py-2 text-center font-medium">판매</th>
              <th className="w-7 px-1 py-2" />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
