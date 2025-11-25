/**
 * Formats a number as Iranian currency with 3 zeros at the beginning
 * Example: 2345000 -> "000,234,500,000"
 */
export const formatIranianPrice = (price: number): string => {
  // Format the number with Persian locale
  const formatted = price.toLocaleString('fa-IR');

  // Add 3 zeros at the beginning
  return `${formatted}`;
};
