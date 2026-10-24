import Image from "next/image";
import { site } from "../config";
import { Pata } from "./icons";
import * as motion from "motion/react-client";
import { revelar } from "../lib/animacoes";

export default function Sobre() {
  return (
    <section id="sobre" className="sobre" aria-labelledby="sobre-titulo">
      <div className="sobre__grade">
        <motion.figure className="sobre__foto" {...revelar("esquerda")}>
          <div className="sobre__retrato">
            <Image
              src="/img/sobre-vinicius.jpg"
              alt="Vinicius sorrindo e fazendo carinho em um cachorro"
              fill
              sizes="(max-width: 900px) 80vw, 36vw"
            />
          </div>
          <Pata className="sobre__pata" />
          <figcaption className="sobre__legenda">Vinicius Vicente Simões · Médico Veterinário</figcaption>
        </motion.figure>

        <div className="sobre__texto">
          <motion.div {...revelar("cima")}>
            <p className="kicker">Sobre mim</p>
            <h2 id="sobre-titulo" className="titulo-grande">
              Um veterinário que vai até o seu pet, <em>sem pressa.</em>
            </h2>
          </motion.div>
          <motion.div className="sobre__prosa" {...revelar("cima", 1)}>
            <p>
              Eu sou o Vinicius, e escolhi a medicina veterinária por amor aos animais. Sou pós-graduado em Clínica
              Médica e Cirúrgica de Pequenos Animais e, há 5 anos, levo esse cuidado a cada atendimento: ouvir com
              calma, explicar cada etapa do tratamento e não ter pressa.
            </p>
            <p>
              Para muitos animais, ir à clínica é motivo de estresse, então pensando no bem-estar deles, atendo
              principalmente em domicílio, por todo o Vale do Paraíba e região. Mas quando o caso pede mais estrutura,
              atendo também em clínicas de Cachoeira Paulista e Cruzeiro.
            </p>
            <p>
              O mesmo cuidado se estende aos aquários: apaixonado por aquarismo, ofereço consultoria presencial ou
              virtual, da montagem à manutenção do dia a dia, para manter a água, os peixes e as plantas em equilíbrio.
            </p>
          </motion.div>
          <motion.div className="sobre__assinatura" {...revelar("cima", 2)}>
            <span>Vinicius Vicente Simões</span>
            <span className="sobre__crmv">{site.crmv}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
