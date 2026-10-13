import Image from "next/image";
import { Casa, Clinica, Hospital, Monitor, Pata, PinoMapa } from "./icons";
import * as motion from "motion/react-client";
import { flutuar, revelar } from "../lib/animacoes";

const locais = [
  { icone: <Casa />, titulo: "ATENDIMENTO\nRESIDENCIAL", texto: "Em todo o Vale do Paraíba. Levo o cuidado até você." },
  { icone: <Clinica />, titulo: "CLÍNICA EM\nCACHOEIRA PAULISTA", texto: "Atendimento presencial em clínica parceira." },
  { icone: <Hospital />, titulo: "CLÍNICA EM\nCRUZEIRO", texto: "Atendimento presencial em clínica parceira." },
  {
    icone: <Monitor />,
    titulo: "CONSULTORIA VIRTUAL\nDE AQUARISMO",
    texto: "Orientação e suporte especializado para seu aquário.",
    destaque: true,
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
                className={l.destaque ? "onde__item onde__item--destaque" : "onde__item"}
                {...revelar("cima", i + 2)}
              >
                {l.icone}
                <h3>{l.titulo}</h3>
                <p>{l.texto}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div className="onde__foto" {...revelar("direita", 1)}>
          <div className="onde__arco">
            <div className="onde__arco-img">
              <Image
                src="/img/onde-atendo.jpg"
                alt="Médico veterinário sorrindo, segurando dois filhotes de cachorro"
                fill
                sizes="(max-width: 720px) 90vw, 35vw"
              />
            </div>
          </div>
          <motion.div className="onde__pata1" {...flutuar(6, 2.2)}>
            <Pata width={78} height={78} />
          </motion.div>
          <motion.div className="onde__pata2" style={{ rotate: 18 }} {...flutuar(6, 2.8, 1)}>
            <Pata width={56} height={56} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
