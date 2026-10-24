"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import * as motion from "motion/react-client";
import { revelar } from "../lib/animacoes";
import { Seta } from "./icons";

// Fotos do Unsplash (uso livre), escolhidas com a cabeça do animal no alto, longe do texto do card
const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=720&q=70`;

const servicos = [
  {
    titulo: "Consulta domiciliar",
    texto: "Exame clínico completo na sua casa, com o animal calmo e sem o estresse do transporte. Em todo o Vale do Paraíba e região.",
    imagem: unsplash("photo-1544378062-0b74cc8b4713"), // weimaraner em fundo cinza
  },
  {
    titulo: "Clínica médica de cães e gatos",
    texto: "Diagnóstico e tratamento com base na pós-graduação em Clínica Médica e Cirúrgica de Pequenos Animais.",
    imagem: unsplash("photo-1558201496-a35f22e7fb5c"), // gato rajado
  },
  {
    titulo: "Atendimento em clínica parceira",
    texto: "Quando o caso pede mais estrutura, o atendimento é feito nas clínicas parceiras de Cachoeira Paulista e Cruzeiro.",
    imagem: unsplash("photo-1724367281416-cf18867ad712"), // cão preto e caramelo
  },
  {
    titulo: "Acompanhamento do tratamento",
    texto: "Cada etapa do tratamento explicada com calma, e acompanhamento da evolução até o seu pet ficar bem.",
    imagem: unsplash("photo-1581562444313-98be7b621dc2"), // vizsla
  },
  {
    titulo: "Consultoria de aquarismo",
    texto: "Para aquários de água doce, presencial ou virtual: montagem, qualidade da água, escolha de peixes e plantas.",
    imagem: unsplash("photo-1785694822755-f2b5bfee8fc3"), // gato cinza olhando para cima
  },
];

const doisDigitos = (n: number) => String(n).padStart(2, "0");

export default function Servicos() {
  const trilho = useRef<HTMLUListElement>(null);
  const [atual, setAtual] = useState(0);
  const [noInicio, setNoInicio] = useState(true);
  const [noFim, setNoFim] = useState(false);

  // Largura de um card + espaço entre eles, usada para contar e para as setas
  const passo = (el: HTMLElement) => {
    const card = el.firstElementChild as HTMLElement | null;
    return card ? card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0") : 1;
  };

  useEffect(() => {
    const el = trilho.current!;
    const atualizar = () => {
      const fim = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      // No fim da rolagem o último card já está visível, então o contador mostra o total
      setAtual(fim ? servicos.length - 1 : Math.min(servicos.length - 1, Math.round(el.scrollLeft / passo(el))));
      setNoInicio(el.scrollLeft < 4);
      setNoFim(fim);
    };
    atualizar();
    el.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("resize", atualizar);
    return () => {
      el.removeEventListener("scroll", atualizar);
      window.removeEventListener("resize", atualizar);
    };
  }, []);

  const mover = (direcao: 1 | -1) => {
    const el = trilho.current!;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direcao * passo(el), behavior: reduzir ? "auto" : "smooth" });
  };

  return (
    <section id="servicos" className="serv" aria-labelledby="servicos-titulo">
      <div className="serv__inner">
        <div className="serv__cabeca">
          <motion.div {...revelar("cima")}>
            <p className="kicker">Serviços</p>
            <h2 id="servicos-titulo" className="titulo-grande titulo-grande--claro">
              O cuidado que <em>eu levo até você</em>
            </h2>
          </motion.div>
          <motion.p className="serv__lead" {...revelar("cima", 1)}>
            Cada atendimento é pensado para o seu animal e para a sua rotina. Estes são os serviços que presto.
          </motion.p>
        </div>

        <motion.div className="serv__carrossel" {...revelar("direita", 2)}>
          <ul ref={trilho} className="serv__trilho" aria-label="Serviços prestados">
            {servicos.map((s, i) => (
              <li key={s.titulo} className="serv-card" aria-label={`${i + 1} de ${servicos.length}: ${s.titulo}`}>
                <Image src={s.imagem} alt="" fill className="serv-card__fundo" sizes="(max-width: 720px) 82vw, 300px" />
                <span className="serv-card__num" aria-hidden="true">
                  {doisDigitos(i + 1)}
                </span>
                <div className="serv-card__corpo">
                  <h3 className="serv-card__titulo">{s.titulo}</h3>
                  <p className="serv-card__texto">{s.texto}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="serv__controles">
            <p className="serv__contador" aria-hidden="true">
              <strong>{doisDigitos(atual + 1)}</strong> / {doisDigitos(servicos.length)}
            </p>
            <div className="serv__progresso" aria-hidden="true">
              <span style={{ transform: `scaleX(${(atual + 1) / servicos.length})` }} />
            </div>
            <div className="serv__setas">
              <button type="button" className="serv__seta serv__seta--voltar" onClick={() => mover(-1)} disabled={noInicio} aria-label="Serviço anterior">
                <Seta />
              </button>
              <button type="button" className="serv__seta" onClick={() => mover(1)} disabled={noFim} aria-label="Próximo serviço">
                <Seta />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
