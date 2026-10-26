"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { revelar } from "../lib/animacoes";
import { site } from "../config";
import { Instagram, Seta } from "./icons";

// Fotos reais dos atendimentos, guardadas em /public/img

// Proporções alternadas (quadrada e retrato) para a fileira não ficar monótona
const fotos = [
  { src: "/img/galeria-filhotes-sofa.webp", legenda: "Hopper e Cooper · vacinação residencial", alt: "Vinicius sentado no sofá segurando dois filhotes de cachorro", proporcao: "4 / 5", foco: "center top" },
  { src: "/img/galeria-vinicius-gato.webp", legenda: "Mia · check-up anual em clínica parceira", alt: "Vinicius sorrindo e segurando no colo um gato laranja e branco de olhos verdes", proporcao: "4 / 5", foco: "center 30%" },
  { src: "/img/galeria-apaiaris.jpg", legenda: "Apaiaris · consultoria de aquarismo", alt: "Dois peixes apaiari (oscar), um branco e laranja e um escuro com manchas laranja, nadando no aquário", proporcao: "1 / 1", foco: "center 55%" },
  { src: "/img/galeria-vinicius-pitbull.jpg", legenda: "Thor · consulta em clínica parceira", alt: "Vinicius sorrindo e fazendo carinho em um pitbull marrom e branco feliz, de boca aberta", proporcao: "1 / 1", foco: "center 25%" },
  { src: "/img/galeria-vinicius-cao.jpg", legenda: "Dilma · paciente especial, de longa data", alt: "Vinicius de jaleco sorrindo para uma cachorra caramelo de bandana sentada sobre um caixote branco", proporcao: "1 / 1", foco: "center" },
  { src: "/img/galeria-vinicius-caramelo.webp", legenda: "Vitório · coleta de exames residencial", alt: "Vinicius de jaleco agachado ao lado de um cachorro caramelo sorridente, em frente a uma parede de tijolos", proporcao: "4 / 5", foco: "center" },
  { src: "/img/galeria-cardume.jpg", legenda: "Cardume · manutenção do aquário", alt: "Cardume de barbos-tigre e neons nadando entre plantas e um tronco no aquário", proporcao: "1 / 1", foco: "center 45%" },
];

// @ do perfil, tirado do link do Instagram
const arroba = "@" + site.instagram.replace(/\/+$/, "").split("/").pop();

// Com mouse/touchpad (computadores e notebooks, inclusive com zoom do Windows em 125–150%) a seção fica presa
// enquanto a rolagem da página move a fileira de fotos para o lado; no celular e no tablet a fileira rola com o dedo.
// Não depende de "movimento reduzido": a fileira só anda quando a própria pessoa rola, e sem isso o mouse não a alcançava.
const CONSULTA_FIXA = "(min-width: 700px) and (hover: hover) and (pointer: fine)";

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

  // Fora do modo preso (janela estreita), o mouse também arrasta a fileira, como o dedo no celular
  const arraste = useRef<{ x: number; inicio: number; moveu: boolean } | null>(null);
  const pegar = (e: React.PointerEvent<HTMLDivElement>) => {
    if (fixa || e.pointerType !== "mouse" || e.button !== 0) return;
    arraste.current = { x: e.clientX, inicio: e.currentTarget.scrollLeft, moveu: false };
  };
  const arrastar = (e: React.PointerEvent<HTMLDivElement>) => {
    const a = arraste.current;
    if (!a) return;
    const dx = e.clientX - a.x;
    if (!a.moveu && Math.abs(dx) < 5) return;
    if (!a.moveu) {
      a.moveu = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      e.currentTarget.classList.add("galeria__janela--arrastando");
    }
    e.currentTarget.scrollLeft = a.inicio - dx;
  };
  const soltar = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!arraste.current) return;
    e.currentTarget.classList.remove("galeria__janela--arrastando");
    // deixa o clique logo depois saber se foi arraste, para não abrir o Instagram sem querer
    setTimeout(() => (arraste.current = null));
  };
  // Clique que terminou um arraste não abre o link
  const cliqueAposArraste = (e: React.MouseEvent) => {
    if (arraste.current?.moveu) e.preventDefault();
  };

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
              Seu pet também merece <em>esse cuidado</em>
            </h2>
          </motion.div>
          <motion.p className="galeria__lead" {...revelar("cima", 1)}>
            Conheça alguns dos cães e gatos que já atendi em domicílio e nas clínicas parceiras. Cada encontro é único, e todos merecem
            atenção, respeito e cuidado individualizado.
          </motion.p>
        </div>

        <div
          className="galeria__janela"
          onPointerDown={pegar}
          onPointerMove={arrastar}
          onPointerUp={soltar}
          onPointerCancel={soltar}
          onClickCapture={cliqueAposArraste}
          onDragStart={(e) => e.preventDefault()}
        >
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
