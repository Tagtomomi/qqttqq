import Link from "next/link";
import CheckBox from "@/components/CheckBox";
import ProductImage from "@/components/ProductImage";
import { getCategoryLabel } from "@/lib/categories";
import { formatCurrency } from "@/lib/calculations";
import type { Product } from "@/types/product";

function EditIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="h-3.5 w-3.5"
      aria-hidden
    >
      <path
        d="M11.333 2.00004C11.5081 1.82494 11.716 1.68699 11.9447 1.59531C12.1735 1.50363 12.4187 1.46021 12.6663 1.46804C12.914 1.47586 13.1582 1.53484 13.3834 1.64128C13.6086 1.74772 13.8099 1.89914 13.9753 2.08671C14.1408 2.27428 14.267 2.49394 14.3467 2.73255C14.4263 2.97116 14.4576 3.22418 14.4387 3.47554C14.4198 3.7269 14.351 3.97154 14.2367 4.19471L5.94333 12.488L2 13.3334L2.84533 9.39004L11.1387 1.09671L11.333 2.00004Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface ProductGridCardProps {
  product: Product;
}

export default function ProductGridCard({ product }: ProductGridCardProps) {
  const detailPageDone = product.detailPageStatus === "done";
  const isSelling = product.saleStatus === "selling";

  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link
        href={`/products/${product.id}`}
        className="relative block aspect-square bg-gray-100"
      >
        <ProductImage
          src={product.thumbnailUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
      </Link>

      <div className="space-y-1.5 p-2 sm:space-y-2 sm:p-3">
        <div className="flex items-start justify-between gap-1 sm:gap-2">
          <div className="min-w-0 flex-1">
            <Link
              href={`/products/${product.id}`}
              className="block break-keep text-[11px] font-medium leading-snug text-gray-900 hover:text-blue-600 sm:text-sm"
            >
              {product.name}
            </Link>
            <p className="mt-0.5 text-[10px] text-gray-500 sm:text-xs">
              {getCategoryLabel(product.category)}
            </p>
          </div>
          <Link
            href={`/products/${product.id}/edit`}
            aria-label="수정"
            className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100 sm:h-7 sm:w-7"
          >
            <EditIcon />
          </Link>
        </div>

        <div className="text-[11px] leading-snug sm:text-sm">
          <p className="font-medium text-gray-900">
            {formatCurrency(product.salePrice)}
          </p>
          <p className="text-[10px] text-gray-500 sm:text-xs">
            <span className="block sm:inline">원가 {formatCurrency(product.costPrice)}</span>
            <span className="hidden sm:inline"> · </span>
            <span className="block sm:inline">+{product.marginRate}%</span>
          </p>
        </div>

        <div className="flex items-center gap-2 border-t border-gray-100 pt-1.5 text-[10px] text-gray-500 sm:gap-3 sm:pt-2 sm:text-xs">
          <span className="flex items-center gap-1">
            <CheckBox
              checked={detailPageDone}
              ariaLabel={
                detailPageDone ? "상세페이지 완료" : "상세페이지 미완료"
              }
            />
            상페
          </span>
          <span className="flex items-center gap-1">
            <CheckBox
              checked={isSelling}
              ariaLabel={isSelling ? "판매중" : "판매중 아님"}
            />
            판매
          </span>
        </div>
      </div>
    </article>
  );
}
