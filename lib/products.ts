import { calculateMargin } from "./calculations";
import type { Product, ProductInput } from "@/types/product";

const mockProducts: Product[] = [
  {
    id: "1",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&h=200&fit=crop",
    name: "오버핏 린넨 셔츠",
    detailPageStatus: "done",
    detailPageUrl: "https://example.com/products/linen-shirt",
    costPrice: 28000,
    salePrice: 59000,
    marginAmount: 31000,
    marginRate: 52.5,
    saleStatus: "selling",
    memo: "여름 시즌 베스트셀러",
    createdAt: "2025-03-10T09:00:00.000Z",
    updatedAt: "2025-06-01T14:30:00.000Z",
  },
  {
    id: "2",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&h=200&fit=crop",
    name: "와이드 데님 팬츠",
    detailPageStatus: "in_progress",
    detailPageUrl: "",
    costPrice: 35000,
    salePrice: 72000,
    marginAmount: 37000,
    marginRate: 51.4,
    saleStatus: "draft",
    memo: "상세 페이지 사진 촬영 예정",
    createdAt: "2025-05-02T11:20:00.000Z",
    updatedAt: "2025-06-15T10:00:00.000Z",
  },
  {
    id: "3",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop",
    name: "니트 가디건",
    detailPageStatus: "not_started",
    detailPageUrl: "",
    costPrice: 22000,
    salePrice: 48000,
    marginAmount: 26000,
    marginRate: 54.2,
    saleStatus: "draft",
    memo: "",
    createdAt: "2025-06-01T08:00:00.000Z",
    updatedAt: "2025-06-01T08:00:00.000Z",
  },
  {
    id: "4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop",
    name: "레더 라이더 재킷",
    detailPageStatus: "done",
    detailPageUrl: "https://example.com/products/leather-jacket",
    costPrice: 89000,
    salePrice: 189000,
    marginAmount: 100000,
    marginRate: 52.9,
    saleStatus: "sold_out",
    memo: "리오더 검토 중",
    createdAt: "2025-01-15T10:00:00.000Z",
    updatedAt: "2025-05-20T16:45:00.000Z",
  },
  {
    id: "5",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&h=200&fit=crop",
    name: "코튼 후드 스웨트셔츠",
    detailPageStatus: "done",
    detailPageUrl: "https://example.com/products/hoodie",
    costPrice: 18000,
    salePrice: 42000,
    marginAmount: 24000,
    marginRate: 57.1,
    saleStatus: "stopped",
    memo: "시즌 종료로 판매 중지",
    createdAt: "2024-11-20T09:30:00.000Z",
    updatedAt: "2025-04-01T12:00:00.000Z",
  },
  {
    id: "6",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=200&fit=crop",
    name: "울 블렌드 코트",
    detailPageStatus: "in_progress",
    detailPageUrl: "",
    costPrice: 120000,
    salePrice: 249000,
    marginAmount: 129000,
    marginRate: 51.8,
    saleStatus: "selling",
    memo: "겨울 신상",
    createdAt: "2025-06-10T13:00:00.000Z",
    updatedAt: "2025-06-18T09:15:00.000Z",
  },
];

let products: Product[] = [...mockProducts];

function withMargin(input: ProductInput): Pick<Product, "marginAmount" | "marginRate"> {
  return calculateMargin(input.costPrice, input.salePrice);
}

export async function getProducts(): Promise<Product[]> {
  return [...products].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export async function getProductById(id: string): Promise<Product | null> {
  return products.find((product) => product.id === id) ?? null;
}

export async function createProduct(input: ProductInput): Promise<Product> {
  const now = new Date().toISOString();
  const product: Product = {
    ...input,
    id: crypto.randomUUID(),
    ...withMargin(input),
    createdAt: now,
    updatedAt: now,
  };

  products = [product, ...products];
  return product;
}

export async function updateProduct(
  id: string,
  input: ProductInput,
): Promise<Product | null> {
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) return null;

  const updated: Product = {
    ...input,
    id,
    ...withMargin(input),
    createdAt: products[index].createdAt,
    updatedAt: new Date().toISOString(),
  };

  products[index] = updated;
  return updated;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const length = products.length;
  products = products.filter((product) => product.id !== id);
  return products.length < length;
}
