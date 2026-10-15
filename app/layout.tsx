import type { Metadata, Viewport } from "next";
import { Lato, Libre_Caslon_Text, Montserrat, Satisfy } from "next/font/google";
import Movimento from "./components/Movimento";
import { site } from "./config";
import "./globals.css";

const lato = Lato({ subsets: ["latin"], weight: ["300", "400", "700", "900"], variable: "--font-lato" });
const caslon = Libre_Caslon_Text({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-caslon" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-montserrat" });
const satisfy = Satisfy({ subsets: ["latin"], weight: "400", variable: "--font-satisfy" });

const titulo = "Veterinário em Domicílio no Vale do Paraíba | Vinicius Simões";
const descricao =
  "Médico veterinário de cães e gatos com atendimento em domicílio no Vale do Paraíba, clínicas em Cachoeira Paulista e Cruzeiro e consultoria de aquarismo.";

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
      className={`${lato.variable} ${caslon.variable} ${montserrat.variable} ${satisfy.variable}`}
    >
      <body>
        <Movimento>{children}</Movimento>
      </body>
    </html>
  );
}
