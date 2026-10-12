type P = { width?: number; height?: number; stroke?: string; style?: React.CSSProperties; className?: string };

// Ícones de traço no padrão Lucide (viewBox 24, pontas arredondadas)
function Traco({ size = 24, cor, espessura = 1.75, children }: { size?: number; cor: string; espessura?: number; children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={cor} strokeWidth={espessura} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

const STAR =
  "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z";

const PEIXE = (
  <>
    <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z" />
    <path d="M18 12v.5" />
    <path d="M16 17.93a9.77 9.77 0 0 1 0-11.86" />
    <path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33" />
    <path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4" />
    <path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98" />
  </>
);

const PINO = (
  <>
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </>
);

const ESTETOSCOPIO = (
  <>
    <path d="M11 2v2" />
    <path d="M5 2v2" />
    <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
    <path d="M8 15a6 6 0 0 0 12 0v-3" />
    <circle cx="20" cy="10" r="2" />
  </>
);

const HOSPITAL = (
  <>
    <path d="M12 6v4" />
    <path d="M14 14h-4" />
    <path d="M14 18h-4" />
    <path d="M14 8h-4" />
    <path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
    <path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18" />
  </>
);

const MONITOR = (
  <>
    <rect width="20" height="14" x="2" y="3" rx="2" />
    <path d="M8 21h8" />
    <path d="M12 17v4" />
  </>
);

export function Pata({ width = 34, height = 34, className }: P) {
  return (
    <svg width={width} height={height} viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <g fill="#c9a04e">
        <path d="M32 33c-5.6 0-8.9 4.1-11.7 8.4-2.4 3.6-5.8 6-5.8 10.2 0 4.4 3.5 7.2 7.6 7.2 4.3 0 6.4-2.1 9.9-2.1s5.6 2.1 9.9 2.1c4.1 0 7.6-2.8 7.6-7.2 0-4.2-3.4-6.6-5.8-10.2C40.9 37.1 37.6 33 32 33z" />
        <ellipse cx="12.5" cy="29" rx="5.2" ry="6.6" transform="rotate(-28 12.5 29)" />
        <ellipse cx="24" cy="16.5" rx="5.4" ry="7.2" transform="rotate(-10 24 16.5)" />
        <ellipse cx="40" cy="16.5" rx="5.4" ry="7.2" transform="rotate(10 40 16.5)" />
        <ellipse cx="51.5" cy="29" rx="5.2" ry="6.6" transform="rotate(28 51.5 29)" />
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
    <Traco size={18} cor="#ffffff" espessura={2.25}>
      <path d="m9 18 6-6-6-6" />
    </Traco>
  );
}

export function Calendario() {
  return (
    <Traco size={30} cor="#ffffff" espessura={1.6}>
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" strokeWidth={2.4} />
    </Traco>
  );
}

export function Peixe({ width = 32, height = 32, stroke = "#ffffff" }: P) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {PEIXE}
    </svg>
  );
}

export function Pessoa() {
  return (
    <Traco cor="#b8913f" espessura={1.8}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </Traco>
  );
}

export function PinoMapa() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" fill="#c9a04e" />
      <circle cx="12" cy="10" r="3" fill="#f8f6f0" />
    </svg>
  );
}

export function Casa() {
  return (
    <Traco size={42} cor="#14573a" espessura={1.4}>
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </Traco>
  );
}

export function Clinica() {
  return (
    <Traco size={42} cor="#14573a" espessura={1.4}>
      {ESTETOSCOPIO}
    </Traco>
  );
}

export function Hospital() {
  return (
    <Traco size={42} cor="#14573a" espessura={1.4}>
      {HOSPITAL}
    </Traco>
  );
}

export function Monitor() {
  return (
    <Traco size={42} cor="#14573a" espessura={1.4}>
      {MONITOR}
    </Traco>
  );
}

export function Folha() {
  return (
    <Traco size={36} cor="#6cc48a" espessura={1.5}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </Traco>
  );
}

export function Gota() {
  return (
    <Traco size={36} cor="#6cc48a" espessura={1.5}>
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </Traco>
  );
}

export function PeixeVerde() {
  return (
    <Traco size={36} cor="#6cc48a" espessura={1.5}>
      {PEIXE}
    </Traco>
  );
}

export function Engrenagem() {
  return (
    <Traco size={36} cor="#6cc48a" espessura={1.5}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </Traco>
  );
}

export function Instagram() {
  return (
    <Traco size={22} cor="#ffffff" espessura={1.9}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <path d="M17.5 6.5h.01" strokeWidth={2.6} />
    </Traco>
  );
}

// Logo oficial (Simple Icons)
export function WhatsApp({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function RodapePino() {
  return <Traco size={20} cor="#6cc48a" espessura={1.8}>{PINO}</Traco>;
}

export function RodapeClinica() {
  return <Traco size={20} cor="#6cc48a" espessura={1.8}>{ESTETOSCOPIO}</Traco>;
}

export function RodapeHospital() {
  return <Traco size={20} cor="#6cc48a" espessura={1.8}>{HOSPITAL}</Traco>;
}

export function RodapeMonitor() {
  return <Traco size={20} cor="#6cc48a" espessura={1.8}>{MONITOR}</Traco>;
}
