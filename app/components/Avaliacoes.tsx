import { connection } from "next/server";
import { calcularMedias, listarAprovadas } from "../lib/avaliacoes";
import { formatarNota, TOPICOS } from "../lib/topicos";
import AvaliarModal from "./AvaliarModal";
import Carrossel from "./Carrossel";
import { STAR } from "./icons";
import * as motion from "motion/react-client";
import { revelar } from "../lib/animacoes";

export default async function Avaliacoes() {
  // Lê a lista a cada requisição (as avaliações mudam no Firestore em tempo de execução)
  await connection();
  const avaliacoes = await listarAprovadas();
  // Média geral das estrelas publicadas; recalculada a cada requisição, acompanha cada avaliação aprovada
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
          <p className="aval__frase">A confiança de quem já foi atendido é o meu maior reconhecimento.</p>
          {medias && (
            <div className="aval__media">
              <strong>{formatarNota(medias.geral)}</strong>
              <div>
                <span
                  className="aval__media-estrelas"
                  role="img"
                  aria-label={`Média de ${formatarNota(medias.geral)} de 5 estrelas`}
                >
                  ★★★★★
                  <span style={{ width: `${(medias.geral / 5) * 100}%` }} aria-hidden="true">
                    ★★★★★
                  </span>
                </span>
                <small>
                  Média de {medias.total} {medias.total === 1 ? "avaliação" : "avaliações"}
                </small>
              </div>
            </div>
          )}
          <AvaliarModal />
        </motion.div>
        <motion.div className="aval__lista" {...revelar("direita", 2)}>
          <Carrossel rotulo="Avaliações de clientes">
            {avaliacoes.map((a) => (
                <figure key={a.id} className="depoimento">
                  <div className="depoimento__foto">
                    <span aria-hidden="true">{a.nome.charAt(0).toUpperCase()}</span>
                  </div>
                  <blockquote>“{a.comentario}”</blockquote>
                  {/* Nota que o cliente deu a cada tópico */}
                  <dl className="depoimento__notas">
                    {TOPICOS.map((t) => (
                      <div key={t.id}>
                        <dt>{t.nome}</dt>
                        <dd className="depoimento__nota" role="img" aria-label={`${a.notas[t.id]} de 5 estrelas`}>
                          {"★".repeat(a.notas[t.id])}
                          <span className="depoimento__nota-vazia">{"★".repeat(5 - a.notas[t.id])}</span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <figcaption>— {a.nome}</figcaption>
                </figure>
            ))}
          </Carrossel>
        </motion.div>
      </div>
    </section>
  );
}
