import { isHeicFile } from "./image-file";

const MAX_DIMENSION = 1200;
const WEBP_QUALITY = 82;

async function getSharp() {
  return (await import("sharp")).default;
}

export async function convertHeicToJpeg(buffer: Buffer): Promise<Buffer> {
  try {
    const sharp = await getSharp();
    return await sharp(buffer).rotate().jpeg({ quality: 85 }).toBuffer();
  } catch {
    const convert = (await import("heic-convert")).default;
    const output = await convert({
      buffer,
      format: "JPEG",
      quality: 0.85,
    });
    return Buffer.from(output);
  }
}

export async function optimizeImageBuffer(
  buffer: Buffer,
  contentType: string,
): Promise<{ buffer: Buffer; contentType: string; extension: string }> {
  if (contentType === "image/gif") {
    return { buffer, contentType, extension: "gif" };
  }

  const sharp = await getSharp();
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

export async function processUploadImage(
  file: File,
  buffer: Buffer,
  contentType: string,
  extension: string,
): Promise<{ buffer: Buffer; contentType: string; extension: string }> {
  let processed = buffer;
  let type = contentType;
  let ext = extension;

  if (isHeicFile(file) || type === "image/heic" || type === "image/heif") {
    processed = await convertHeicToJpeg(processed);
    type = "image/jpeg";
    ext = "jpg";
  }

  if (type === "image/gif") {
    return { buffer: processed, contentType: type, extension: ext };
  }

  return optimizeImageBuffer(processed, type);
}
