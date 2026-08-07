export default function Logomark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="32" cy="32" r="31" fill="var(--color-canvas-alt)" stroke="var(--color-brass)" strokeWidth="2" />
      <path
        d="M32 15c-1.4 0-2.5 1.1-2.5 2.5v1.6C24 20.6 20 25.6 20 31.5V38l-4.5 6h33l-4.5-6v-6.5c0-5.9-4-10.9-9.5-12.4v-1.6c0-1.4-1.1-2.5-2.5-2.5z"
        stroke="var(--color-brass-bright)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.5 46a6.5 6.5 0 0 0 13 0"
        stroke="var(--color-brass-bright)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
