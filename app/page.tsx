import Aquarismo from "./components/Aquarismo";
import Avaliacoes from "./components/Avaliacoes";
import Footer from "./components/Footer";
import Galeria from "./components/Galeria";
import Header from "./components/Header";
import Hero from "./components/Hero";
import OndeAtendo from "./components/OndeAtendo";
import Servicos from "./components/Servicos";
import Sobre from "./components/Sobre";
import { WhatsApp } from "./components/icons";
import { site } from "./config";
// Dados estruturados (Schema.org) para o Google entender o negócio e a região atendida
import { dadosEstruturados } from "./lib/dadosEstruturados";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main>
        <Hero />
        <Sobre />
        <Servicos />
        <OndeAtendo />
        <Aquarismo />
        <Galeria />
        <Avaliacoes />
      </main>
      <Footer />
      <a
        className="zap-flutuante"
        href={site.whatsapp}
        target="_blank"
        rel="noopener"
        aria-label="Falar no WhatsApp"
        title="Falar no WhatsApp"
      >
        <WhatsApp size={28} />
      </a>
    </>
  );
}
