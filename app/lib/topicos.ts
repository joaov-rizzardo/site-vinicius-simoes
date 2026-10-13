// Tópicos avaliados pelo cliente; compartilhado entre o formulário (cliente) e o servidor
export const TOPICOS = [
  { id: "clareza", nome: "Atenção e explicação", dica: "Se ouviu suas dúvidas e explicou bem os cuidados" },
  { id: "carisma", nome: "Carisma", dica: "Simpatia e cordialidade no atendimento" },
] as const;

export type TopicoId = (typeof TOPICOS)[number]["id"];
export type Notas = Record<TopicoId, number>;

export const ROTULOS_NOTA = ["", "Péssimo", "Ruim", "Regular", "Bom", "Excelente"];

export function mediaDasNotas(notas: Notas): number {
  return TOPICOS.reduce((soma, t) => soma + notas[t.id], 0) / TOPICOS.length;
}

// 4.8333 → "4,8"
export function formatarNota(n: number): string {
  return n.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}
