// Acesso às avaliações pela área admin, no navegador, com o Firestore completo (tem tempo real, via onSnapshot).
// Só funciona com um admin logado no Firebase Auth. No servidor, usar avaliacoes-servidor.ts.

import { collection, deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import type { StatusAvaliacao } from "./avaliacoes";
import { app } from "./firebase";

export const db = getFirestore(app);
export const colecaoAvaliacoes = collection(db, "avaliacoes");

export async function alterarStatus(id: string, status: StatusAvaliacao): Promise<void> {
  await updateDoc(doc(colecaoAvaliacoes, id), { status });
}

export async function excluirAvaliacao(id: string): Promise<void> {
  await deleteDoc(doc(colecaoAvaliacoes, id));
}
