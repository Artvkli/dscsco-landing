import type { ReactNode, SVGProps } from "react";

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & { size?: number; sw?: number };

function Icon({ size = 24, sw = 1.7, children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

/** Direction-aware arrow: flips automatically in RTL via the `.arr` class. */
export const ArrowIcon = ({ className = "arr", ...p }: IconProps) => (
  <Icon size={18} sw={2.2} className={className} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);

export const CheckIcon = (p: IconProps) => (
  <Icon sw={2.4} {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Icon>
);

export const LockIcon = (p: IconProps) => (
  <Icon sw={2} {...p}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </Icon>
);

export const InfoIcon = (p: IconProps) => (
  <Icon sw={2} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5.5M12 7.6h.01" />
  </Icon>
);

export const AlertIcon = (p: IconProps) => (
  <Icon sw={2.2} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5.5M12 16.4h.01" />
  </Icon>
);

export const ChevronDownIcon = (p: IconProps) => (
  <Icon sw={2.2} {...p}>
    <path d="M6 9l6 6 6-6" />
  </Icon>
);

export const GlobeIcon = (p: IconProps) => (
  <Icon sw={1.8} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </Icon>
);

export const ImageIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="9" cy="10" r="2" />
    <path d="M21 16l-5-5-9 9" />
  </Icon>
);

/* --- Services --- */
export const VpnIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="4.5" cy="12" r="2.5" />
    <circle cx="19.5" cy="12" r="2.5" />
    <path d="M7 12h2M15 12h2" />
    <rect x="9.5" y="10.5" width="5" height="4.5" rx="1" />
    <path d="M10.6 10.5V9.2a1.4 1.4 0 0 1 2.8 0v1.3" />
  </Icon>
);

export const PhoneIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 4h3l1.5 4-2 1.3a10 10 0 0 0 5.2 5.2l1.3-2 4 1.5v3a2 2 0 0 1-2 2A13 13 0 0 1 3 6a2 2 0 0 1 2-2z" />
    <path d="M15 3.5a6 6 0 0 1 5.5 5.5M15 7a2.5 2.5 0 0 1 2 2" />
  </Icon>
);

export const AppsIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
    <path d="M17 13.5v7M13.5 17h7" />
  </Icon>
);

export const LaptopLockIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="4" y="5" width="16" height="11" rx="1.5" />
    <path d="M2 19h20" />
    <rect x="10" y="9.6" width="4" height="3.4" rx=".6" />
    <path d="M10.8 9.6V8.7a1.2 1.2 0 0 1 2.4 0v.9" />
  </Icon>
);

export const ConsoleIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9h18M7 13h4M7 16.5h6" />
    <circle cx="16.5" cy="14.5" r="2.2" />
  </Icon>
);

export const ShieldCheckIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3l7.5 3v5.2c0 4.6-3.1 8.4-7.5 9.8-4.4-1.4-7.5-5.2-7.5-9.8V6L12 3z" />
    <path d="M8.8 12.2l2.2 2.2 4.2-4.4" />
  </Icon>
);

/* --- International --- */
export const ServerIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="4" y="3.5" width="16" height="7" rx="1.5" />
    <rect x="4" y="13.5" width="16" height="7" rx="1.5" />
    <path d="M8 7h.01M8 17h.01M12 7h4M12 17h4" />
  </Icon>
);

export const GatewayIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3l7.5 3v5.2c0 4.6-3.1 8.4-7.5 9.8-4.4-1.4-7.5-5.2-7.5-9.8V6L12 3z" />
    <circle cx="12" cy="10.5" r="1.9" />
    <path d="M12 12.4V15.5" />
  </Icon>
);

export const UsersIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
    <circle cx="17" cy="9" r="2.4" />
    <path d="M15.6 14.2A4.5 4.5 0 0 1 21 18.5" />
  </Icon>
);

export const UserIcon = (p: IconProps) => (
  <Icon sw={2} {...p}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
  </Icon>
);

/* --- Why DSCSCO --- */
export const LayersIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3l9 5-9 5-9-5 9-5z" />
    <path d="M3 13l9 5 9-5" />
  </Icon>
);

export const ChipIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="6" y="6" width="12" height="12" rx="2" />
    <rect x="9.5" y="9.5" width="5" height="5" rx=".8" />
    <path d="M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5" />
  </Icon>
);

export const NodesIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="5" r="2.2" />
    <circle cx="5" cy="18" r="2.2" />
    <circle cx="19" cy="18" r="2.2" />
    <path d="M11 7l-5 9M13 7l5 9M7.2 18h9.6" />
  </Icon>
);

export const HeadsetIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <rect x="3" y="14" width="4" height="6" rx="1.5" />
    <rect x="17" y="14" width="4" height="6" rx="1.5" />
    <path d="M19 20c0 1-1.5 1.5-3.5 1.5H13" />
  </Icon>
);

export const ExpandIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7" />
  </Icon>
);
