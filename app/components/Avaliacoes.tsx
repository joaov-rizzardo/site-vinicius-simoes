import Image from "next/image";
import { connection } from "next/server";
import { listarAvaliacoes } from "../lib/avaliacoes";
import AvaliarModal from "./AvaliarModal";
import Carrossel from "./Carrossel";
import { Estrela } from "./icons";

// Estrelas em arco, da esquerda para a direita
const arco = [
  { size: 22, transform: "translateY(-2px) rotate(-16deg)" },
  { size: 24, transform: "translateY(-9px) rotate(-8deg)" },
  { size: 30, transform: "translateY(-11px)" },
  { size: 24, transform: "translateY(-9px) rotate(8deg)" },
  { size: 22, transform: "translateY(-2px) rotate(16deg)" },
];

export default async function Avaliacoes() {
  // Lê a lista a cada requisição (dados em memória mudam em tempo de execução)
  await connection();
  const avaliacoes = listarAvaliacoes();

  return (
    <section id="avaliacoes" className="aval">
      <div className="aval__inner">
        <div className="aval__intro">
          <div className="aval__selo">
            <span role="img" aria-label="5 estrelas" className="aval__estrelas">
              {arco.map((e, i) => (
                <Estrela key={i} size={e.size} style={{ transform: e.transform }} />
              ))}
            </span>
            <h2>AVALIAÇÕES</h2>
          </div>
          <p className="aval__frase">A confiança de quem já foi atendido é o nosso maior reconhecimento.</p>
          <AvaliarModal />
        </div>
        <div className="aval__lista">
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
        </div>
      </div>
    </section>
  );
}
