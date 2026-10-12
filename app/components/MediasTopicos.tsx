import * as motion from "motion/react-client";
import type { Medias } from "../lib/avaliacoes";
import { formatarNota, TOPICOS } from "../lib/topicos";

// Painel com a nota geral e a média de cada tópico (só avaliações aprovadas)
export default function MediasTopicos({ medias }: { medias: Medias }) {
  return (
    <div className="medias">
      <div className="medias__geral">
        <span className="medias__rotulo">Nota geral</span>
        <strong className="medias__numero">{formatarNota(medias.geral)}</strong>
        <EstrelasParciais nota={medias.geral} />
        <span className="medias__base">
          Média de {medias.total} {medias.total === 1 ? "avaliação" : "avaliações"}
        </span>
      </div>

      <ul className="medias__topicos" aria-label="Média por tópico">
        {TOPICOS.map((t, i) => {
          const valor = medias.porTopico[t.id];
          return (
            <li key={t.id} className="medias__topico">
              <div className="medias__linha">
                <span>{t.nome}</span>
                <strong aria-label={`${formatarNota(valor)} de 5`}>{formatarNota(valor)}</strong>
              </div>
              <span className="medias__trilho" aria-hidden="true">
                <motion.span
                  className="medias__barra"
                  style={{ width: `${(valor / 5) * 100}%` }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.07, ease: [0.2, 0.7, 0.2, 1] }}
                />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// Cinco estrelas com preenchimento proporcional (4,7 → 94% douradas)
function EstrelasParciais({ nota }: { nota: number }) {
  return (
    <span className="medias__estrelas" role="img" aria-label={`${formatarNota(nota)} de 5 estrelas`}>
      <span aria-hidden="true">★★★★★</span>
      <span className="medias__estrelas-cheias" aria-hidden="true" style={{ width: `${(nota / 5) * 100}%` }}>
        ★★★★★
      </span>
    </span>
  );
}
