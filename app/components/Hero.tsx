import Image from "next/image";
import * as motion from "motion/react-client";
import { site } from "../config";
import { entrada } from "../lib/animacoes";
import { Calendario, Peixe, Seta } from "./icons";

// Frase manuscrita sobre o retrato, revelada linha a linha
const linhasFrase = ["Cuidado", "  também é", "    prevenção."];

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero__inner">
        <div className="hero__texto">
          <div className="hero__conteudo">
            <motion.p className="hero__kicker" {...entrada(0.1)}>
              <span>
                CUIDADO, SAÚDE E BEM-ESTAR <br className="hero__quebra" />
                PARA SEU PET
              </span>
            </motion.p>
            <motion.h1 {...entrada(0.22)}>
              Seu melhor amigo
              <br />
              <em>em boas mãos.</em>
            </motion.h1>
            <motion.p className="hero__desc" {...entrada(0.38)}>
              <span className="hero__desc-longa">
                Sou médico veterinário com anos de experiência, especializado no atendimento de cães e gatos. Atendo
                principalmente em domicílio, em todo o Vale do Paraíba, para que seu pet seja cuidado com tranquilidade no próprio
                ambiente. Também atendo em clínicas de Cachoeira Paulista e Cruzeiro e ofereço consultoria
                especializada em aquarismo, presencial ou virtual.
              </span>
              <span className="hero__desc-curta">
                Atendimento de cães e gatos em domicílio no Vale do Paraíba, com a tranquilidade do próprio lar, e
                em clínicas de Cachoeira Paulista e Cruzeiro. Consultoria de aquarismo presencial ou online.
              </span>
            </motion.p>
            <motion.p className="hero__tags" {...entrada(0.44)}>
              CÃES &nbsp;•&nbsp; GATOS &nbsp;•&nbsp; AQUARISMO
            </motion.p>
            <motion.div className="hero__ctas" {...entrada(0.5)}>
              <a className="cta botao-hero botao-hero--verde" href="#contato">
                <Calendario />
                <span className="botao-hero__textos">
                  Marcar consulta
                  <small>Cães e gatos</small>
                </span>
                <Seta />
              </a>
              <a className="cta botao-hero botao-hero--contorno" href="#aquarismo">
                <Peixe width={20} height={20} stroke="currentColor" />
                <span className="botao-hero__textos">
                  Marcar consultoria
                  <small>De aquarismo</small>
                </span>
                <Seta />
              </a>
            </motion.div>
          </div>
        </div>

        <div className="hero__retrato">
          {/* Luz de estúdio atrás do retrato: separa a camisa escura do fundo */}
          <motion.div
            className="hero__luz"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.1, ease: "easeOut" }}
          />
          <motion.div
            className="hero__fio"
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.6, 0, 0.2, 1] }}
          />
          <motion.div className="hero__foto" {...entrada(0.25, 40)}>
            <Image
              src="/img/hero-vinicius.png"
              alt="Vinicius Vicente Simões, médico veterinário, de braços cruzados com estetoscópio"
              fill
              priority
              sizes="(max-width: 720px) 100vw, 540px"
            />
          </motion.div>
          <div className="hero__frase" aria-hidden="true">
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
          <motion.p className="hero__assinatura" {...entrada(0.9, 12)}>
            <strong>Vinicius Vicente Simões</strong>
            <span>
              {site.cargo} · {site.crmv}
            </span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
