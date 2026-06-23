import Image from "next/image";

interface ProductImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export default function ProductImage({
  src,
  alt,
  fill,
  className,
  sizes,
  priority,
}: ProductImageProps) {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 text-xs text-gray-400 ${className ?? ""}`}
      >
        이미지 없음
      </div>
    );
  }

  const isLocalUpload = src.startsWith("/uploads/");
  const isRemote = src.startsWith("http://") || src.startsWith("https://");
  const isDataUrl = src.startsWith("data:");

  if (isDataUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} className={className} />
    );
  }

  if (!isLocalUpload && !isRemote) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 text-xs text-gray-400 ${className ?? ""}`}
      >
        이미지 없음
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      priority={priority}
      unoptimized={isLocalUpload}
    />
  );
}
