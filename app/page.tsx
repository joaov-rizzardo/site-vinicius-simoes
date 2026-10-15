import Aquarismo from "./components/Aquarismo";
import Avaliacoes from "./components/Avaliacoes";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import OndeAtendo from "./components/OndeAtendo";
import Sobre from "./components/Sobre";
import { WhatsApp } from "./components/icons";
import { site } from "./config";

// Dados estruturados (Schema.org) para o Google entender o negócio e a região atendida
const dadosEstruturados = {
  "@context": "https://schema.org",
  "@type": "VeterinaryCare",
  name: "Vinicius Vicente Simões – Médico Veterinário",
  description:
    "Atendimento veterinário de cães e gatos em domicílio no Vale do Paraíba, em clínicas de Cachoeira Paulista e Cruzeiro, e consultoria de aquarismo.",
  url: site.url,
  image: `${site.url}/opengraph-image.jpg`,
  logo: `${site.url}/img/logo.png`,
  telephone: site.telefone,
  areaServed: [
    { "@type": "AdministrativeArea", name: "Vale do Paraíba" },
    { "@type": "City", name: "Cachoeira Paulista" },
    { "@type": "City", name: "Cruzeiro" },
  ],
  sameAs: [site.instagram],
  founder: { "@type": "Person", name: "Vinicius Vicente Simões", jobTitle: "Médico Veterinário" },
};

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
