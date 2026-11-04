// Acesso às avaliações pelo servidor (Server Components e Server Actions), com o Firestore Lite.
// O Lite fala com o Firestore por REST/fetch e roda no Cloudflare Workers; o SDK completo, no servidor,
// usa gRPC + protobufjs, que gera código com `new Function` e é bloqueado pelo Workers.
// Não importar este arquivo em componentes do navegador: lá se usa avaliacoes-admin.ts.

import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore/lite";
import { lerAvaliacoes, type Avaliacao } from "./avaliacoes";
import { app } from "./firebase";

const colecao = collection(getFirestore(app), "avaliacoes");

// Leitura pública (sem login): as regras só liberam consultas filtradas por "aprovada"
export async function listarAprovadas(): Promise<Avaliacao[]> {
  return lerAvaliacoes(await getDocs(query(colecao, where("status", "==", "aprovada"))));
}

export async function adicionarAvaliacao(dados: Pick<Avaliacao, "nome" | "notas" | "comentario">): Promise<void> {
  const nova: Omit<Avaliacao, "id"> = { ...dados, status: "pendente", criadaEm: new Date().toISOString() };
  await addDoc(colecao, nova);
}
