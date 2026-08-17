import { useId } from "react";
import "./BrandMark.css";

interface BrandMarkProps {
  size?: number;
}

function BrandMark({ size = 28 }: BrandMarkProps) {
  const gradientId = useId();

  return (
    <svg
      className="brand-mark"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--color-secondary)" />
          <stop offset="1" stopColor="var(--color-primary)" />
        </linearGradient>
      </defs>
      <rect x="4" y="13" width="6" height="10" rx="3" fill={`url(#${gradientId})`} />
      <rect x="13" y="7" width="6" height="16" rx="3" fill={`url(#${gradientId})`} />
      <path
        d="M25 3v15a8 8 0 0 1-14.2 5"
        stroke={`url(#${gradientId})`}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default BrandMark;
