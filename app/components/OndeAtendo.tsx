"use client";

import Image from "next/image";
import { useState } from "react";
import * as motion from "motion/react-client";
import { site } from "../config";
import { revelar } from "../lib/animacoes";
import { CIDADES, PONTOS, VALE_ALTURA, VALE_CONTORNO, VALE_LARGURA, VALE_MUNICIPIOS } from "../lib/mapaVale";
import { PinoMapa, WhatsApp } from "./icons";

const maps = (busca: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(busca)}`;
const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=640&q=70`;
// Pexels: fotos de uso livre, sem necessidade de crédito
const pexels = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=640`;

type Local = {
  id: "casa" | "cachoeira" | "cruzeiro" | "aquario";
  tag: string;
  titulo: string;
  texto?: string;
  endereco?: string;
  foto: string;
  alt: string;
  // ponto de foco do recorte (object-position), para fotos que não são horizontais
  foco?: string;
  link: { rotulo: string; href: string; zap?: boolean };
};

const locais: Local[] = [
  {
    id: "casa",
    tag: "Em domicílio",
    titulo: "Atendimento residencial",
    texto: "Em todo o Vale do Paraíba e região. Levo o cuidado até você.",
    foto: unsplash("photo-1668036268050-ca69ef2f0ca0"),
    alt: "Cachorro sentado tranquilo na sala de casa",
    link: { rotulo: "Ver região no Maps", href: maps("Vale do Paraíba, SP") },
  },
  {
    id: "cachoeira",
    tag: "Clínica parceira",
    titulo: "Cachoeira Paulista",
    endereco: "Rua Orris Benedito Barbosa, 318.",
    foto: pexels(27083736),
    foco: "center 62%",
    alt: "Fachada da antiga Estação Ferroviária de Cachoeira Paulista com um ipê amarelo",
    link: { rotulo: "Ver no Maps", href: maps("Rua Orris Benedito Barbosa, 318, Cachoeira Paulista - SP") },
  },
  {
    id: "cruzeiro",
    tag: "Clínica parceira",
    titulo: "Cruzeiro",
    endereco: "Rua Dom Bôsco, Centro, 343.",
    foto: pexels(35641806),
    foco: "center 88%",
    alt: "Cruzeiro, com a torre da igreja e a Serra da Mantiqueira ao fundo",
    link: { rotulo: "Ver no Maps", href: maps("Rua Dom Bosco, 343, Centro, Cruzeiro - SP") },
  },
  {
    id: "aquario",
    tag: "Presencial ou virtual",
    titulo: "Consultoria de aquarismo",
    texto: "Para aquários de água doce, presencial ou virtual.",
    foto: "/img/aquario-fundo.jpg",
    alt: "Aquário plantado de água doce com cardumes de peixes",
    link: { rotulo: "Agendar consultoria", href: site.whatsapp, zap: true },
  },
];

// Pino verde que surge (cresce de baixo para cima) quando `visivel` é verdadeiro
function Pino({ x, y, visivel, atraso = 0, grande, nome, lado = "dir" }: { x: number; y: number; visivel: boolean; atraso?: number; grande?: boolean; nome?: string; lado?: "esq" | "dir" }) {
  return (
    <g transform={`translate(${x} ${y})${grande ? "" : " scale(.62)"}`}>
      <g className={visivel ? "vale__pino vale__pino--visivel" : "vale__pino"} style={{ transitionDelay: visivel ? `${atraso}ms` : "0ms" }}>
        <path className="vale__gota" d="M0 0c-12-14-18-22-18-31a18 18 0 0 1 36 0c0 9-6 17-18 31z" />
        <circle className="vale__miolo" cy="-31" r="6.5" />
        {nome && (
          <text className="vale__nome" x={lado === "dir" ? 26 : -26} y="-26" textAnchor={lado === "dir" ? "start" : "end"}>
            {nome}
          </text>
        )}
      </g>
    </g>
  );
}

// Silhueta do Vale do Paraíba em bege. Sem pinos por padrão: ao passar o mouse num card,
// surgem os pinos dos lugares que ele atende (todas as cidades, ou só a clínica)
function MapaVale({ ativo }: { ativo: Local["id"] | null }) {
  const todasCidades = ativo === "casa" || ativo === "aquario";
  // as cidades aparecem em onda, da esquerda para a direita
  const ordem = [...CIDADES].sort((a, b) => a.x - b.x).map((c) => c.nome);

  return (
    <svg className="vale" viewBox={`0 0 ${VALE_LARGURA} ${VALE_ALTURA}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <path className="vale__terra" d={VALE_CONTORNO} />
      <path className="vale__divisas" d={VALE_MUNICIPIOS} />
      {CIDADES.map((c) => (
        <Pino key={c.nome} x={c.x} y={c.y} visivel={todasCidades} atraso={ordem.indexOf(c.nome) * 18} />
      ))}
      <Pino grande nome="Cachoeira Paulista" lado="esq" {...PONTOS.cachoeiraPaulista} visivel={ativo === "cachoeira"} />
      <Pino grande nome="Cruzeiro" {...PONTOS.cruzeiro} visivel={ativo === "cruzeiro"} />
    </svg>
  );
}

