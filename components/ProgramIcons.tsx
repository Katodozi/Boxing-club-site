const shared = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function GloveIcon() {
  return (
    <svg {...shared}>
      <path d="M14 20c0-5 4-9 9-9h3c4 0 7 3 7 7v3c3 1 5 4 5 7v6c0 4-3 7-7 7H21c-5 0-9-3-9-8v-4c-2-1-3-3-3-5 0-2 1-4 3-4z" />
      <line x1="20" y1="17" x2="20" y2="26" />
      <line x1="26" y1="16" x2="26" y2="27" />
      <line x1="32" y1="21" x2="32" y2="28" />
    </svg>
  );
}

export function TargetIcon() {
  return (
    <svg {...shared}>
      <circle cx="24" cy="24" r="16" />
      <circle cx="24" cy="24" r="9" />
      <circle cx="24" cy="24" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function KettlebellIcon() {
  return (
    <svg {...shared}>
      <path d="M18 14a6 6 0 0 1 12 0v3H18z" />
      <rect x="12" y="19" width="24" height="20" rx="10" />
    </svg>
  );
}

export function FistsIcon() {
  return (
    <svg {...shared}>
      <path d="M6 20c0-4 3-7 7-7h3c3 0 5 2 5 5v9c0 3-2 5-5 5H9c-2 0-3-1-3-3z" />
      <path d="M42 20c0-4-3-7-7-7h-3c-3 0-5 2-5 5v9c0 3 2 5 5 5h6c2 0 3-1 3-3z" />
      <line x1="21" y1="24" x2="27" y2="24" />
    </svg>
  );
}
