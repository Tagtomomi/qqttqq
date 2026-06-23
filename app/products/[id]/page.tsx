import Link from "next/link";
import { notFound } from "next/navigation";
import ProductImage from "@/components/ProductImage";
import StatusCheckbox from "@/components/StatusCheckbox";
import {
  formatCurrency,
  formatPercent,
} from "@/lib/calculations";
import { getProductById } from "@/lib/products";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6">
        <Link
          href="/products"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← 목록으로
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="relative aspect-square w-full bg-gray-100 sm:aspect-[4/3]">
          <ProductImage
            src={product.thumbnailUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
            priority
          />
        </div>

        <div className="space-y-6 p-5 sm:p-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <div className="mt-4 space-y-3">
              <div>
                <p className="mb-1.5 text-xs text-gray-500">상세 제작</p>
                <StatusCheckbox
                  type="detailPage"
                  value={product.detailPageStatus}
                  readOnly
                />
              </div>
              <div>
                <p className="mb-1.5 text-xs text-gray-500">판매상태</p>
                <StatusCheckbox
                  type="sale"
                  value={product.saleStatus}
                  readOnly
                />
              </div>
            </div>
          </div>

          <section className="space-y-3 border-t border-gray-100 pt-5">
            <h2 className="text-sm font-semibold text-gray-900">상세 페이지</h2>
            <dl className="grid gap-3 text-sm">
              <div>
                <dt className="mb-2 text-gray-500">제작 상태</dt>
                <dd>
                  <StatusCheckbox
                    type="detailPage"
                    value={product.detailPageStatus}
                    readOnly
                  />
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500 shrink-0">URL</dt>
                <dd className="text-right">
                  {product.detailPageUrl ? (
                    <a
                      href={product.detailPageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all text-blue-600 hover:underline"
                    >
                      {product.detailPageUrl}
                    </a>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </dd>
              </div>
            </dl>
          </section>

          <section className="space-y-3 border-t border-gray-100 pt-5">
            <h2 className="text-sm font-semibold text-gray-900">가격</h2>
            <dl className="grid gap-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">원가</dt>
                <dd className="font-medium text-gray-900">
                  {formatCurrency(product.costPrice)}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">판매가</dt>
                <dd className="font-medium text-gray-900">
                  {formatCurrency(product.salePrice)}
                </dd>
              </div>
              <div className="flex justify-between gap-4 rounded-lg bg-blue-50 px-4 py-3">
                <dt className="font-medium text-blue-900">마진</dt>
                <dd className="font-semibold text-blue-900">
                  {formatCurrency(product.marginAmount)}{" "}
                  <span className="font-medium text-blue-700">
                    ({formatPercent(product.marginRate)})
                  </span>
                </dd>
              </div>
            </dl>
          </section>

          <section className="space-y-3 border-t border-gray-100 pt-5">
            <h2 className="text-sm font-semibold text-gray-900">판매</h2>
            <dl className="grid gap-3 text-sm">
              <div>
                <dt className="mb-2 text-gray-500">판매상태</dt>
                <dd>
                  <StatusCheckbox
                    type="sale"
                    value={product.saleStatus}
                    readOnly
                  />
                </dd>
              </div>
              <div>
                <dt className="mb-1 text-gray-500">메모</dt>
                <dd className="rounded-lg bg-gray-50 px-3 py-2 text-gray-700 whitespace-pre-wrap">
                  {product.memo || "메모 없음"}
                </dd>
              </div>
            </dl>
          </section>

          <div className="flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row">
            <Link
              href={`/products/${product.id}/edit`}
              className="inline-flex flex-1 items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              수정하기
            </Link>
            <Link
              href="/products"
              className="inline-flex flex-1 items-center justify-center rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              목록으로
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
