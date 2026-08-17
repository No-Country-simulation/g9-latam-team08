import { useEffect, useState } from "react";

const formatCurrencyInput = (value: number): string =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);

const toEditableValue = (value: number): string => value.toString().replace(".", ",");

const parseMoneyValue = (rawValue: string): number | null => {
  const trimmedValue = rawValue.trim();

  if (!trimmedValue) {
    return null;
  }

  const sanitizedValue = trimmedValue.replace(/[^\d,.-]/g, "");

  if (!sanitizedValue || sanitizedValue === "-" || sanitizedValue === "," || sanitizedValue === ".") {
    return null;
  }

  const isNegative = sanitizedValue.startsWith("-");
  const unsignedValue = sanitizedValue.replace(/-/g, "").replace(/\./g, "").replace(",", ".");
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
      <label className="analysis-form-field__label" htmlFor={id}>
        {label}
      </label>

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
          setDisplayValue(nextRawValue);
          onChange(parseMoneyValue(nextRawValue));
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
