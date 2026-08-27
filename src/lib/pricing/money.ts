const EUR_FORMATTER = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export function centsToEuros(cents: number): number {
  return cents / 100;
}

export function eurosToCents(euros: number): number {
  return Math.round(euros * 100);
}

export function formatMoney(cents: number): string {
  return EUR_FORMATTER.format(centsToEuros(cents));
}

export function sumCents(...amounts: number[]): number {
  return amounts.reduce((acc, n) => acc + n, 0);
}

export function applyPercentageDiscount(cents: number, percentage: number): number {
  return Math.round(cents * (1 - percentage / 100));
}

export function applyFixedDiscount(cents: number, discountCents: number): number {
  return Math.max(0, cents - discountCents);
}
