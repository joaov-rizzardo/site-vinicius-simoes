import Image from "next/image";
import { Estrela } from "./icons";

const avaliacoes = [
  {
    foto: "/img/avaliacao-labrador.jpg",
    alt: "Labrador preto",
    texto: "Atendimento atencioso, explica tudo com calma e seu cuidado faz toda a diferença. Meu dog ama!",
    nome: "Mariana S.",
    local: "Cachoeira Paulista/SP",
  },
  {
    foto: "/img/avaliacao-gato.jpg",
    alt: "Gato tigrado",
    texto: "Excelente profissional! Cuidou muito bem da minha gata e me deixou super tranquila durante todo o atendimento.",
    nome: "Rafael T.",
    local: "Cruzeiro/SP",
  },
  {
    foto: "/img/aquario-peixe-palhaco.jpg",
    alt: "Peixe-palhaço",
    texto: "A consultoria de aquarismo foi perfeita! Meu aquário nunca esteve tão equilibrado.",
    nome: "Juliana M.",
    local: "Atendimento virtual",
  },
];

// Estrelas em arco, da esquerda para a direita
const arco = [
  { size: 22, transform: "translateY(-2px) rotate(-16deg)" },
  { size: 24, transform: "translateY(-9px) rotate(-8deg)" },
  { size: 30, transform: "translateY(-11px)" },
  { size: 24, transform: "translateY(-9px) rotate(8deg)" },
  { size: 22, transform: "translateY(-2px) rotate(16deg)" },
];

export default function Avaliacoes() {
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
        </div>
        <div className="aval__lista">
          {avaliacoes.map((a) => (
            <figure key={a.nome} className="depoimento">
              <div className="depoimento__foto">
                <Image src={a.foto} alt={a.alt} fill sizes="76px" />
              </div>
              <blockquote>“{a.texto}”</blockquote>
              <div className="depoimento__nota" role="img" aria-label="5 de 5 estrelas">
                ★★★★★
              </div>
              <figcaption>
                <span>— {a.nome}</span>
                <span>{a.local}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
