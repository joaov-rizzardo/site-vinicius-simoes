"use client";

import { useEffect, useRef, useState } from "react";

type Bolha = { left: string; size: string; dur: string; delay: string; wob: string; wobDelay: string };

// Gera as bolhas com uma semente fixa, para o resultado ser sempre o mesmo
function gerarBolhas(): Bolha[] {
  let seed = 7;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const lista: Bolha[] = [];
  const make = (left: number, size: number, delay: number) => {
    // bolhas maiores sobem mais rápido; menores sobem devagar e balançam mais
    const dur = Math.max(4.5, 11 - size * 0.22 + rnd() * 1.5);
    lista.push({
      left: left.toFixed(2) + "%",
      size: size.toFixed(1) + "px",
      dur: dur.toFixed(2) + "s",
      delay: delay.toFixed(2) + "s",
      wob: (0.6 + rnd() * 0.9 + (size < 8 ? 0 : 0.4)).toFixed(2) + "s",
      wobDelay: (-rnd() * 2).toFixed(2) + "s",
    });
  };
  // fileiras de microbolhas, como saindo de um oxigenador
  [8, 31, 57, 79, 93].forEach((x) => {
    for (let k = 0; k < 7; k++) make(x + (rnd() - 0.5) * 1.2, 3 + rnd() * 4, k * 0.55 + rnd() * 0.3);
  });
  // bolhas soltas de tamanhos variados
  for (let i = 0; i < 16; i++) {
    const s = rnd() < 0.7 ? 6 + rnd() * 9 : 16 + rnd() * 14;
    make(rnd() * 100, s, rnd() * 8);
  }
  return lista;
}

const BOLHAS = gerarBolhas();

// Só começa a animar quando a seção aparece na tela
export default function Bolhas() {
  const ref = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisivel(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="aqua__bolhas" aria-hidden="true">
      {visivel &&
        BOLHAS.map((b, i) => (
          <span
            key={i}
            className="bolha"
            style={{ left: b.left, width: b.size, height: b.size, animationDuration: b.dur, animationDelay: b.delay }}
          >
            <i style={{ animationDuration: b.wob, animationDelay: b.wobDelay }} />
          </span>
        ))}
    </div>
  );
}
