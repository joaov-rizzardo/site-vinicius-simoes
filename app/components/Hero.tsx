import Image from "next/image";
import { Calendario, Peixe, Seta } from "./icons";

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero__inner">
        <div className="hero__texto">
          <p className="hero__kicker">
            CUIDADO, SAÚDE E BEM-ESTAR
            <br />
            PARA SEU PET
          </p>
          <h1>
            Seu melhor amigo
            <br />
            <span>em boas mãos.</span>
          </h1>
          <p className="hero__desc">
            Sou médico veterinário, especializado no atendimento de cães e gatos, com atendimento residencial em todo
            o Vale do Paraíba e também presencial em clínicas de Cachoeira Paulista e Cruzeiro. Além disso, ofereço
            consultoria especializada em aquarismo, de forma virtual.
          </p>
          <p className="hero__tags">CÃES &nbsp;•&nbsp; GATOS &nbsp;•&nbsp; AQUARISMO</p>
          <div id="servicos" className="hero__ctas">
            <a className="cta botao-pilula botao-pilula--verde" href="#contato">
              <Calendario />
              <span className="botao-pilula__textos">
                <span className="botao-pilula__titulo">MARCAR CONSULTA</span>
                <span className="botao-pilula__sub">CÃES E GATOS</span>
              </span>
              <Seta />
            </a>
            <a className="cta botao-pilula botao-pilula--escuro" href="#aquarismo">
              <Peixe />
              <span className="botao-pilula__textos">
                <span className="botao-pilula__titulo">MARCAR CONSULTORIA</span>
                <span className="botao-pilula__sub">DE AQUARISMO</span>
              </span>
              <Seta />
            </a>
          </div>
        </div>
        <div className="hero__foto">
          <div className="hero__halo" />
          <div className="hero__imagem">
            <Image
              src="/img/hero-vinicius.png"
              alt="Médico veterinário sorrindo, de braços cruzados, com estetoscópio no pescoço"
              fill
              priority
              sizes="(max-width: 720px) 90vw, 45vw"
            />
          </div>
          <div className="hero__frase">
            <p>{"Cuidado\n  também é\n    prevenção."}</p>
            <div />
          </div>
        </div>
      </div>
    </section>
  );
}
