export const formatCurrency = (value: number, locale = "es-AR", currency = "ARS") =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);

export const formatPercentage = (value: number, locale = "es-AR") =>
  new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(value);
