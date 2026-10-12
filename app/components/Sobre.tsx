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
              Sou médico veterinário dedicado a cães e gatos, com um atendimento próximo, atencioso e sem pressa — em
              domicílio por todo o Vale do Paraíba e em clínicas parceiras. Apaixonado por aquarismo, também ofereço
              consultoria virtual para quem quer um aquário saudável e equilibrado.
            </p>
            <div className="sobre__assinatura">
              <span>Vinicius V. Simões</span>
              <span className="selo">{site.crmv}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
