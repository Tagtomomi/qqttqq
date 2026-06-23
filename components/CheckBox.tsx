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

interface CheckBoxProps {
  checked: boolean;
  readOnly?: boolean;
  ariaLabel: string;
  onChange?: (checked: boolean) => void;
}

export default function CheckBox({
  checked,
  readOnly = true,
  ariaLabel,
  onChange,
}: CheckBoxProps) {
  return (
    <label
      className={`inline-flex items-center justify-center ${
        readOnly ? "cursor-default" : "cursor-pointer"
      }`}
    >
      <span
        className={`flex h-4 w-4 items-center justify-center rounded border ${
          checked ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-white"
        }`}
      >
        {checked && <CheckIcon />}
      </span>
      {!readOnly && (
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          aria-label={ariaLabel}
          className="sr-only"
        />
      )}
      {readOnly && <span className="sr-only">{ariaLabel}</span>}
    </label>
  );
}

export const PRODUCT_LIST_GRID =
  "grid grid-cols-[32px_minmax(0,1fr)_24px_auto_auto_24px_28px] items-center gap-x-1";
