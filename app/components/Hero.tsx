import Image from "next/image";
import * as motion from "motion/react-client";
import { site } from "../config";
import { entrada } from "../lib/animacoes";
import { Calendario, CasaLinha, Peixe, Pino, Seta } from "./icons";

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero__inner">
        <div className="hero__texto">
          <div className="hero__conteudo">
            <motion.p className="hero__kicker" {...entrada(0.1)}>
              {/* No desktop o registro fica aqui; no celular ele vai para a assinatura sobre a foto */}
              <span className="hero__kicker-longo">
                {site.cargo} · {site.crmv}
              </span>
              <span className="hero__kicker-curto">CÃES E GATOS · AQUARISMO</span>
            </motion.p>
            <motion.h1 {...entrada(0.22)}>
              Medicina veterinária para cães e gatos, <em>feita com critério.</em>
            </motion.h1>
            <motion.p className="hero__desc" {...entrada(0.38)}>
              <span className="hero__desc-longa">
                Atendimento residencial em todo o Vale do Paraíba e presencial em clínicas de Cachoeira Paulista e
                Cruzeiro. Também ofereço consultoria especializada em aquarismo, de forma virtual.
              </span>
              <span className="hero__desc-curta">
                Atendimento de cães e gatos em domicílio no Vale do Paraíba e em clínicas de Cachoeira Paulista e
                Cruzeiro. Consultoria de aquarismo online.
              </span>
            </motion.p>
            <motion.div id="servicos" className="hero__ctas" {...entrada(0.5)}>
              <a className="cta botao-hero botao-hero--verde" href="#contato">
                <Calendario />
                Agendar consulta
                <Seta />
              </a>
              <a className="cta botao-hero botao-hero--contorno" href="#aquarismo">
                <Peixe width={20} height={20} stroke="currentColor" />
                Consultoria de aquarismo
              </a>
            </motion.div>
          </div>
          <motion.ul className="hero__servicos" {...entrada(0.66)}>
            <li>
              <CasaLinha />
              <span>
                <strong>Em domicílio</strong>
                <small>Vale do Paraíba</small>
              </span>
            </li>
            <li>
              <Pino />
              <span>
                <strong>Em clínica</strong>
                <small>Cachoeira Paulista e Cruzeiro</small>
              </span>
            </li>
            <li>
              <Peixe width={22} height={22} stroke="#d4ad5c" />
              <span>
                <strong>Aquarismo</strong>
                <small>Consultoria online</small>
              </span>
            </li>
          </motion.ul>
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
              sizes="(max-width: 720px) 100vw, 620px"
            />
          </motion.div>
          <motion.p className="hero__assinatura" {...entrada(0.9, 12)}>
            <strong>Vinicius Vicente Simões</strong>
            <span>
              {site.cargo}
              <span className="hero__crmv"> · {site.crmv}</span>
            </span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
