import Image from "next/image";
import { connection } from "next/server";
import { calcularMedias, listarAvaliacoes } from "../lib/avaliacoes";
import { mediaDasNotas } from "../lib/topicos";
import AvaliarModal from "./AvaliarModal";
import Carrossel from "./Carrossel";
import MediasTopicos from "./MediasTopicos";
import { STAR } from "./icons";
import * as motion from "motion/react-client";
import { revelar } from "../lib/animacoes";

export default async function Avaliacoes() {
  // Lê a lista a cada requisição (dados em memória mudam em tempo de execução)
  await connection();
  const avaliacoes = listarAvaliacoes("aprovada");
  const medias = calcularMedias(avaliacoes);

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
            {avaliacoes.map((a) => {
              // O card mostra a média dos tópicos arredondada para estrelas inteiras
              const estrelas = Math.round(mediaDasNotas(a.notas));
              return (
                <figure key={a.id} className="depoimento">
                  <div className="depoimento__foto">
                    {a.foto ? (
                      <Image src={a.foto.src} alt={a.foto.alt} fill sizes="76px" />
                    ) : (
                      <span aria-hidden="true">{a.nome.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <blockquote>“{a.comentario}”</blockquote>
                  <div className="depoimento__nota" role="img" aria-label={`${estrelas} de 5 estrelas`}>
                    {"★".repeat(estrelas)}
                    <span className="depoimento__nota-vazia">{"★".repeat(5 - estrelas)}</span>
                  </div>
                  <figcaption>— {a.nome}</figcaption>
                </figure>
              );
            })}
          </Carrossel>
        </motion.div>
        {medias && (
          <motion.div className="aval__medias" {...revelar("cima", 1)}>
            <MediasTopicos medias={medias} />
          </motion.div>
        )}
      </div>
    </section>
  );
}
