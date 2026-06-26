"use client";

import { useState } from "react";
import {
  isBrowserDisplayableUrl,
  isValidImageUrl,
} from "@/lib/image-file";

interface ProductImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
}

function ImagePlaceholder({
  className,
  message = "이미지 없음",
}: {
  className?: string;
  message?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center bg-gray-100 text-xs text-gray-400 ${className ?? ""}`}
    >
      {message}
    </div>
  );
}

export default function ProductImage({
  src,
  alt,
  fill,
  className,
  priority,
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);
  const trimmedSrc = src.trim();

  if (!trimmedSrc || failed) {
    return <ImagePlaceholder className={className} />;
  }

  if (!isValidImageUrl(trimmedSrc)) {
    return <ImagePlaceholder className={className} />;
  }

  if (!isBrowserDisplayableUrl(trimmedSrc)) {
    return (
      <ImagePlaceholder className={className} message="HEIC 미리보기 불가" />
    );
  }

  const imgClassName = fill
    ? `absolute inset-0 h-full w-full ${className ?? ""}`
    : className;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={trimmedSrc}
      alt={alt}
      className={imgClassName}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
