"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "../config";
import { revelar } from "../lib/animacoes";
import { WhatsApp } from "./icons";

const maps = (busca: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(busca)}`;
// Mapa incorporado do Google Maps (não precisa de chave de API)
const mapaEmbed = (busca: string) => `https://www.google.com/maps?q=${encodeURIComponent(busca)}&z=16&output=embed`;
const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1100&q=70`;

type Local = {
  id: "casa" | "cachoeira" | "cruzeiro" | "aquario";
  titulo: string;
  subtitulo: string;
  detalhe: string;
  pilulas: string[];
  foto?: string;
  alt: string;
  // endereço da clínica: no lugar da foto aparece o mapa do Google com a localização
  mapa?: string;
  // ponto de foco do recorte (object-position), para fotos que não são horizontais
  foco?: string;
  link: { rotulo: string; href: string; zap?: boolean };
};

const locais: Local[] = [
  {
    id: "casa",
    titulo: "Residencial",
    subtitulo: "Atendimento em domicílio",
    detalhe:
      "Para muitos animais, ir à clínica é motivo de estresse. Pensando no bem-estar deles, atendo principalmente em domicílio, por todo o Vale do Paraíba e região: exame clínico completo na sua casa, com o animal calmo e sem o estresse do transporte.",
    pilulas: ["Vale do Paraíba e região", "Cães e gatos", "Sem estresse do transporte"],
    foto: unsplash("photo-1668036268050-ca69ef2f0ca0"),
    foco: "72% center",
    alt: "Cachorro sentado tranquilo na sala de casa",
    link: { rotulo: "Ver região no Maps", href: maps("Vale do Paraíba, SP") },
  },
  {
    id: "cachoeira",
    titulo: "Cachoeira Paulista",
    subtitulo: "Clínica parceira",
    detalhe:
      "Quando o caso pede mais estrutura, o atendimento é feito na clínica parceira de Cachoeira Paulista, com o mesmo cuidado de sempre: ouvir com calma e explicar cada etapa do tratamento.",
    pilulas: ["Rua Orris Benedito Barbosa, 318", "Cachoeira Paulista – SP", "Mais estrutura"],
    mapa: "Rua Orris Benedito Barbosa, 318, Cachoeira Paulista - SP",
    alt: "Mapa com a localização da clínica parceira em Cachoeira Paulista",
    link: { rotulo: "Ver no Maps", href: maps("Rua Orris Benedito Barbosa, 318, Cachoeira Paulista - SP") },
  },
  {
    id: "cruzeiro",
    titulo: "Cruzeiro",
    subtitulo: "Clínica parceira",
    detalhe:
      "Quando o caso pede mais estrutura, o atendimento é feito na clínica parceira de Cruzeiro, com o mesmo cuidado de sempre: ouvir com calma e explicar cada etapa do tratamento.",
    pilulas: ["Rua Dom Bôsco, 343 – Centro", "Cruzeiro – SP", "Mais estrutura"],
    mapa: "Rua Dom Bosco, 343, Centro, Cruzeiro - SP",
    alt: "Mapa com a localização da clínica parceira em Cruzeiro",
    link: { rotulo: "Ver no Maps", href: maps("Rua Dom Bosco, 343, Centro, Cruzeiro - SP") },
  },
  {
    id: "aquario",
    titulo: "Aquarismo",
    subtitulo: "Consultoria presencial ou virtual",
    detalhe:
      "A consultoria de aquarismo, exclusiva para aquários de água doce, é feita de forma virtual ou presencial, com orientações personalizadas para o seu tipo de aquário, peixes e rotina.",
    pilulas: ["Montagem e manutenção", "Qualidade da água", "Peixes e plantas", "Problemas comuns"],
    foto: "/img/aquario-fundo.jpg",
    alt: "Aquário plantado de água doce com cardumes de peixes",
    link: { rotulo: "Agendar consultoria", href: site.whatsapp, zap: true },
  },
];

const suave = [0.2, 0.7, 0.2, 1] as const;

// Acordeão: começa com a residencial aberta e todas podem ser fechadas; a foto à esquerda mostra o último local aberto
export default function OndeAtendo() {
  const [aberta, setAberta] = useState<Local["id"] | null>("casa");
  const [ativo, setAtivo] = useState<Local["id"]>("casa");
  // Clicar na aba aberta fecha; clicar em outra abre e troca a foto
  const alternar = (id: Local["id"]) => {
    if (aberta === id) return setAberta(null);
    setAberta(id);
    setAtivo(id);
  };

  return (
    <section id="onde-atendo" className="onde" aria-labelledby="onde-titulo">
      <div className="onde__inner">
        <div className="onde__esquerda">
          <motion.div {...revelar("cima")}>
            <p className="kicker">Onde atendo</p>
            <h2 id="onde-titulo" className="titulo-grande">
              Atendimento completo, <em>com flexibilidade.</em>
            </h2>
          </motion.div>
          {/* As fotos e mapas ficam empilhados e já carregados, para a troca ser imediata; só o da aba aberta aparece */}
          <motion.div className="onde__foto" {...revelar("cima", 1)}>
            {locais.map((l) => (
              <motion.div
                key={l.id}
                className="onde__foto-camada"
                initial={false}
                animate={l.id === ativo ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.6, ease: suave }}
                aria-hidden={l.id !== ativo}
                // camada escondida não pode capturar cliques/arraste destinados ao mapa visível
                style={{ pointerEvents: l.id === ativo ? "auto" : "none" }}
              >
                {l.mapa ? (
                  <iframe
                    src={mapaEmbed(l.mapa)}
                    title={l.alt}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    tabIndex={l.id === ativo ? 0 : -1}
                  />
                ) : (
                  l.foto && <Image src={l.foto} alt={l.alt} fill sizes="(max-width: 900px) 100vw, 640px" loading="eager" style={l.foco ? { objectPosition: l.foco } : undefined} />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="onde__direita">
          <ul className="onde__abas">
            {locais.map((l, i) => {
              const aberto = l.id === aberta;
              return (
                <motion.li key={l.id} className={aberto ? "aba aba--aberta" : "aba"} {...revelar("cima", i + 2)}>
                  <h3>
                    <button
                      type="button"
                      className="aba__cabeca"
                      aria-expanded={aberto}
                      aria-controls={`aba-${l.id}`}
                      onClick={() => alternar(l.id)}
                    >
                      <span className="aba__titulo">{l.titulo}</span>
                      <span className="aba__subtitulo">{l.subtitulo}</span>
                      <span className="aba__icone" aria-hidden="true" />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {aberto && (
                      <motion.div
                        id={`aba-${l.id}`}
                        className="aba__corpo"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: suave }}
                      >
                        <div className="aba__conteudo">
                          <p className="aba__detalhe">{l.detalhe}</p>
                          <ul className="aba__pilulas">
                            {l.pilulas.map((p) => (
                              <li key={p}>{p}</li>
                            ))}
                          </ul>
                          <div className="aba__acoes">
                            <a className="aba__link" href={l.link.href} target="_blank" rel="noopener">
                              {l.link.zap && <WhatsApp size={14} />}
                              {l.link.rotulo}
                              <span aria-hidden="true">→</span>
                            </a>
                            {!l.link.zap && (
                              <a className="aba__link" href={site.whatsapp} target="_blank" rel="noopener">
                                <WhatsApp size={14} />
                                Agendar pelo WhatsApp
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
