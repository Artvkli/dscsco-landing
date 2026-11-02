/** DSCSCO mark: branch nodes converging on a secure core. Replace with the official logo if one exists. */
export default function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" focusable="false" style={{ flex: "none" }}>
      <rect x="0.5" y="0.5" width="39" height="39" rx="11" fill="#0E2B4A" stroke="rgba(94,234,212,.35)" />
      <path
        d="M20 20 L11 12.5 M20 20 L29.5 13 M20 20 L20 30.5 M11 12.5 L29.5 13"
        stroke="#5EEAD4"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      <circle cx="11" cy="12.5" r="3" fill="#5EEAD4" />
      <circle cx="29.5" cy="13" r="3" fill="#5EEAD4" />
      <circle cx="20" cy="30.5" r="3" fill="#5EEAD4" />
      <circle cx="20" cy="20" r="4.6" fill="#10B981" />
    </svg>
  );
}
