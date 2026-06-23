"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  calculateMargin,
  formatCurrency,
  formatPercent,
} from "@/lib/calculations";
import type { Product, ProductInput } from "@/types/product";
import ImageUpload from "./ImageUpload";
import StatusCheckbox from "./StatusCheckbox";

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: ProductInput) => Promise<void>;
}

const emptyForm: ProductInput = {
  thumbnailUrl: "",
  name: "",
  detailPageStatus: "not_started",
  detailPageUrl: "",
  costPrice: 0,
  salePrice: 0,
  saleStatus: "draft",
  memo: "",
};

export default function ProductForm({ initialData, onSubmit }: ProductFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ProductInput>(
    initialData
      ? {
          thumbnailUrl: initialData.thumbnailUrl,
          name: initialData.name,
          detailPageStatus: initialData.detailPageStatus,
          detailPageUrl: initialData.detailPageUrl,
          costPrice: initialData.costPrice,
          salePrice: initialData.salePrice,
          saleStatus: initialData.saleStatus,
          memo: initialData.memo,
        }
      : emptyForm,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const margin = useMemo(
    () => calculateMargin(form.costPrice, form.salePrice),
    [form.costPrice, form.salePrice],
  );

  function updateField<K extends keyof ProductInput>(
    key: K,
    value: ProductInput[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.thumbnailUrl) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(form);
      router.push("/products");
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">기본 정보</h2>

        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
            제품명 <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <ImageUpload
          value={form.thumbnailUrl}
          onChange={(url) => updateField("thumbnailUrl", url)}
          required
        />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">상세 페이지</h2>

        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">
            상세 페이지 제작 상태
          </p>
          <StatusCheckbox
            type="detailPage"
            value={form.detailPageStatus}
            onChange={(value) => updateField("detailPageStatus", value)}
          />
        </div>

        <div>
          <label
            htmlFor="detailPageUrl"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            상세 페이지 URL
          </label>
          <input
            id="detailPageUrl"
            type="url"
            value={form.detailPageUrl}
            onChange={(e) => updateField("detailPageUrl", e.target.value)}
            placeholder="https://..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">가격</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="costPrice"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              원가 (원) <span className="text-red-500">*</span>
            </label>
            <input
              id="costPrice"
              type="number"
              required
              min={0}
              value={form.costPrice || ""}
              onChange={(e) =>
                updateField("costPrice", Number(e.target.value) || 0)
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div>
            <label
              htmlFor="salePrice"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              판매가 (원) <span className="text-red-500">*</span>
            </label>
            <input
              id="salePrice"
              type="number"
              required
              min={0}
              value={form.salePrice || ""}
              onChange={(e) =>
                updateField("salePrice", Number(e.target.value) || 0)
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 px-4 py-3">
          <p className="text-sm font-medium text-blue-900">마진 (자동 계산)</p>
          <p className="mt-1 text-lg font-semibold text-blue-900">
            {formatCurrency(margin.marginAmount)}{" "}
            <span className="text-base font-medium text-blue-700">
              ({formatPercent(margin.marginRate)})
            </span>
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">판매</h2>

        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">판매상태</p>
          <StatusCheckbox
            type="sale"
            value={form.saleStatus}
            onChange={(value) => updateField("saleStatus", value)}
          />
        </div>

        <div>
          <label htmlFor="memo" className="mb-1 block text-sm font-medium text-gray-700">
            메모
          </label>
          <textarea
            id="memo"
            rows={4}
            value={form.memo}
            onChange={(e) => updateField("memo", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "저장 중..." : initialData ? "수정하기" : "추가하기"}
        </button>
      </div>
    </form>
  );
}
