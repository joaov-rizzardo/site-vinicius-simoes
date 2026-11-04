import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página não encontrada – Vinicius Vicente Simões",
};

export default function NaoEncontrada() {
  return (
    <main className="nao-encontrada">
      <Image src="/img/logo.png" alt="Logo Vinicius Vicente Simões" width={61} height={72} />
      <h1>Página não encontrada</h1>
      <p>O endereço que você acessou não existe ou mudou de lugar.</p>
      <Link href="/" className="cta nao-encontrada__botao">
        Voltar para o início
      </Link>
    </main>
  );
}
