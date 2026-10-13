"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "../config";

const links = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre Mim" },
  { id: "onde-atendo", label: "Onde Atendo" },
  { id: "aquarismo", label: "Aquarismo" },
  { id: "avaliacoes", label: "Avaliações" },
];

export default function Header() {
  const [ativo, setAtivo] = useState("inicio");
  const [aberto, setAberto] = useState(false);
  const header = useRef<HTMLElement>(null);

  // Publica a altura do cabeçalho em --barra, usada pelas seções de tela cheia e pela rolagem até as âncoras
  useEffect(() => {
    const el = header.current;
    if (!el) return;
    const medir = () => document.documentElement.style.setProperty("--barra", `${el.offsetHeight}px`);
    medir();
    const obs = new ResizeObserver(medir);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Destaca no menu a seção visível na tela
  useEffect(() => {
    const secoes = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null && el.tagName === "SECTION");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setAtivo(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    secoes.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Fecha o menu móvel com Esc ou ao voltar para a largura de desktop
  useEffect(() => {
    if (!aberto) return;
    const mq = window.matchMedia("(min-width: 1141px)");
    const fecharNoDesktop = () => mq.matches && setAberto(false);
    const fecharNoEsc = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    mq.addEventListener("change", fecharNoDesktop);
    document.addEventListener("keydown", fecharNoEsc);
    return () => {
      mq.removeEventListener("change", fecharNoDesktop);
      document.removeEventListener("keydown", fecharNoEsc);
    };
  }, [aberto]);

  return (
    <header ref={header} className="header">
      <div className="header__inner">
        <a href="#inicio" className="marca">
          <Image src="/img/logo.png" alt="Logo Vinicius Vicente Simões" width={317} height={378} priority />
          <span className="marca__textos">
            <span className="marca__nome">{site.nome}</span>
            <span className="marca__cargo">{site.cargo}</span>
          </span>
        </a>
        <button
          type="button"
          className="menu-botao"
          aria-controls="menu-principal"
          aria-expanded={aberto}
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          onClick={() => setAberto((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav id="menu-principal" className={aberto ? "nav nav--aberto" : "nav"} aria-label="Principal">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={ativo === l.id ? "ativo" : undefined}
              onClick={() => setAberto(false)}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
