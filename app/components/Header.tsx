"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "../config";

const links = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre Mim" },
  { id: "servicos", label: "Serviços" },
  { id: "onde-atendo", label: "Onde Atendo" },
  { id: "aquarismo", label: "Aquarismo" },
  { id: "avaliacoes", label: "Avaliações" },
];

export default function Header() {
  const [ativo, setAtivo] = useState("inicio");

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

  return (
    <header className="header">
      <div className="header__inner">
        <a href="#inicio" className="marca">
          <Image src="/img/logo.png" alt="Logo Vinicius Vicente Simões" width={317} height={378} priority />
          <span className="marca__textos">
            <span className="marca__nome">{site.nome}</span>
            <span className="marca__cargo">{site.cargo}</span>
          </span>
        </a>
        <nav className="nav" aria-label="Principal">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={ativo === l.id ? "ativo" : undefined}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
