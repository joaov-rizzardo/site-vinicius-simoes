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
  // Bolhas já de bom tamanho; entram aos poucos (atraso crescente), então começam
  // poucas e vão aumentando até a seção ficar cheia
  const colunas = [8, 31, 57, 79, 93];
  const total = 30;
  for (let i = 0; i < total; i++) {
    // metade sai das "fileiras" do oxigenador, metade fica solta pela seção
    const x = i % 2 === 0 ? colunas[(i / 2) % colunas.length] + (rnd() - 0.5) * 2 : rnd() * 100;
    const s = rnd() < 0.65 ? 10 + rnd() * 10 : 20 + rnd() * 16;
    make(x, s, i * 0.55 + rnd() * 0.4);
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
