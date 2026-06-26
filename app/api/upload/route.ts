import { createServerSupabase } from "@/lib/supabase/server";
import { isHeicFile, resolveUploadFile } from "@/lib/image-file";
import { optimizeImageBuffer } from "@/lib/image-optimize";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_SIZE = 10 * 1024 * 1024;
const BUCKET = "product-images";

async function convertHeicToJpeg(buffer: Buffer): Promise<Buffer> {
  try {
    const sharp = (await import("sharp")).default;
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

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return Response.json({ error: "파일이 없습니다." }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return Response.json(
      { error: "파일 크기는 10MB 이하여야 합니다." },
      { status: 400 },
    );
  }

  const resolved = resolveUploadFile(file);
  if ("error" in resolved) {
    return Response.json({ error: resolved.error }, { status: 400 });
  }

  try {
    let buffer: Buffer = Buffer.from(await file.arrayBuffer());
    let contentType = resolved.contentType;
    let extension = resolved.extension;

    if (
      isHeicFile(file) ||
      contentType === "image/heic" ||
      contentType === "image/heif"
    ) {
      buffer = await convertHeicToJpeg(buffer);
      contentType = "image/jpeg";
      extension = "jpg";
    }

    if (contentType !== "image/gif") {
      const optimized = await optimizeImageBuffer(buffer, contentType);
      buffer = optimized.buffer;
      contentType = optimized.contentType;
      extension = optimized.extension;
    }

    const fileName = `${crypto.randomUUID()}.${extension}`;
    const supabase = createServerSupabase();

    const { error } = await supabase.storage.from(BUCKET).upload(fileName, buffer, {
      contentType,
      upsert: false,
    });

    if (error) {
      return Response.json(
        { error: `이미지 업로드 실패: ${error.message}` },
        { status: 500 },
      );
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET).getPublicUrl(fileName);

    return Response.json({ url: publicUrl });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "이미지 업로드 중 오류가 발생했습니다.";

    if (message.toLowerCase().includes("heic") || isHeicFile(file)) {
      return Response.json(
        {
          error:
            "HEIC 이미지 변환에 실패했습니다. iPhone 설정에서 '호환성 우선'으로 JPG 저장 후 다시 시도해주세요.",
        },
        { status: 500 },
      );
    }

    return Response.json({ error: message }, { status: 500 });
  }
}
