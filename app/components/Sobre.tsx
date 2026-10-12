import Image from "next/image";
import { site } from "../config";
import { Escudo, Pata, PeixeVerde } from "./icons";
import * as motion from "motion/react-client";
import { revelar } from "../lib/animacoes";

// "Sobre mim" em blocos: foto alta à esquerda, frase em destaque e dois cards menores
export default function Sobre() {
  return (
    <section id="sobre" className="sobre">
      <div className="sobre__bento">
        <motion.div className="sobre__foto" {...revelar("esquerda")}>
          <Image
            src="/img/sobre-vinicius.jpg"
            alt="Vinicius sorrindo e fazendo carinho em um cachorro"
            fill
            sizes="(max-width: 820px) 100vw, 400px"
          />
          <div className="sobre__assinatura">
            <span>Vinicius V. Simões</span>
            <span className="selo selo--dourado">{site.crmv}</span>
          </div>
        </motion.div>

        <motion.div className="sobre__frase" {...revelar("cima", 1)}>
          <Pata className="sobre__pata" width={220} height={220} />
          <p className="rotulo-secao rotulo-secao--claro">SOBRE MIM</p>
          <h2>
            “Atendimento próximo, atencioso e <em>sem pressa</em> — do jeito que eu gostaria que cuidassem do meu.”
          </h2>
          <p className="sobre__desc">
            Sou médico veterinário dedicado a cães e gatos, com atendimento em domicílio por todo o Vale do Paraíba e
            em clínicas parceiras.
          </p>
        </motion.div>

        <motion.div className="sobre__bloco" {...revelar("cima", 2)}>
          <span className="sobre__icone">
            <Escudo />
          </span>
          <h3>Cuidado também é prevenção</h3>
          <p>Consultas com tempo para ouvir, examinar com calma e orientar cada fase da vida do seu cão ou gato.</p>
        </motion.div>

        <motion.div className="sobre__bloco sobre__bloco--escuro" {...revelar("cima", 3)}>
          <span className="sobre__icone">
            <PeixeVerde />
          </span>
          <h3>Aquarista por paixão</h3>
          <p>Essa paixão virou consultoria virtual para quem quer um aquário saudável e equilibrado.</p>
        </motion.div>
      </div>
    </section>
  );
}
