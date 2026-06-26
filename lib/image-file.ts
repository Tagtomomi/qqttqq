const MIME_BY_EXTENSION: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  heic: "image/heic",
  heif: "image/heif",
};

const ALLOWED_MIME_TYPES = new Set(Object.values(MIME_BY_EXTENSION));

export const UPLOAD_ACCEPT =
  "image/*,image/jpeg,image/png,image/webp,image/gif,image/heic,image/heif,.heic,.heif";

export function isHeicFile(file: File): boolean {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  const type = file.type === "image/jpg" ? "image/jpeg" : file.type;

  return (
    type === "image/heic" ||
    type === "image/heif" ||
    extension === "heic" ||
    extension === "heif"
  );
}

export function resolveUploadFile(file: File):
  | { contentType: string; extension: string }
  | { error: string } {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  let contentType = file.type === "image/jpg" ? "image/jpeg" : file.type;

  if (contentType && ALLOWED_MIME_TYPES.has(contentType)) {
    const ext =
      extension ||
      (contentType === "image/jpeg" ? "jpg" : contentType.split("/")[1]);
    return { contentType, extension: ext };
  }

  if (extension && MIME_BY_EXTENSION[extension]) {
    return {
      contentType: MIME_BY_EXTENSION[extension],
      extension,
    };
  }

  return {
    error:
      "JPEG, PNG, WebP, GIF, HEIC 이미지만 업로드할 수 있습니다. iPhone 사진(HEIC)은 JPEG로 자동 변환됩니다.",
  };
}
