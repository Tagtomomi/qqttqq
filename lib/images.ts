export { UPLOAD_ACCEPT } from "./image-file";

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  let data: { url?: string; error?: string } = {};

  try {
    data = await response.json();
  } catch {
    throw new Error("서버 응답을 읽지 못했습니다. 잠시 후 다시 시도해주세요.");
  }

  if (!response.ok) {
    throw new Error(data.error || "이미지 업로드에 실패했습니다.");
  }

  if (!data.url) {
    throw new Error("업로드는 됐지만 이미지 주소를 받지 못했습니다.");
  }

  return data.url;
}
