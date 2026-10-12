import Image from "next/image";
import { Casa, Clinica, Hospital, Monitor, Pata, PinoMapa } from "./icons";

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
          <div className="onde__titulo">
            <PinoMapa />
            <h2 className="titulo-secao">ONDE ATENDO</h2>
          </div>
          <p className="onde__sub">Atendimento completo, com flexibilidade e comodidade.</p>
          <div className="onde__grade">
            {locais.map((l) => (
              <div key={l.titulo} className={l.destaque ? "onde__item onde__item--destaque" : "onde__item"}>
                {l.icone}
                <h3>{l.titulo}</h3>
                <p>{l.texto}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="onde__foto">
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
          <Pata width={78} height={78} className="onde__pata1" />
          <Pata width={56} height={56} className="onde__pata2" />
        </div>
      </div>
    </section>
  );
}
