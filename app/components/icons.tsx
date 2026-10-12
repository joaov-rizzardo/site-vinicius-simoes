type P = { width?: number; height?: number; stroke?: string; style?: React.CSSProperties; className?: string };

const STAR = "M12 2l3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21.1l1.4-7L2 9.3l7-.8z";

export function Pata({ width = 34, height = 34, className }: P) {
  return (
    <svg width={width} height={height} viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <g fill="#c9a04e">
        <ellipse cx="32" cy="43" rx="14" ry="12" />
        <ellipse cx="14" cy="27" rx="6" ry="8" transform="rotate(-20 14 27)" />
        <ellipse cx="25" cy="15" rx="6" ry="8.5" transform="rotate(-6 25 15)" />
        <ellipse cx="39" cy="15" rx="6" ry="8.5" transform="rotate(6 39 15)" />
        <ellipse cx="50" cy="27" rx="6" ry="8" transform="rotate(20 50 27)" />
      </g>
    </svg>
  );
}

export function Estrela({ size, style }: { size: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={style}>
      <path d={STAR} fill="#c9a04e" />
    </svg>
  );
}

export function Seta() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function Calendario() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4M7 14h2M11 14h2M15 14h2M7 17.5h2M11 17.5h2" />
    </svg>
  );
}

export function Peixe({ width = 38, height = 30, stroke = "#ffffff" }: P) {
  return (
    <svg width={width} height={height} viewBox="0 0 32 24" fill="none" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12c4-6 12-8 18-3l7-4-2 7 2 7-7-4c-6 5-14 3-18-3z" />
      <circle cx="9" cy="11" r="1" />
      <path d="M14 8c1 2 1 6 0 8" />
    </svg>
  );
}

export function Pessoa() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b8913f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>
  );
}

export function PinoMapa() {
  return (
    <svg width="22" height="27" viewBox="0 0 24 30" aria-hidden="true">
      <path d="M12 1C6 1 2 5.5 2 11c0 7.5 10 18 10 18s10-10.5 10-18C22 5.5 18 1 12 1z" fill="#c9a04e" />
      <circle cx="12" cy="11" r="4" fill="#f8f6f0" />
    </svg>
  );
}

export function Casa() {
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#14573a" strokeWidth="1.3" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 11l9-8 9 8" />
      <path d="M5 9.5V21h5v-6h4v6h5V9.5" />
    </svg>
  );
}

export function Clinica() {
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#14573a" strokeWidth="1.3" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <circle cx="12" cy="9" r="3" />
      <path d="M12 7.5v3M10.5 9h3M8 21v-4h8v4M7 14h10" />
    </svg>
  );
}

export function Hospital() {
  return (
    <svg width="48" height="44" viewBox="0 0 26 24" fill="none" stroke="#14573a" strokeWidth="1.3" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 21V5h10v16M2 21V10h6M18 10h6v11M1 21h24" />
      <path d="M13 7v5M10.5 9.5h5M11 21v-4h4v4M4 13h2M4 16h2M20 13h2M20 16h2" />
    </svg>
  );
}

export function Monitor() {
  return (
    <svg width="48" height="44" viewBox="0 0 24 22" fill="none" stroke="#14573a" strokeWidth="1.3" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="13" rx="1" />
      <path d="M9 21h6M12 15v6M2 12h20" />
    </svg>
  );
}

export function Folha() {
  return (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#6cc48a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 19C3 10 9 4 20 4c0 11-6 17-15 15z" />
      <path d="M5 19l9-9" />
    </svg>
  );
}

export function Gota() {
  return (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#6cc48a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3s7 7.5 7 12a7 7 0 0 1-14 0c0-4.5 7-12 7-12z" />
    </svg>
  );
}

export function PeixeVerde() {
  return (
    <svg width="44" height="38" viewBox="0 0 32 24" fill="none" stroke="#6cc48a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12c4-6 12-8 18-3l8-4-2 7 2 7-8-4c-6 5-14 3-18-3z" />
      <circle cx="8" cy="11" r="1" />
    </svg>
  );
}

export function Engrenagem() {
  return (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#6cc48a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
    </svg>
  );
}

export function Instagram() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

export function WhatsApp({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2-5.4A8.5 8.5 0 1 1 21 11.5z" />
      <path d="M9 9.5c.3 2.2 2.3 4.2 4.5 4.6" />
    </svg>
  );
}

export function RodapePino() {
  return (
    <svg width="20" height="24" viewBox="0 0 24 30" fill="none" stroke="#6cc48a" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 2C6.5 2 3 6 3 11c0 7 9 17 9 17s9-10 9-17c0-5-3.5-9-9-9z" />
      <circle cx="12" cy="11" r="3.5" />
    </svg>
  );
}

export function RodapeClinica() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6cc48a" strokeWidth="1.5" aria-hidden="true">
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <circle cx="12" cy="9" r="3" />
      <path d="M8 21v-4h8v4" />
    </svg>
  );
}

export function RodapeHospital() {
  return (
    <svg width="26" height="24" viewBox="0 0 26 24" fill="none" stroke="#6cc48a" strokeWidth="1.5" aria-hidden="true">
      <path d="M8 21V5h10v16M2 21V10h6M18 10h6v11M1 21h24M13 7v5M10.5 9.5h5" />
    </svg>
  );
}

export function RodapeMonitor() {
  return (
    <svg width="26" height="24" viewBox="0 0 24 22" fill="none" stroke="#6cc48a" strokeWidth="1.5" aria-hidden="true">
      <rect x="2" y="2" width="20" height="13" rx="1" />
      <path d="M9 21h6M12 15v6" />
    </svg>
  );
}
