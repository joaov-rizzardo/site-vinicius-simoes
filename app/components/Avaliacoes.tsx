import Image from "next/image";
import { connection } from "next/server";
import { listarAvaliacoes } from "../lib/avaliacoes";
import AvaliarModal from "./AvaliarModal";
import Carrossel from "./Carrossel";
import { STAR } from "./icons";
import * as motion from "motion/react-client";
import { revelar } from "../lib/animacoes";

// Estrelas em arco, da esquerda para a direita
const arco = [
  { size: 22, y: -2, rotate: -16 },
  { size: 24, y: -9, rotate: -8 },
  { size: 30, y: -11, rotate: 0 },
  { size: 24, y: -9, rotate: 8 },
  { size: 22, y: -2, rotate: 16 },
];

export default async function Avaliacoes() {
  // Lê a lista a cada requisição (dados em memória mudam em tempo de execução)
  await connection();
  const avaliacoes = listarAvaliacoes();

  return (
    <section id="avaliacoes" className="aval">
      <div className="aval__inner">
        <motion.div className="aval__intro" {...revelar("esquerda")}>
          <div className="aval__selo">
            <span role="img" aria-label="5 estrelas" className="aval__estrelas">
              {arco.map((e, i) => (
                // Acendem uma a uma quando a seção entra na tela
                <motion.svg
                  key={i}
                  width={e.size}
                  height={e.size}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  style={{ y: e.y, rotate: e.rotate }}
                  initial={{ opacity: 0, scale: 0.3 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", bounce: 0.5, duration: 0.6, delay: 0.35 + i * 0.1 }}
                >
                  <path d={STAR} fill="#c9a04e" />
                </motion.svg>
              ))}
            </span>
            <h2>AVALIAÇÕES</h2>
          </div>
          <p className="aval__frase">A confiança de quem já foi atendido é o nosso maior reconhecimento.</p>
          <AvaliarModal />
        </motion.div>
        <motion.div className="aval__lista" {...revelar("direita", 2)}>
          <Carrossel rotulo="Avaliações de clientes">
            {avaliacoes.map((a) => (
              <figure key={a.id} className="depoimento">
                <div className="depoimento__foto">
                  {a.foto ? (
                    <Image src={a.foto.src} alt={a.foto.alt} fill sizes="76px" />
                  ) : (
                    <span aria-hidden="true">{a.nome.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <blockquote>“{a.comentario}”</blockquote>
                <div className="depoimento__nota" role="img" aria-label={`${a.nota} de 5 estrelas`}>
                  {"★".repeat(a.nota)}
                  <span className="depoimento__nota-vazia">{"★".repeat(5 - a.nota)}</span>
                </div>
                <figcaption>— {a.nome}</figcaption>
              </figure>
            ))}
          </Carrossel>
        </motion.div>
      </div>
    </section>
  );
}
