"use client";

import { useMemo, useState } from "react";
import { PRODUCT_CATEGORIES } from "@/lib/categories";
import type {
  DetailPageStatus,
  Product,
  ProductCategory,
  SaleStatus,
} from "@/types/product";
import ProductTable from "./ProductTable";

interface ProductListProps {
  products: Product[];
}

const detailPageOptions: { value: DetailPageStatus | "all"; label: string }[] =
  [
    { value: "all", label: "전체" },
    { value: "not_started", label: "미시작" },
    { value: "in_progress", label: "제작중" },
    { value: "done", label: "완료" },
  ];

const saleStatusOptions: { value: SaleStatus | "all"; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "draft", label: "임시저장" },
  { value: "selling", label: "판매중" },
  { value: "sold_out", label: "품절" },
  { value: "stopped", label: "판매중지" },
];

const categoryOptions: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "전체" },
  ...PRODUCT_CATEGORIES,
];

export default function ProductList({ products }: ProductListProps) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | "all">(
    "all",
  );
  const [detailPageFilter, setDetailPageFilter] = useState<
    DetailPageStatus | "all"
  >("all");
  const [saleStatusFilter, setSaleStatusFilter] = useState<SaleStatus | "all">(
    "all",
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;
      const matchesDetailPage =
        detailPageFilter === "all" ||
        product.detailPageStatus === detailPageFilter;
      const matchesSaleStatus =
        saleStatusFilter === "all" || product.saleStatus === saleStatusFilter;

      return matchesSearch && matchesCategory && matchesDetailPage && matchesSaleStatus;
    });
  }, [products, search, categoryFilter, detailPageFilter, saleStatusFilter]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-2">
            <label htmlFor="search" className="sr-only">
              제품명 검색
            </label>
            <input
              id="search"
              type="search"
              placeholder="제품명 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div>
            <label htmlFor="categoryFilter" className="sr-only">
              카테고리
            </label>
            <select
              id="categoryFilter"
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value as ProductCategory | "all")
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  카테고리: {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="detailPageFilter" className="sr-only">
              상세 제작 상태
            </label>
            <select
              id="detailPageFilter"
              value={detailPageFilter}
              onChange={(e) =>
                setDetailPageFilter(e.target.value as DetailPageStatus | "all")
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {detailPageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  상세 제작: {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="saleStatusFilter" className="sr-only">
              판매상태
            </label>
            <select
              id="saleStatusFilter"
              value={saleStatusFilter}
              onChange={(e) =>
                setSaleStatusFilter(e.target.value as SaleStatus | "all")
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {saleStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  판매상태: {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-500">
          총 {filteredProducts.length}개 상품
        </p>
      </div>

      <ProductTable products={filteredProducts} />
    </div>
  );
}
