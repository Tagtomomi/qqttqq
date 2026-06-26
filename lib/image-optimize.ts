const MAX_DIMENSION = 1200;
const WEBP_QUALITY = 82;

export async function optimizeImageBuffer(
  buffer: Buffer,
  contentType: string,
): Promise<{ buffer: Buffer; contentType: string; extension: string }> {
  if (contentType === "image/gif") {
    return { buffer, contentType, extension: "gif" };
  }

  const sharp = (await import("sharp")).default;

  const optimized = await sharp(buffer)
    .rotate()
    .resize(MAX_DIMENSION, MAX_DIMENSION, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: WEBP_QUALITY })
    .toBuffer();

  return {
    buffer: optimized,
    contentType: "image/webp",
    extension: "webp",
  };
}
