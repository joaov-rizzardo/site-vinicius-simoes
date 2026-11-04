import Image from "next/image";
import Bolhas from "./Bolhas";
import { Engrenagem, Folha, Gota, PeixeVerde, Seta } from "./icons";
import * as motion from "motion/react-client";
import { revelar } from "../lib/animacoes";
import { site } from "../config";

const topicos = [
  { icone: <Folha />, texto: "Orientação sobre montagem e manutenção" },
  { icone: <Gota />, texto: "Qualidade da água e parâmetros ideais" },
  { icone: <PeixeVerde />, texto: "Escolha de peixes e plantas" },
  { icone: <Engrenagem />, texto: "Soluções para problemas comuns" },
];

export default function Aquarismo() {
  return (
    <section id="aquarismo" className="aqua">
      <div className="aqua__fundo" aria-hidden="true">
        {/* Zoom lento e contínuo na foto, como um travelling de câmera */}
        <motion.div
          className="aqua__foto"
          animate={{ scale: 1.08, x: "-1.5%" }}
          transition={{ duration: 26, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <Image src="/img/aquario-fundo.jpg" alt="" fill sizes="(max-width: 720px) 100vw, 70vw" />
        </motion.div>
      </div>
      <Bolhas />
      <div className="aqua__inner">
        <div className="aqua__texto">
          <motion.h2 className="kicker" {...revelar("cima")}>
            Aquarismo
          </motion.h2>
          <motion.p className="aqua__frase" {...revelar("cima", 1)}>
            Mais do que um hobby,
            <br />
            <span>um ecossistema em equilíbrio.</span>
          </motion.p>
          <motion.p className="aqua__desc" {...revelar("cima", 2)}>
            <strong>A consultoria de aquarismo</strong>, exclusiva para aquários de água doce, é feita de forma virtual ou
            presencial, com orientações personalizadas para o seu tipo de aquário, peixes e rotina. Assim, você garante um ambiente saudável, com menos problemas e mais
            vida no seu aquário.
          </motion.p>
          <div className="aqua__grade">
            {topicos.map((t, i) => (
              <motion.div key={t.texto} className="aqua__item" {...revelar("cima", i + 3)}>
                {t.icone}
                <p>{t.texto}</p>
              </motion.div>
            ))}
          </div>
          {/* Botão de vidro em tom de água, já com a mensagem da consultoria escrita no WhatsApp */}
          <motion.div className="aqua__cta" {...revelar("cima", topicos.length + 3)}>
            <a
              className="cta aqua__botao"
              href={`${site.whatsapp}?text=${encodeURIComponent("Olá! Gostaria de marcar uma consultoria de aquarismo.")}`}
              target="_blank"
              rel="noopener"
            >
              <span className="aqua__botao-textos">
                Marcar consultoria
                <small>Presencial ou virtual</small>
              </span>
              <Seta />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
