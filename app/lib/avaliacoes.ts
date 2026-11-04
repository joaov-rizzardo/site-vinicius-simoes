// Avaliações guardadas no Firestore, coleção `avaliacoes` (um documento por avaliação, id = Avaliacao.id).
// Sem login, as regras só deixam ler as aprovadas e criar novas como "pendente"; o resto exige um admin.

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  type QuerySnapshot,
} from "firebase/firestore";
import { db } from "./firebase";
import { mediaDasNotas, TOPICOS, type Notas, type TopicoId } from "./topicos";

// Toda avaliação nova entra como "pendente" e só aparece no site depois de aprovada na área admin
export type StatusAvaliacao = "pendente" | "aprovada" | "recusada";

export type Avaliacao = {
  id: string;
  nome: string;
  // Uma nota de 1 a 5 por tópico; a nota geral é a média delas
  notas: Notas;
  comentario: string;
  status: StatusAvaliacao;
  criadaEm: string; // ISO
};

export const colecaoAvaliacoes = collection(db, "avaliacoes");

// Mais recentes primeiro. A ordenação é feita aqui para não exigir índice composto (status + criadaEm).
export function lerAvaliacoes(snap: QuerySnapshot): Avaliacao[] {
  return snap.docs
    .map((d) => ({ ...(d.data() as Omit<Avaliacao, "id">), id: d.id }))
    .sort((a, b) => b.criadaEm.localeCompare(a.criadaEm));
}

// Leitura pública (sem login): as regras só liberam consultas filtradas por "aprovada"
export async function listarAprovadas(): Promise<Avaliacao[]> {
  return lerAvaliacoes(await getDocs(query(colecaoAvaliacoes, where("status", "==", "aprovada"))));
}

export function contarPorStatus(avaliacoes: Avaliacao[]): Record<StatusAvaliacao, number> {
  const total = { pendente: 0, aprovada: 0, recusada: 0 };
  for (const a of avaliacoes) total[a.status]++;
  return total;
}

// Médias de um conjunto de avaliações: geral e por tópico (null quando não há nenhuma)
export type Medias = { total: number; geral: number; porTopico: Record<TopicoId, number> };

export function calcularMedias(avaliacoes: Avaliacao[]): Medias | null {
  if (avaliacoes.length === 0) return null;
  const porTopico = Object.fromEntries(
    TOPICOS.map((t) => [t.id, avaliacoes.reduce((soma, a) => soma + a.notas[t.id], 0) / avaliacoes.length]),
  ) as Record<TopicoId, number>;
  return { total: avaliacoes.length, geral: mediaDasNotas(porTopico), porTopico };
}

export async function adicionarAvaliacao(dados: Pick<Avaliacao, "nome" | "notas" | "comentario">): Promise<void> {
  const nova: Omit<Avaliacao, "id"> = { ...dados, status: "pendente", criadaEm: new Date().toISOString() };
  await addDoc(colecaoAvaliacoes, nova);
}

// Moderação: só funciona no navegador, com um admin logado no Firebase Auth
export async function alterarStatus(id: string, status: StatusAvaliacao): Promise<void> {
  await updateDoc(doc(colecaoAvaliacoes, id), { status });
}

export async function excluirAvaliacao(id: string): Promise<void> {
  await deleteDoc(doc(colecaoAvaliacoes, id));
}
