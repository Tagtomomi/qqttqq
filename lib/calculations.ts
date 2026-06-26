export function calculateMargin(costPrice: number, salePrice: number) {
  const marginAmount = salePrice - costPrice;
  const marginRate = salePrice > 0 ? (marginAmount / salePrice) * 100 : 0;

  return {
    marginAmount,
    marginRate: Math.round(marginRate * 10) / 10,
  };
}

export function formatCurrency(amount: number): string {
  return `${new Intl.NumberFormat("ko-KR").format(amount)}원`;
}

export function formatNumber(amount: number): string {
  if (!amount) return "";
  return new Intl.NumberFormat("ko-KR").format(amount);
}

export function parseNumber(value: string): number {
  const digits = value.replace(/\D/g, "");
  return digits ? Number(digits) : 0;
}

export function formatPercent(rate: number): string {
  return `${rate.toFixed(1)}%`;
}
