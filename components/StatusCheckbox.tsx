import type { DetailPageStatus, SaleStatus } from "@/types/product";

const detailPageOptions: { value: DetailPageStatus; label: string }[] = [
  { value: "not_started", label: "미시작" },
  { value: "in_progress", label: "제작중" },
  { value: "done", label: "완료" },
];

const saleOptions: { value: SaleStatus; label: string }[] = [
  { value: "draft", label: "임시저장" },
  { value: "selling", label: "판매중" },
  { value: "sold_out", label: "품절" },
  { value: "stopped", label: "판매중지" },
];

type StatusCheckboxProps =
  | {
      type: "detailPage";
      value: DetailPageStatus;
      readOnly?: boolean;
      compact?: boolean;
      onChange?: (value: DetailPageStatus) => void;
    }
  | {
      type: "sale";
      value: SaleStatus;
      readOnly?: boolean;
      compact?: boolean;
      onChange?: (value: SaleStatus) => void;
    };

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      className="h-2.5 w-2.5 text-white"
      aria-hidden
    >
      <path
        d="M2.5 6L5 8.5L9.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function StatusCheckbox({
  type,
  value,
  readOnly = false,
  compact = false,
  onChange,
}: StatusCheckboxProps) {
  const options = type === "detailPage" ? detailPageOptions : saleOptions;

  return (
    <div
      className={`flex flex-wrap ${compact ? "gap-x-2 gap-y-1" : "gap-3"}`}
      role="group"
      aria-label={type === "detailPage" ? "상세 제작 상태" : "판매상태"}
    >
      {options.map((option) => {
        const checked = option.value === value;
        const id = `${type}-${option.value}`;

        return (
          <label
            key={option.value}
            htmlFor={readOnly ? undefined : id}
            className={`inline-flex items-center gap-1.5 ${
              readOnly ? "cursor-default" : "cursor-pointer"
            } ${compact ? "text-xs" : "text-sm"}`}
          >
            <span
              className={`flex shrink-0 items-center justify-center rounded border ${
                compact ? "h-3.5 w-3.5" : "h-4 w-4"
              } ${
                checked
                  ? "border-blue-600 bg-blue-600"
                  : "border-gray-300 bg-white"
              }`}
            >
              {checked && <CheckIcon />}
            </span>
            {!readOnly && (
              <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={() => onChange?.(option.value as never)}
                className="sr-only"
              />
            )}
            <span
              className={
                checked ? "font-medium text-gray-900" : "text-gray-500"
              }
            >
              {option.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}
