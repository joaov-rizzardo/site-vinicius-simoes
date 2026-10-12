"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { site } from "../config";
import { PinoDourado, Seta } from "./icons";

const abas = [
  { id: "casa", rotulo: "Em domicílio", curto: "Em casa" },
  { id: "clinica", rotulo: "Clínicas parceiras", curto: "Clínicas" },
  { id: "online", rotulo: "Online · Aquarismo", curto: "Online" },
] as const;

type Aba = (typeof abas)[number]["id"];

const cidades = ["São José dos Campos", "Taubaté", "Guaratinguetá", "Lorena", "Cachoeira Paulista", "Cruzeiro"];

const topicosAquarismo = [
  "Orientação sobre montagem e manutenção",
  "Qualidade da água e parâmetros ideais",
  "Escolha de peixes e plantas",
  "Soluções para problemas comuns",
];

// Abas no padrão WAI-ARIA: setas ←/→, Home e End movem o foco entre as abas.
// Todos os painéis ficam no HTML (só os inativos com `hidden`), para buscadores lerem o conteúdo.
export default function AbasAtendimento() {
  const [ativa, setAtiva] = useState<Aba>("casa");
  const botoes = useRef<(HTMLButtonElement | null)[]>([]);

  function teclado(e: React.KeyboardEvent, i: number) {
    const destino =
      e.key === "ArrowRight" ? (i + 1) % abas.length
      : e.key === "ArrowLeft" ? (i - 1 + abas.length) % abas.length
      : e.key === "Home" ? 0
      : e.key === "End" ? abas.length - 1
      : null;
    if (destino === null) return;
    e.preventDefault();
    setAtiva(abas[destino].id);
    botoes.current[destino]?.focus();
  }

  return (
    <>
      <div className="abas" role="tablist" aria-label="Formas de atendimento">
        {abas.map((a, i) => (
          <button
            key={a.id}
            ref={(el) => {
              botoes.current[i] = el;
            }}
            id={`aba-${a.id}`}
            className="abas__botao"
            role="tab"
            type="button"
            aria-selected={ativa === a.id}
            aria-controls={`painel-${a.id}`}
            tabIndex={ativa === a.id ? 0 : -1}
            onClick={() => setAtiva(a.id)}
            onKeyDown={(e) => teclado(e, i)}
          >
            <span className="abas__longo">{a.rotulo}</span>
            <span className="abas__curto">{a.curto}</span>
          </button>
        ))}
      </div>

      <div className="painel" id="painel-casa" role="tabpanel" aria-labelledby="aba-casa" hidden={ativa !== "casa"}>
        <div className="painel__texto">
          <p className="rotulo-secao">ATENDIMENTO EM DOMICÍLIO</p>
          <h3>Todo o Vale do Paraíba</h3>
          <p>Levo o cuidado até você. O pet é atendido no ambiente que conhece, sem o estresse do transporte.</p>
          <ul className="painel__cidades">
            {cidades.map((c) => (
              <li key={c}>{c}</li>
            ))}
            <li className="painel__cidades-mais">e região</li>
          </ul>
          <a className="cta painel__botao" href={site.whatsapp} target="_blank" rel="noopener">
            AGENDAR VISITA
            <Seta />
          </a>
        </div>
        <div className="painel__foto">
          <Image
            src="/img/onde-atendo.jpg"
            alt="Vinicius sorrindo, segurando dois filhotes de cachorro"
            fill
            sizes="(max-width: 820px) 100vw, 420px"
          />
        </div>
      </div>

      <div
        className="painel painel--clinica"
        id="painel-clinica"
        role="tabpanel"
        aria-labelledby="aba-clinica"
        hidden={ativa !== "clinica"}
      >
        <div className="painel__texto">
          <p className="rotulo-secao">CLÍNICAS PARCEIRAS</p>
          <h3>Cachoeira Paulista e Cruzeiro</h3>
          <p>Atendimento presencial em clínicas parceiras, com a estrutura completa para consultas e exames.</p>
          <a className="cta painel__botao" href={site.whatsapp} target="_blank" rel="noopener">
            MARCAR CONSULTA
            <Seta />
          </a>
        </div>
        <div className="painel__clinicas">
          {site.clinicas.map((c) => (
            <div key={c.cidade} className="clinica">
              <span className="clinica__icone">
                <PinoDourado />
              </span>
              <div className="clinica__textos">
                <strong>{c.cidade}</strong>
                <span>{c.nome}</span>
                <span>{c.endereco}</span>
                {c.mapa && (
                  <a href={c.mapa} target="_blank" rel="noopener">
                    Ver no mapa →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="painel painel--online"
        id="painel-online"
        role="tabpanel"
        aria-labelledby="aba-online"
        hidden={ativa !== "online"}
      >
        <div className="painel__texto">
          <p className="rotulo-secao rotulo-secao--claro">ONLINE · DE QUALQUER LUGAR</p>
          <h3>Consultoria virtual de aquarismo</h3>
          <p>Orientação e suporte especializado para o seu aquário, sem sair de casa.</p>
          <a className="cta painel__botao painel__botao--dourado" href={site.whatsapp} target="_blank" rel="noopener">
            MARCAR CONSULTORIA
            <Seta cor="#0c1712" />
          </a>
        </div>
        <ul className="painel__topicos">
          {topicosAquarismo.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
