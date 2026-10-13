import Image from "next/image";
import { Casa, Clinica, Hospital, Monitor, Pata, PinoMapa } from "./icons";
import * as motion from "motion/react-client";
import { flutuar, revelar } from "../lib/animacoes";

// Clínicas mostram o endereço no lugar do texto
const locais: { icone: React.ReactNode; titulo: string; texto?: string; endereco?: string }[] = [
  { icone: <Casa />, titulo: "ATENDIMENTO\nRESIDENCIAL", texto: "Em todo o Vale do Paraíba e região. Levo o cuidado até você." },
  {
    icone: <Clinica />,
    titulo: "CLÍNICA PARCEIRA EM\nCACHOEIRA PAULISTA",
    endereco: "Rua Orris Benedito Barbosa, 318.",
  },
  {
    icone: <Hospital />,
    titulo: "CLÍNICA PARCEIRA EM\nCRUZEIRO",
    endereco: "Rua Dom Bôsco, Centro, 343.",
  },
  {
    icone: <Monitor />,
    titulo: "CONSULTORIA DE\nAQUARISMO",
    texto: "Para aquários de água doce, presencial ou virtual.",
  },
];

export default function OndeAtendo() {
  return (
    <section id="onde-atendo" className="onde">
      <div className="onde__inner">
        <div className="onde__texto">
          <motion.div className="onde__titulo" {...revelar("cima")}>
            <PinoMapa />
            <h2 className="titulo-secao">ONDE ATENDO</h2>
          </motion.div>
          <motion.p className="onde__sub" {...revelar("cima", 1)}>
            Atendimento completo, com flexibilidade e comodidade.
          </motion.p>
          <div className="onde__grade">
            {locais.map((l, i) => (
              <motion.div
                key={l.titulo}
                className="onde__item"
                {...revelar("cima", i + 2)}
              >
                {l.icone}
                <h3>{l.titulo}</h3>
                {l.texto && <p>{l.texto}</p>}
                {l.endereco && (
                  <address className="onde__endereco">
                    <strong>Endereço:</strong> {l.endereco}
                  </address>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div className="onde__foto" {...revelar("direita", 1)}>
          <div className="onde__quadro">
            <div className="onde__arco">
              <div className="onde__arco-img">
                <Image
                  src="/img/onde-atendo.jpg"
                  alt="Médico veterinário sorrindo, segurando dois filhotes de cachorro"
                  fill
                  sizes="(max-width: 720px) 300px, 380px"
                />
              </div>
            </div>
            <motion.div className="onde__pata1" {...flutuar(6, 2.2)}>
              <Pata width={78} height={78} />
            </motion.div>
            <motion.div className="onde__pata2" style={{ rotate: 18 }} {...flutuar(6, 2.8, 1)}>
              <Pata width={56} height={56} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
