"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { revelar } from "../lib/animacoes";
import { site } from "../config";
import { Instagram, Seta } from "./icons";

// Fotos de exemplo: trocar pelas fotos reais dos pacientes (com autorização dos tutores).
// Fotos locais ficam em /public/img; as de banco de imagens vêm do Unsplash (uso livre).
const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=75`;

// Proporções alternadas (quadrada e retrato) para a fileira não ficar monótona
const fotos = [
  { src: unsplash("photo-1558788353-f76d92427f16"), legenda: "Mel · consulta em casa", alt: "Golden retriever sorrindo", proporcao: "1 / 1", foco: "center 35%" },
  { src: unsplash("photo-1536589961747-e239b2abbec2"), legenda: "Mia · check-up anual", alt: "Gato branco e laranja olhando para a câmera", proporcao: "4 / 5", foco: "center 30%" },
  { src: "/img/onde-atendo.jpg", legenda: "Pipoca & Paçoca · primeira consulta", alt: "Vinicius segurando dois filhotes de cachorro", proporcao: "4 / 5", foco: "center 25%" },
  { src: unsplash("photo-1610968755695-d7fcb5fd4b92"), legenda: "Max · acompanhamento", alt: "Pastor alemão olhando para a câmera", proporcao: "1 / 1", foco: "center 30%" },
  { src: "/img/avaliacao-labrador.jpg", legenda: "Thor · vacinas em dia", alt: "Labrador preto", proporcao: "1 / 1", foco: "center 35%" },
  { src: "/img/avaliacao-gato.jpg", legenda: "Frajola · atendimento sem estresse", alt: "Gato deitado tranquilo", proporcao: "4 / 5", foco: "center 40%" },
  { src: "/img/aquario-fundo.jpg", legenda: "Cardume · consultoria de aquarismo", alt: "Aquário plantado de água doce", proporcao: "1 / 1", foco: "center" },
];

// @ do perfil, tirado do link do Instagram
const arroba = "@" + site.instagram.replace(/\/+$/, "").split("/").pop();

// Em telas largas a seção fica presa enquanto a rolagem da página move a fileira de fotos para o lado;
// em telas menores (ou com movimento reduzido) a fileira rola com o dedo, com encaixe em cada foto
const CONSULTA_FIXA = "(min-width: 960px) and (prefers-reduced-motion: no-preference)";

export default function Galeria() {
  const secao = useRef<HTMLElement>(null);
  const trilho = useRef<HTMLDivElement>(null);
  const [fixa, setFixa] = useState(false);
  // Quanto a fileira precisa andar para o último card chegar à tela
  const [distancia, setDistancia] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia(CONSULTA_FIXA);
    const el = trilho.current!;
    const medir = () => {
      setFixa(mq.matches);
      setDistancia(Math.max(0, el.scrollWidth - window.innerWidth));
    };
    medir();
    mq.addEventListener("change", medir);
    window.addEventListener("resize", medir);
    // A largura da fileira muda quando as fotos e a fonte terminam de carregar
    const obs = new ResizeObserver(medir);
    obs.observe(el);
    return () => {
      mq.removeEventListener("change", medir);
      window.removeEventListener("resize", medir);
      obs.disconnect();
    };
  }, []);

  // A posição da seção é lida a cada rolagem: as seções de cima podem mudar de altura depois do carregamento
  const { scrollY } = useScroll();
  const atual = useRef({ fixa, distancia });
  atual.current = { fixa, distancia };
  const x = useTransform(scrollY, () => {
    const s = secao.current;
    if (!atual.current.fixa || !s) return 0;
    const barra = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--barra")) || 0;
    return -Math.min(atual.current.distancia, Math.max(0, barra - s.getBoundingClientRect().top));
  });

  return (
    <section
      ref={secao}
      id="galeria"
      className={fixa ? "galeria galeria--fixa" : "galeria"}
      aria-labelledby="galeria-titulo"
      style={fixa ? { height: `calc(100svh - var(--barra) + ${distancia}px)` } : undefined}
    >
      <div className="galeria__pin">
        <div className="galeria__cabeca">
          <motion.div {...revelar("cima")}>
            <p className="kicker">Pacientes</p>
            <h2 id="galeria-titulo" className="galeria__titulo">
              Quem já passou <em>por aqui.</em>
            </h2>
          </motion.div>
          <motion.p className="galeria__lead" {...revelar("cima", 1)}>
            Alguns dos pacientes atendidos, em casa e nas clínicas parceiras. Cada um com o seu jeito, o seu tempo e o mesmo cuidado.
          </motion.p>
        </div>

        <div className="galeria__janela">
          <motion.div ref={trilho} className="galeria__trilho" style={{ x }}>
            {fotos.map((f) => (
              <figure className="galeria__item" key={f.legenda}>
                <div className="galeria__foto" style={{ aspectRatio: f.proporcao }}>
                  <Image src={f.src} alt={f.alt} fill sizes="(max-width: 960px) 64vw, 26vw" loading="eager" style={{ objectPosition: f.foco }} />
                </div>
                <figcaption>{f.legenda}</figcaption>
              </figure>
            ))}

            {/* Último card da fileira: chamada para o Instagram profissional */}
            <a className="galeria__item galeria__mais" href={site.instagram} target="_blank" rel="noopener">
              <span className="galeria__mais-card">
                <span className="galeria__mais-icone">
                  <Instagram />
                </span>
                <span className="galeria__mais-rotulo">
                  Acompanhe mais fotos <em>no Instagram</em>
                </span>
                <span className="galeria__mais-pe">
                  <span className="galeria__mais-arroba">{arroba}</span>
                  <span className="galeria__mais-seta">
                    <Seta />
                  </span>
                </span>
              </span>
              <span className="galeria__mais-legenda">Siga para ver a rotina dos atendimentos</span>
              <span className="sr-only">(abre o Instagram em nova aba)</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
