import Image from "next/image";
import { site } from "../config";
import { Pata, Pessoa } from "./icons";
import * as motion from "motion/react-client";
import { revelar } from "../lib/animacoes";

export default function Sobre() {
  return (
    <section id="sobre" className="sobre">
      <div className="sobre__wrap">
        <motion.div className="sobre__card" {...revelar("zoom")}>
          <motion.div className="sobre__foto" {...revelar("esquerda", 2)}>
            <div className="sobre__moldura" />
            <div className="sobre__retrato">
              <Image
                src="/img/sobre-vinicius.jpg"
                alt="Vinicius sorrindo e fazendo carinho em um cachorro"
                width={720}
                height={960}
                sizes="230px"
              />
            </div>
            <Pata className="sobre__pata" />
          </motion.div>
          <motion.div className="sobre__texto" {...revelar("direita", 3)}>
            <div className="sobre__titulo">
              <Pessoa />
              <h2 className="titulo-secao">SOBRE MIM</h2>
            </div>
            <p>
              Eu sou o Vinicius, e escolhi a medicina veterinária por amor aos animais. Sou pós-graduado em Clínica
              Médica e Cirúrgica de Pequenos Animais e, há 5 anos, levo esse cuidado a
              cada atendimento: ouvir com calma, explicar cada etapa do tratamento e não ter pressa. Para muitos
              animais, ir à clínica é motivo de estresse, então pensando no bem-estar deles, atendo principalmente em
              domicílio, por todo o Vale do Paraíba e região. Mas quando o caso pede mais estrutura, atendo também em clínicas de
              Cachoeira Paulista e Cruzeiro.
            </p>
            <p>
              O mesmo cuidado se estende aos aquários: apaixonado por aquarismo, ofereço consultoria presencial ou
              virtual, da montagem à manutenção do dia a dia, para manter a água, os peixes e as plantas em equilíbrio.
            </p>
            <div className="sobre__assinatura">
              <span>Vinicius Vicente Simões</span>
              <span className="selo">{site.crmv}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
