// Avaliações guardadas no Firestore, coleção `avaliacoes` (um documento por avaliação, id = Avaliacao.id).
// Sem login, as regras só deixam ler as aprovadas e criar novas como "pendente"; o resto exige um admin.
// Aqui ficam só os tipos e os cálculos, sem o SDK do Firebase, para servir aos dois lados:
// o acesso ao banco está em avaliacoes-servidor.ts (Firestore Lite) e avaliacoes-admin.ts (Firestore completo).

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

// Mais recentes primeiro. A ordenação é feita aqui para não exigir índice composto (status + criadaEm).
// Aceita o snapshot das duas versões do SDK (Lite no servidor, completo no admin)
export function lerAvaliacoes(snap: { docs: { id: string; data(): unknown }[] }): Avaliacao[] {
  return snap.docs
    .map((d) => ({ ...(d.data() as Omit<Avaliacao, "id">), id: d.id }))
    .sort((a, b) => b.criadaEm.localeCompare(a.criadaEm));
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
