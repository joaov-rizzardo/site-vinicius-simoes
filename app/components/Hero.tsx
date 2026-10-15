import Image from "next/image";
import * as motion from "motion/react-client";
import { site } from "../config";
import { entrada } from "../lib/animacoes";
import { Calendario, Peixe, Seta } from "./icons";

// Frase manuscrita sobre o retrato, revelada linha a linha
const linhasFrase = ["Cuidado", "  também é", "    prevenção."];

// Abre o WhatsApp já com a mensagem escrita
const linkWhatsApp = (mensagem: string) => `${site.whatsapp}?text=${encodeURIComponent(mensagem)}`;

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero__inner">
        <div className="hero__texto">
          <div className="hero__conteudo">
            <p className="hero__kicker entrada" style={entrada(0.1)}>
              <span>
                CUIDADO, SAÚDE E BEM-ESTAR <br className="hero__quebra" />
                PARA SEU PET
              </span>
            </p>
            <h1 className="entrada" style={entrada(0.22)}>
              Seu melhor amigo
              <br />
              <em>em boas mãos.</em>
            </h1>
            <p className="hero__desc entrada" style={entrada(0.38)}>
              <span className="hero__desc-longa">
                Sou médico veterinário com anos de experiência, especializado no atendimento de cães e gatos. Atendo
                principalmente em domicílio, em todo o Vale do Paraíba e região, para que seu pet seja cuidado com tranquilidade no próprio
                ambiente. Também atendo em clínicas de Cachoeira Paulista e Cruzeiro e ofereço consultoria
                especializada em aquarismo, presencial ou virtual.
              </span>
              <span className="hero__desc-curta">
                Atendimento de cães e gatos em domicílio no Vale do Paraíba e região, com a tranquilidade do próprio lar, e
                em clínicas de Cachoeira Paulista e Cruzeiro. Consultoria de aquarismo presencial ou online.
              </span>
            </p>
            <p className="hero__tags entrada" style={entrada(0.44)}>
              CÃES &nbsp;•&nbsp; GATOS &nbsp;•&nbsp; AQUARISMO
            </p>
            <div className="hero__ctas entrada" style={entrada(0.5)}>
              <a
                className="cta botao-hero botao-hero--verde"
                href={linkWhatsApp("Olá! Gostaria de marcar uma consulta para o meu pet.")}
                target="_blank"
                rel="noopener"
              >
                <Calendario />
                <span className="botao-hero__textos">
                  Marcar consulta
                  <small>Cães e gatos</small>
                </span>
                <Seta />
              </a>
              <a
                className="cta botao-hero botao-hero--contorno"
                href={linkWhatsApp("Olá! Gostaria de marcar uma consultoria de aquarismo.")}
                target="_blank"
                rel="noopener"
              >
                <Peixe width={20} height={20} stroke="currentColor" />
                <span className="botao-hero__textos">
                  Marcar consultoria
                  <small>De aquarismo</small>
                </span>
                <Seta />
              </a>
            </div>
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
          <div className="hero__foto entrada" style={entrada(0.25, 40)}>
            <Image
              src="/img/hero-vinicius.png"
              alt="Vinicius Vicente Simões, médico veterinário, de braços cruzados com estetoscópio"
              fill
              preload
              fetchPriority="high"
              sizes="(max-width: 720px) 340px, 540px"
            />
          </div>
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
          <p className="hero__assinatura entrada" style={entrada(0.9, 12)}>
            <strong>Vinicius Vicente Simões</strong>
            <span>{site.cargo} · CLÍNICO GERAL</span>
            <span className="hero__crmv">{site.crmv}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
