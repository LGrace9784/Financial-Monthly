// This code defines two utility functions for handling currency values in the frontend

export function parseCurrencyValue(value) {
  if (value === "" || value === null || value === undefined) {
    return "";
  }

  const sanitized = String(value).replace(/[^\d.]/g, "");

  if (sanitized === "" || sanitized === ".") {
    return "";
  }

  const [wholePart, ...decimalParts] = sanitized.split(".");
  const whole = wholePart.replace(/^0+(?=\d)/, "") || "0";
  const decimal = decimalParts.join("").slice(0, 2);

  return decimal ? `${whole}.${decimal}` : whole;
}

export function formatCurrencyValue(value) {
  if (value === "" || value === null || value === undefined) {
    return "";
  }

  const raw = parseCurrencyValue(value);

  if (raw === "") {
    return "";
  }

  const [wholePart, decimalPart = ""] = String(raw).split(".");
  const safeWhole = wholePart.replace(/^0+(?=\d)/, "") || "0";
  const formattedWhole = Number(safeWhole).toLocaleString("en-US");

  if (!decimalPart) {
    return `$${formattedWhole}`;
  }

  return `$${formattedWhole}.${decimalPart}`;
}
