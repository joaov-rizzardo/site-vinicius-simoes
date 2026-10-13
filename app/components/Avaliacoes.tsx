import Image from "next/image";
import { connection } from "next/server";
import { listarAvaliacoes } from "../lib/avaliacoes";
import AvaliarModal from "./AvaliarModal";
import Carrossel from "./Carrossel";
import { STAR } from "./icons";
import * as motion from "motion/react-client";
import { revelar } from "../lib/animacoes";

export default async function Avaliacoes() {
  // Lê a lista a cada requisição (dados em memória mudam em tempo de execução)
  await connection();
  const avaliacoes = listarAvaliacoes("aprovada");

  return (
    <section id="avaliacoes" className="aval">
      <div className="aval__inner">
        <motion.div className="aval__intro" {...revelar("esquerda")}>
          <span className="aval__aspas" aria-hidden="true">
            “
          </span>
          <div className="aval__rotulo">
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path d={STAR} fill="#c9a04e" />
            </svg>
            <span>AVALIAÇÕES</span>
          </div>
          <h2 className="aval__titulo">
            Quem confia,
            <br />
            <span>recomenda.</span>
          </h2>
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
