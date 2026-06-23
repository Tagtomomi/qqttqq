"use client";

import { useRef, useState } from "react";
import { uploadImage } from "@/lib/images";
import ProductImage from "./ProductImage";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
}

export default function ImageUpload({
  value,
  onChange,
  label = "썸네일 이미지",
  required = false,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setIsUploading(true);

    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "업로드에 실패했습니다.");
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </p>

      <div className="flex items-start gap-4">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          {value ? (
            <ProductImage
              src={value}
              alt="업로드된 이미지"
              fill
              className="object-cover"
              sizes="96px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
              미리보기
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileChange}
            className="hidden"
            id="thumbnail-upload"
            required={required && !value}
          />
          <label
            htmlFor="thumbnail-upload"
            className={`inline-flex cursor-pointer items-center justify-center rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
              isUploading ? "pointer-events-none opacity-50" : ""
            }`}
          >
            {isUploading ? "업로드 중..." : value ? "이미지 변경" : "파일 선택"}
          </label>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-left text-xs text-gray-500 hover:text-gray-700"
            >
              이미지 제거
            </button>
          )}
          <p className="text-xs text-gray-500">JPEG, PNG, WebP, GIF · 최대 5MB</p>
        </div>
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
