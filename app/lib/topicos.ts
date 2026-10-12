// Tópicos avaliados pelo cliente; compartilhado entre o formulário (cliente) e o servidor
export const TOPICOS = [
  { id: "carinho", nome: "Carinho com o pet", dica: "Como tratou e acalmou seu animal" },
  { id: "atencao", nome: "Atenção e escuta", dica: "Se ouviu suas dúvidas com calma" },
  { id: "clareza", nome: "Clareza nas explicações", dica: "Diagnóstico e cuidados bem explicados" },
  { id: "simpatia", nome: "Simpatia", dica: "Carisma e cordialidade no atendimento" },
  { id: "confianca", nome: "Segurança no tratamento", dica: "Confiança no que foi indicado" },
  { id: "pontualidade", nome: "Pontualidade", dica: "Respeitou o horário combinado" },
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
