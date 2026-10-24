import Image from "next/image";
import * as motion from "motion/react-client";
import { revelar } from "../lib/animacoes";

// Fotos de exemplo: trocar pelas fotos reais dos pacientes (com autorização dos tutores).
// Fotos locais ficam em /public/img; as de banco de imagens vêm do Unsplash (uso livre).
const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&h=800&q=70`;

const fotos = [
  { src: unsplash("photo-1558788353-f76d92427f16"), nome: "Mel", nota: "Consulta em casa", alt: "Golden retriever sorrindo" },
  { src: unsplash("photo-1536589961747-e239b2abbec2"), nome: "Mia", nota: "Check-up anual", alt: "Gato branco e laranja olhando para a câmera" },
  { src: "/img/onde-atendo.jpg", nome: "Pipoca & Paçoca", nota: "Primeira consulta", alt: "Vinicius segurando dois filhotes de cachorro" },
  { src: unsplash("photo-1610968755695-d7fcb5fd4b92"), nome: "Max", nota: "Acompanhamento", alt: "Pastor alemão olhando para a câmera" },
  { src: "/img/aquario-fundo.jpg", nome: "Cardume", nota: "Aquário plantado", alt: "Aquário plantado de água doce" },
];

export default function Galeria() {
  return (
    <section id="galeria" className="galeria" aria-labelledby="galeria-titulo">
      <div className="galeria__inner">
        <div className="galeria__cabeca">
          <motion.div {...revelar("cima")}>
            <p className="kicker">Pacientes</p>
            <h2 id="galeria-titulo" className="titulo-grande">
              Quem já passou <em>por aqui.</em>
            </h2>
          </motion.div>
          <motion.p className="galeria__lead" {...revelar("cima", 1)}>
            Cada um com seu jeito, todos cuidados com a mesma calma. Alguns dos pacientes (e aquários) que já
            atendi.
          </motion.p>
        </div>

        {/* Retratos em alturas alternadas, como numa parede de exposição */}
        <ul className="galeria__parede">
          {fotos.map((f, i) => (
            <motion.li key={f.nome} className="retrato" {...revelar("cima", i + 1)}>
              <figure>
                <div className="retrato__foto">
                  <Image src={f.src} alt={f.alt} fill sizes="(max-width: 720px) 60vw, 260px" />
                </div>
                <figcaption>
                  <span className="retrato__num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="retrato__nome">{f.nome}</span>
                  <span className="retrato__nota">{f.nota}</span>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
