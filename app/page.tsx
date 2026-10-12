import Aquarismo from "./components/Aquarismo";
import Avaliacoes from "./components/Avaliacoes";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import OndeAtendo from "./components/OndeAtendo";
import Sobre from "./components/Sobre";
import { WhatsApp } from "./components/icons";
import { site } from "./config";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Sobre />
        <OndeAtendo />
        <Aquarismo />
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
