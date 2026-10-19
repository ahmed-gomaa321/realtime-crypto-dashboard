export function sanitizeNumeric(value: string | number): number {
  const parsed = typeof value === "number" ? value : parseFloat(value);
  return isNaN(parsed) || !isFinite(parsed) ? 0 : parsed;
}

export function sanitizeSymbol(symbol: string): string {
  return symbol.replace(/[^a-zA-Z0-9_]/g, "").toUpperCase();
}
