import { mkdir, writeFile } from "fs/promises";
import path from "path";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return Response.json({ error: "파일이 없습니다." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return Response.json(
      { error: "JPEG, PNG, WebP, GIF 이미지만 업로드할 수 있습니다." },
      { status: 400 },
    );
  }

  if (file.size > MAX_SIZE) {
    return Response.json(
      { error: "파일 크기는 5MB 이하여야 합니다." },
      { status: 400 },
    );
  }

  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeName = `${crypto.randomUUID()}.${extension}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const filePath = path.join(uploadDir, safeName);

  await mkdir(uploadDir, { recursive: true });
  await writeFile(filePath, Buffer.from(await file.arrayBuffer()));

  return Response.json({ url: `/uploads/${safeName}` });
}
