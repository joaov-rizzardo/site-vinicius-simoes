import PainelAdmin from "./PainelAdmin";

// O painel roda no navegador: o login é do Firebase Auth e as leituras passam pelas regras do Firestore
export default async function Admin({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  return <PainelAdmin status={status} />;
}
