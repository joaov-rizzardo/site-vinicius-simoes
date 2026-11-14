// Dados estruturados (JSON-LD, schema.org): ficha do negócio que o Google lê para entender
// o tipo de serviço, quem atende e em quais cidades. Não aparece para o visitante.
import { site } from "../config";

// Cidades atendidas, das prioritárias para as demais
const cidades = ["Cachoeira Paulista", "Cruzeiro", "Canas", "Lorena"];

const idNegocio = `${site.url}/#veterinario`;
const idPessoa = `${site.url}/#vinicius`;

export const dadosEstruturados = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "VeterinaryCare",
      "@id": idNegocio,
      name: "Vinicius Vicente Simões – Médico Veterinário",
      description:
        "Veterinário a domicílio para cães e gatos em Cachoeira Paulista, Cruzeiro, Canas e Lorena, com atendimento em clínicas parceiras e consultoria de aquarismo.",
      url: site.url,
      telephone: site.telefone,
      image: [`${site.url}/opengraph-image.jpg`, `${site.url}/img/sobre-vinicius-perfil.webp`],
      logo: `${site.url}/img/logo.png`,
      areaServed: cidades.map((nome) => ({
        "@type": "City",
        name: nome,
        containedInPlace: { "@type": "State", name: "São Paulo" },
      })),
      // Sem horário fixo: horário comercial padrão como referência
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "08:00",
          closes: "12:00",
        },
      ],
      sameAs: [site.instagram],
      employee: { "@id": idPessoa },
      makesOffer: [
        "Consulta veterinária a domicílio",
        "Clínica médica de cães e gatos",
        "Atendimento em clínica parceira",
        "Consultoria de aquarismo",
      ].map((nome) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: nome } })),
    },
    {
      "@type": "Person",
      "@id": idPessoa,
      name: "Vinicius Vicente Simões",
      jobTitle: "Médico Veterinário",
      image: `${site.url}/img/sobre-vinicius-perfil.webp`,
      sameAs: [site.instagram],
      worksFor: { "@id": idNegocio },
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Registro profissional",
        name: site.crmv,
        recognizedBy: { "@type": "Organization", name: "Conselho Regional de Medicina Veterinária do Estado de São Paulo" },
      },
    },
  ],
};
