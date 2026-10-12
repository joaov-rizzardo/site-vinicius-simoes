import * as motion from "motion/react-client";
import { revelar } from "../lib/animacoes";
import AbasAtendimento from "./AbasAtendimento";

export default function OndeAtendo() {
  return (
    <section id="onde-atendo" className="onde">
      <div className="onde__inner">
        <motion.div className="onde__cabecalho" {...revelar("cima")}>
          <p className="rotulo-secao">ONDE ATENDO</p>
          <h2>
            Escolha o atendimento <em>ideal para vocês</em>
          </h2>
        </motion.div>
        <motion.div className="onde__abas" {...revelar("cima", 1)}>
          <AbasAtendimento />
        </motion.div>
      </div>
    </section>
  );
}