// Frase abaixo do título que descreve o que o mapa mostra; muda conforme o card com o mouse
function legendaDoMapa(ativo: Local["id"] | null) {
  if (ativo === "cachoeira") return { texto: "Atendimento em clínica parceira em", lugar: "Cachoeira Paulista" };
  if (ativo === "cruzeiro") return { texto: "Atendimento em clínica parceira em", lugar: "Cruzeiro" };
  if (ativo === "casa" || ativo === "aquario") return { texto: "Atendimento domiciliar em todo o", lugar: "Vale do Paraíba" };
  return { texto: "Atendo em todo o", lugar: "Vale do Paraíba e região" };
}

export default function OndeAtendo() {
  const [ativo, setAtivo] = useState<Local["id"] | null>(null);
  const legenda = legendaDoMapa(ativo);

  return (
    <section id="onde-atendo" className="onde" aria-labelledby="onde-titulo">
      <div className="onde__mapa">
        <MapaVale ativo={ativo} />
      </div>

      <div className="onde__inner">
        <motion.div className="onde__cabeca" {...revelar("cima")}>
          <p className="kicker">Onde atendo</p>
          <h2 id="onde-titulo" className="titulo-grande">
            Atendimento completo, <em>com flexibilidade e comodidade.</em>
          </h2>
        </motion.div>

        {/* No computador fica no canto vazio acima do mapa; em telas menores, logo abaixo do título */}
        <p className="onde__legenda">
          <PinoMapa />
          <span key={legenda.texto + legenda.lugar}>
            {legenda.texto} <strong>{legenda.lugar}</strong>
          </span>
        </p>

        <ul className="onde__cards">
          {locais.map((l, i) => (
            <motion.li
              key={l.id}
              className="ponto"
              onMouseEnter={() => setAtivo(l.id)}
              onMouseLeave={() => setAtivo(null)}
              onFocus={() => setAtivo(l.id)}
              onBlur={() => setAtivo(null)}
              {...revelar("cima", i + 1)}
            >
              <div className="ponto__foto">
                <Image src={l.foto} alt={l.alt} fill sizes="(max-width: 720px) 78vw, 300px" style={l.foco ? { objectPosition: l.foco } : undefined} />
              </div>
              <div className="ponto__corpo">
                <p className="ponto__tag">{l.tag}</p>
                <h3 className="ponto__titulo">{l.titulo}</h3>
                {l.texto && <p className="ponto__texto">{l.texto}</p>}
                {l.endereco && (
                  <address className="ponto__texto">
                    <strong>Endereço:</strong> {l.endereco}
                  </address>
                )}
                <a className={l.link.zap ? "ponto__botao ponto__botao--contorno" : "ponto__botao"} href={l.link.href} target="_blank" rel="noopener">
                  {l.link.zap && <WhatsApp size={15} />}
                  {l.link.rotulo}
                </a>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
