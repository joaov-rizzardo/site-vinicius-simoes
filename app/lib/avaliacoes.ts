// Armazenamento em memória (protótipo): os dados somem ao reiniciar o servidor.
// Para persistir, basta reimplementar estas funções com um banco de dados.

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

const dia = 24 * 60 * 60 * 1000;

// Notas na ordem de TOPICOS, só para deixar os exemplos legíveis
const n = (...valores: number[]) => Object.fromEntries(TOPICOS.map((t, i) => [t.id, valores[i]])) as Notas;

const iniciais: Avaliacao[] = [
  {
    id: "seed-1",
    nome: "Mariana S.",
    notas: n(5, 5),
    comentario: "Atendimento atencioso, explica tudo com calma e seu cuidado faz toda a diferença. Meu dog ama!",
    status: "aprovada",
    criadaEm: new Date(Date.now() - 40 * dia).toISOString(),
  },
  {
    id: "seed-2",
    nome: "Rafael T.",
    notas: n(5, 5),
    comentario:
      "Excelente profissional! Cuidou muito bem da minha gata e me deixou super tranquila durante todo o atendimento.",
    status: "aprovada",
    criadaEm: new Date(Date.now() - 18 * dia).toISOString(),
  },
  {
    id: "seed-3",
    nome: "Juliana M.",
    notas: n(5, 5),
    comentario: "A consultoria de aquarismo foi perfeita! Meu aquário nunca esteve tão equilibrado.",
    status: "aprovada",
    criadaEm: new Date(Date.now() - 5 * dia).toISOString(),
  },
  {
    id: "seed-7",
    nome: "Patrícia R.",
    notas: n(5, 4),
    comentario:
      "Explicou o tratamento da minha calopsita com paciência e respondeu todas as dúvidas pelo WhatsApp depois.",
    status: "aprovada",
    criadaEm: new Date(Date.now() - 27 * dia).toISOString(),
  },
  {
    id: "seed-8",
    nome: "Diego F.",
    notas: n(5, 4),
    comentario: "Muito cuidadoso com o Thor, que é bem medroso. Atrasou uns minutinhos, mas valeu cada um.",
    status: "aprovada",
    criadaEm: new Date(Date.now() - 11 * dia).toISOString(),
  },
  // Exemplos para a demonstração da área admin
  {
    id: "seed-4",
    nome: "Carlos A.",
    notas: n(4, 5),
    comentario: "Veio em casa atender meu cachorro idoso, com muita paciência. Recomendo demais!",
    status: "pendente",
    criadaEm: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "seed-5",
    nome: "Fernanda L.",
    notas: n(4, 4),
    comentario: "Ótimo atendimento na clínica de Cruzeiro. Só demorou um pouco para conseguir horário.",
    status: "pendente",
    criadaEm: new Date(Date.now() - 1 * dia).toISOString(),
  },
  {
    id: "seed-6",
    nome: "promo123",
    notas: n(1, 1),
    comentario: "Compre seguidores baratos no meu perfil!!! Acesse o link na bio.",
    status: "recusada",
    criadaEm: new Date(Date.now() - 3 * dia).toISOString(),
  },
];

// globalThis evita que o hot reload do `next dev` zere a lista a cada edição
const g = globalThis as typeof globalThis & { __avaliacoesStoreV5?: Avaliacao[] };
const store = (g.__avaliacoesStoreV5 ??= [...iniciais]);

// Mais recentes primeiro; sem filtro, devolve todas
export function listarAvaliacoes(status?: StatusAvaliacao): Avaliacao[] {
  return store.filter((a) => !status || a.status === status).sort((a, b) => b.criadaEm.localeCompare(a.criadaEm));
}

export function contarPorStatus(): Record<StatusAvaliacao, number> {
  const total = { pendente: 0, aprovada: 0, recusada: 0 };
  for (const a of store) total[a.status]++;
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

export function adicionarAvaliacao(dados: Pick<Avaliacao, "nome" | "notas" | "comentario">): Avaliacao {
  const nova: Avaliacao = { ...dados, id: crypto.randomUUID(), status: "pendente", criadaEm: new Date().toISOString() };
  store.push(nova);
  return nova;
}

export function alterarStatus(id: string, status: StatusAvaliacao) {
  const avaliacao = store.find((a) => a.id === id);
  if (avaliacao) avaliacao.status = status;
}

export function excluirAvaliacao(id: string) {
  const i = store.findIndex((a) => a.id === id);
  if (i >= 0) store.splice(i, 1);
}
