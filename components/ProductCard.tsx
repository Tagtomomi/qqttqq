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

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const detailPageDone = product.detailPageStatus === "done";
  const isSelling = product.saleStatus === "selling";

  return (
    <tr className="border-t border-gray-100 transition-colors hover:bg-gray-50">
      <td className="w-[100px] px-1 py-2 align-middle">
        <Link
          href={`/products/${product.id}`}
          className="relative block h-[100px] w-[100px] overflow-hidden rounded-md bg-gray-100"
        >
          <ProductImage
            src={product.thumbnailUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="100px"
          />
        </Link>
      </td>

      <td className="min-w-0 py-2 pl-3 pr-1 align-middle">
        <Link
          href={`/products/${product.id}`}
          className="block truncate text-xs font-medium text-gray-900 hover:text-blue-600 sm:text-sm"
        >
          {product.name}
        </Link>
      </td>

      <td className="w-[52px] px-1 py-2 text-center align-middle text-[11px] text-gray-600 sm:text-xs">
        {getCategoryLabel(product.category)}
      </td>

      <td className="w-8 px-1 py-2 text-center align-middle">
        <CheckBox
          checked={detailPageDone}
          ariaLabel={
            detailPageDone ? "상세페이지 완료" : "상세페이지 미완료"
          }
        />
      </td>

      <td className="w-[72px] whitespace-nowrap px-1 py-2 text-right align-middle text-[11px] text-gray-700 sm:text-xs">
        {formatCurrency(product.costPrice)}
      </td>

      <td className="w-[88px] whitespace-nowrap px-1 py-2 text-right align-middle">
        <p className="text-[11px] font-medium text-gray-900 sm:text-xs">
          {formatCurrency(product.salePrice)}
        </p>
        <p className="text-[10px] leading-tight text-gray-500">
          (+
          {new Intl.NumberFormat("ko-KR").format(product.marginAmount)}
          원, +{product.marginRate}%)
        </p>
      </td>

      <td className="w-8 px-1 py-2 text-center align-middle">
        <CheckBox
          checked={isSelling}
          ariaLabel={isSelling ? "판매중" : "판매중 아님"}
        />
      </td>

      <td className="w-7 px-1 py-2 text-center align-middle">
        <Link
          href={`/products/${product.id}/edit`}
          aria-label="수정"
          className="inline-flex h-6 w-6 items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
        >
          <EditIcon />
        </Link>
      </td>
    </tr>
  );
}
