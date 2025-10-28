export const formatCurrencyShorthand = (value: string | null) => {
  if (!value) return "N/A";
  try {
    const num = parseFloat(value);
    if (isNaN(num)) return "N/A";

    if (num >= 1_000_000_000) {
      return `$${(num / 1_000_000_000).toFixed(1)}B`;
    }
    if (num >= 1_000_000) {
      return `$${(num / 1_000_000).toFixed(0)}M`;
    }
    if (num >= 1_000) {
      return `$${(num / 1_000).toFixed(0)}K`;
    }
    return `$${num.toLocaleString()}`;
  } catch (e) {
    return "N/A";
  }
};
