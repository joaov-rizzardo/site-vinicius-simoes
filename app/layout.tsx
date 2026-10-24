import type { Metadata } from "next";
import { Bodoni_Moda, Lato, Montserrat, Satisfy } from "next/font/google";
import Movimento from "./components/Movimento";
import "./globals.css";

const lato = Lato({ subsets: ["latin"], weight: ["300", "400", "700", "900"], variable: "--font-lato" });
// Serifa de alto contraste (estilo Bodoni) dos títulos, com eixo óptico que afina os traços nos tamanhos grandes
const serifa = Bodoni_Moda({ subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"], variable: "--font-serifa" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["500", "600", "700", "800"], style: ["normal", "italic"], variable: "--font-montserrat" });
const satisfy = Satisfy({ subsets: ["latin"], weight: "400", variable: "--font-satisfy" });

export const metadata: Metadata = {
  title: "Vinicius Vicente Simões – Médico Veterinário | Cães, Gatos e Aquarismo",
  description:
    "Médico veterinário especializado em cães e gatos, com atendimento residencial no Vale do Paraíba e região, clínicas em Cachoeira Paulista e Cruzeiro, e consultoria virtual de aquarismo.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${lato.variable} ${serifa.variable} ${montserrat.variable} ${satisfy.variable}`}
    >
      <body>
        <Movimento>{children}</Movimento>
      </body>
    </html>
  );
}
