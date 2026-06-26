export const PRODUCT_CATEGORIES = [
  { value: "top", label: "상의" },
  { value: "bottom", label: "하의" },
  { value: "outer", label: "아우터" },
  { value: "dress", label: "원피스" },
  { value: "accessory", label: "소품" },
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]["value"];

export const DEFAULT_PRODUCT_CATEGORY: ProductCategory = "top";

export function getCategoryLabel(category: ProductCategory): string {
  return (
    PRODUCT_CATEGORIES.find((item) => item.value === category)?.label ?? category
  );
}
