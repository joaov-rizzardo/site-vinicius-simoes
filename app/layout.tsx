import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Lato, Montserrat } from "next/font/google";
import Movimento from "./components/Movimento";
import { site } from "./config";
import "./globals.css";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-lato" });
// Serifa de alto contraste (estilo Bodoni) dos títulos, com eixo óptico que afina os traços nos tamanhos grandes
const serifa = Bodoni_Moda({ subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"], variable: "--font-serifa" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["500", "600", "700", "800"], style: ["normal", "italic"], variable: "--font-montserrat" });

const titulo = "Veterinário a Domicílio em Cachoeira Paulista e Cruzeiro | Dr. Vinicius Vicente Simões";
const descricao =
  "Veterinário a domicílio para cães e gatos em Cachoeira Paulista, Cruzeiro e região. Atendimento em clínicas parceiras e consultoria de aquarismo.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: titulo,
  description: descricao,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Vinicius Vicente Simões – Médico Veterinário",
    title: titulo,
    description: descricao,
  },
};

export const viewport: Viewport = {
  colorScheme: "only light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${lato.variable} ${serifa.variable} ${montserrat.variable}`}
    >
      <body>
        <Movimento>{children}</Movimento>
      </body>
    </html>
  );
}
