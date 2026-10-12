import Image from "next/image";
import Bolhas from "./Bolhas";
import { Engrenagem, Folha, Gota, Peixe, PeixeVerde } from "./icons";

const topicos = [
  { icone: <Folha />, texto: "Orientação sobre montagem e manutenção" },
  { icone: <Gota />, texto: "Qualidade da água e parâmetros ideais" },
  { icone: <PeixeVerde />, texto: "Escolha de peixes e plantas" },
  { icone: <Engrenagem />, texto: "Soluções para problemas comuns" },
];

export default function Aquarismo() {
  return (
    <section id="aquarismo" className="aqua">
      <div className="aqua__fundo" aria-hidden="true">
        <Image src="/img/aquario-fundo.jpg" alt="" fill sizes="(max-width: 720px) 100vw, 70vw" />
      </div>
      <Bolhas />
      <div className="aqua__inner">
        <div className="aqua__texto">
          <div className="aqua__titulo">
            <Peixe width={46} height={30} stroke="#d4ad5c" />
            <h2>AQUARISMO</h2>
          </div>
          <p className="aqua__frase">
            Mais do que um hobby,
            <br />
            <span>um ecossistema em equilíbrio.</span>
          </p>
          <p className="aqua__desc">
            <strong>A consultoria de aquarismo</strong> é feita de forma virtual, com orientações personalizadas para o
            seu tipo de aquário, peixes e rotina. Assim, você garante um ambiente saudável, com menos problemas e mais
            vida no seu aquário.
          </p>
          <div className="aqua__grade">
            {topicos.map((t) => (
              <div key={t.texto} className="aqua__item">
                {t.icone}
                <p>{t.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
