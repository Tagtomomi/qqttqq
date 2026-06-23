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

export function formatPercent(rate: number): string {
  return `${rate.toFixed(1)}%`;
}
