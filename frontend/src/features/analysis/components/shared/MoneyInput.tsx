import { useEffect, useState } from "react";

const formatCurrencyInput = (value: number): string =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);

const toEditableValue = (value: number): string =>
  new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  }).format(value);

const normalizeMoneyInput = (rawValue: string): string => {
  const trimmedValue = rawValue.trim();
  if (!trimmedValue) {
    return "";
  }

  const sanitizedValue = trimmedValue.replace(/[^\d,.-]/g, "");
  const isNegative = sanitizedValue.startsWith("-");
  const unsignedValue = sanitizedValue.replace(/-/g, "");

  const lastCommaIndex = unsignedValue.lastIndexOf(",");
  const lastDotIndex = unsignedValue.lastIndexOf(".");
  const decimalSeparatorIndex = Math.max(lastCommaIndex, lastDotIndex);
  const hasTrailingSeparator = /[.,]$/.test(unsignedValue);

  if (decimalSeparatorIndex === -1) {
    return `${isNegative ? "-" : ""}${unsignedValue.replace(/[.,]/g, "")}`;
  }

  const integerPart = unsignedValue
    .slice(0, decimalSeparatorIndex)
    .replace(/[.,]/g, "");

  const decimalPart = unsignedValue
    .slice(decimalSeparatorIndex + 1)
    .replace(/[.,]/g, "");

  if (decimalPart.length === 0 && hasTrailingSeparator) {
    return `${isNegative ? "-" : ""}${integerPart},`;
  }

  return `${isNegative ? "-" : ""}${integerPart}${decimalSeparatorIndex !== -1 ? "," : ""}${
    decimalPart.slice(0, 2)
  }`;
};

const parseMoneyValue = (rawValue: string): number | null => {
  const trimmedValue = normalizeMoneyInput(rawValue);
  if (!trimmedValue) {
    return null;
  }

  if (!trimmedValue || trimmedValue === "-" || trimmedValue === "," || trimmedValue === ".") {
    return null;
  }

  const isNegative = trimmedValue.startsWith("-");
  const unsignedValue = trimmedValue.replace(/-/g, "").replace(/\./g, "").replace(",", ".");
  const numericValue = Number(`${isNegative ? "-" : ""}${unsignedValue}`);
  return Number.isFinite(numericValue) ? numericValue : null;
};

interface MoneyInputProps {
  id: string;
  label: string;
  value: number | null | undefined;
  onChange: (value: number | null) => void;
  onBlur?: () => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  optionalBadge?: boolean;
}

function MoneyInput({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  error,
  helperText,
  optionalBadge = false,
}: MoneyInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    if (isFocused) {
      return;
    }
    if (value === null || value === undefined) {
      setDisplayValue("");
      return;
    }
    setDisplayValue(formatCurrencyInput(value));
  }, [isFocused, value]);

  const errorId = error ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="analysis-form-field">
      <div className="analysis-form-field__label-row">
        <label className="analysis-form-field__label" htmlFor={id}>
          {label}
        </label>
        {optionalBadge ? <span className="analysis-form-field__badge">Opcional</span> : null}
      </div>

      {helperText ? (
        <p id={helperId} className="analysis-form-field__helper">
          {helperText}
        </p>
      ) : null}

      <input
        id={id}
        className={`analysis-form-field__input${error ? " analysis-form-field__input--error" : ""}`}
        type="text"
        inputMode="decimal"
        value={displayValue}
        onFocus={() => {
          setIsFocused(true);
          if (value === null || value === undefined) {
            setDisplayValue("");
            return;
          }
          setDisplayValue(toEditableValue(value));
        }}
        onBlur={() => {
          setIsFocused(false);
          if (value === null || value === undefined) {
            setDisplayValue("");
          } else {
            setDisplayValue(formatCurrencyInput(value));
          }
          onBlur?.();
        }}
        onChange={(event) => {
          const nextRawValue = event.target.value;
          const normalizedValue = normalizeMoneyInput(nextRawValue);
          setDisplayValue(normalizedValue);
          onChange(parseMoneyValue(normalizedValue));
        }}
        placeholder={placeholder}
        required={required}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={describedBy}
      />

      {error ? (
        <p id={errorId} className="analysis-form-field__error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default MoneyInput;
