import Image from "next/image";
import { site } from "../config";
import { entrada } from "../lib/animacoes";
import { Calendario, Seta } from "./icons";

// Abre o WhatsApp já com a mensagem escrita
const linkWhatsApp = (mensagem: string) => `${site.whatsapp}?text=${encodeURIComponent(mensagem)}`;

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero__inner">
        <div className="hero__texto">
          <div className="hero__conteudo">
            <p className="hero__kicker entrada" style={entrada(0.1)}>
              <span>
                CUIDADO, SAÚDE E BEM-ESTAR <br className="hero__quebra" />
                PARA SEU PET
              </span>
            </p>
            <h1 className="entrada" style={entrada(0.22)}>
              Seu melhor amigo
              <br />
              <em>em boas mãos.</em>
            </h1>
            <p className="hero__desc entrada" style={entrada(0.38)}>
              Sou Dr. Vinicius Vicente Simões, médico veterinário dedicado ao bem-estar de cães e gatos. Atendo{" "}
              <span className="hero__so-desktop">principalmente </span>em domicílio, em todo o Vale do Paraíba e região, além de clínicas parceiras em Cachoeira
              Paulista e Cruzeiro. Também ofereço consultoria em aquarismo de água doce, presencial ou virtual.
            </p>
            {/* Um único botão para consulta ou consultoria; a seção Aquarismo tem o próprio botão de consultoria */}
            <div className="hero__ctas entrada" style={entrada(0.5)}>
              <a
                className="cta botao-hero botao-hero--verde"
                href={linkWhatsApp("Olá! Gostaria de agendar um atendimento.")}
                target="_blank"
                rel="noopener"
              >
                <Calendario />
                <span className="botao-hero__textos">Agendar atendimento</span>
                <Seta />
              </a>
            </div>
          </div>
        </div>

        {/* Cão e gato à direita olhando para um peixe entre plantas de aquário, sobre fundo preto */}
        <div className="hero__retrato">
          <div className="hero__foto entrada" style={entrada(0.25, 40)}>
            <Image
              src="/img/hero-pets-largo.webp"
              alt="Cão dálmata e gato tigrado olhando para um peixe nadando entre plantas de aquário"
              fill
              preload
              fetchPriority="high"
              sizes="100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
