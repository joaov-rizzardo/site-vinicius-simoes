import Image from "next/image";
import * as motion from "motion/react-client";
import { entrada, flutuar } from "../lib/animacoes";
import { Calendario, Casa, Pata, Peixe, Seta } from "./icons";

// Patinhas decorativas espalhadas pelo fundo, flutuando devagar
const patinhas = [
  { top: "9%", left: "44%", size: 46, rot: -18, dur: 9, delay: 0 },
  { top: "62%", left: "38%", size: 30, rot: 22, dur: 11, delay: 3 },
  { top: "80%", left: "54%", size: 38, rot: -8, dur: 10, delay: 6 },
  { top: "34%", left: "93%", size: 34, rot: 14, dur: 12, delay: 2 },
  { top: "4%", left: "4%", size: 26, rot: 30, dur: 10, delay: 5 },
];

const linhasFrase = ["Cuidado", "  também é", "    prevenção."];

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <motion.div
        className="hero__brilho"
        aria-hidden="true"
        animate={{ x: [0, 90], y: [0, 60] }}
        transition={{ duration: 16, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <div className="hero__patinhas" aria-hidden="true">
        {patinhas.map((p, i) => (
          <motion.span key={i} style={{ top: p.top, left: p.left, rotate: p.rot }} {...flutuar(16, p.dur, p.delay)}>
            <Pata width={p.size} height={p.size} />
          </motion.span>
        ))}
      </div>
      <div className="hero__inner">
        <div className="hero__texto">
          <motion.p className="hero__kicker" {...entrada(0.1)}>
            CUIDADO, SAÚDE E BEM-ESTAR
            <br />
            PARA SEU PET
          </motion.p>
          <motion.h1 {...entrada(0.22)}>
            Seu melhor amigo
            <br />
            <span>em boas mãos.</span>
          </motion.h1>
          {/* Versão completa no desktop; no celular, uma versão curta para a foto aparecer na primeira tela */}
          <motion.p className="hero__desc" {...entrada(0.38)}>
            <span className="hero__desc-longa">
              Sou médico veterinário, especializado no atendimento de cães e gatos, com atendimento residencial em todo
              o Vale do Paraíba e também presencial em clínicas de Cachoeira Paulista e Cruzeiro. Além disso, ofereço
              consultoria especializada em aquarismo, de forma virtual.
            </span>
            <span className="hero__desc-curta">
              Atendimento de cães e gatos em domicílio no Vale do Paraíba e em clínicas de Cachoeira Paulista e
              Cruzeiro. Consultoria de aquarismo online.
            </span>
          </motion.p>
          <motion.p className="hero__tags" {...entrada(0.5)}>
            CÃES &nbsp;•&nbsp; GATOS &nbsp;•&nbsp; AQUARISMO
          </motion.p>
          {/* No celular, os cards de cima da foto viram estes chips */}
          <motion.ul className="hero__chips" {...entrada(0.5)}>
            <li>
              <Casa />
              Em domicílio
            </li>
            <li>
              <Peixe width={16} height={16} stroke="#6cc48a" />
              Aquarismo online
            </li>
          </motion.ul>
          <motion.div id="servicos" className="hero__ctas" {...entrada(0.62)}>
            <a className="cta botao-pilula botao-pilula--verde" href="#contato">
              <Calendario />
              <span className="botao-pilula__textos">
                <span className="botao-pilula__titulo">MARCAR CONSULTA</span>
                <span className="botao-pilula__sub">CÃES E GATOS</span>
              </span>
              <Seta />
            </a>
            <a className="cta botao-pilula botao-pilula--escuro" href="#aquarismo">
              <Peixe />
              <span className="botao-pilula__textos">
                <span className="botao-pilula__titulo">MARCAR CONSULTORIA</span>
                <span className="botao-pilula__sub">DE AQUARISMO</span>
              </span>
              <Seta />
            </a>
          </motion.div>
        </div>
        <div className="hero__foto">
          <motion.div
            className="hero__halo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
          >
            <motion.div
              className="hero__halo-luz"
              animate={{ opacity: [1, 0.75], scale: [1, 1.05] }}
              transition={{ duration: 3.5, delay: 1.3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            />
          </motion.div>
          <motion.div className="hero__imagem" {...entrada(0.25, 40)}>
            <Image
              src="/img/hero-vinicius.png"
              alt="Médico veterinário sorrindo, de braços cruzados, com estetoscópio no pescoço"
              fill
              priority
              sizes="(max-width: 720px) 90vw, 45vw"
            />
          </motion.div>
          <motion.div className="hero__flutua hero__flutua--casa" {...flutuar(10, 3, 1.8)}>
            <motion.div
              className="hero__card"
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", bounce: 0.35, duration: 0.8, delay: 1.1 }}
            >
              <span className="hero__card-icone">
                <Casa />
              </span>
              <span>
                <strong>Atendimento em domicílio</strong>
                <small>Todo o Vale do Paraíba</small>
              </span>
            </motion.div>
          </motion.div>
          <motion.div className="hero__flutua hero__flutua--peixe" {...flutuar(10, 3, 0.6)}>
            <motion.div
              className="hero__card"
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", bounce: 0.35, duration: 0.8, delay: 1.35 }}
            >
              <span className="hero__card-icone">
                <Peixe width={22} height={22} stroke="#6cc48a" />
              </span>
              <span>
                <strong>Consultoria online</strong>
                <small>Aquarismo</small>
              </span>
            </motion.div>
          </motion.div>
          <div className="hero__frase">
            <p>
              {linhasFrase.map((l, i) => (
                <motion.span
                  key={l}
                  initial={{ clipPath: "inset(-30% 100% -30% -10%)" }}
                  animate={{ clipPath: "inset(-30% -10% -30% -10%)" }}
                  transition={{ duration: 0.6, delay: 1 + i * 0.5, ease: "easeOut" }}
                >
                  {l}
                </motion.span>
              ))}
            </p>
            <motion.div
              style={{ originX: 0 }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 2.6, ease: [0.6, 0, 0.2, 1] }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
