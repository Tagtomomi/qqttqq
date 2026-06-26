import { formatNumber, parseNumber } from "@/lib/calculations";

interface PriceInputProps {
  id: string;
  value: number;
  onChange: (value: number) => void;
  required?: boolean;
}

export default function PriceInput({
  id,
  value,
  onChange,
  required = false,
}: PriceInputProps) {
  return (
    <input
      id={id}
      type="text"
      inputMode="numeric"
      required={required && value === 0}
      value={formatNumber(value)}
      onChange={(e) => onChange(parseNumber(e.target.value))}
      placeholder="0"
      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    />
  );
}
