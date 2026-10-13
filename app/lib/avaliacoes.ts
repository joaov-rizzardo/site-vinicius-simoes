// Armazenamento em memória (protótipo): os dados somem ao reiniciar o servidor.
// Para persistir, basta reimplementar estas funções com um banco de dados.

// Toda avaliação nova entra como "pendente" e só aparece no site depois de aprovada na área admin
export type StatusAvaliacao = "pendente" | "aprovada" | "recusada";

export type Avaliacao = {
  id: string;
  nome: string;
  nota: 1 | 2 | 3 | 4 | 5;
  comentario: string;
  // Foto do pet; sem foto, o card mostra a inicial do nome
  foto?: { src: string; alt: string };
  status: StatusAvaliacao;
  criadaEm: string; // ISO
};

const dia = 24 * 60 * 60 * 1000;

const iniciais: Avaliacao[] = [
  {
    id: "seed-1",
    nome: "Mariana S.",
    nota: 5,
    foto: { src: "/img/avaliacao-labrador.jpg", alt: "Labrador preto" },
    comentario: "Atendimento atencioso, explica tudo com calma e seu cuidado faz toda a diferença. Meu dog ama!",
    status: "aprovada",
    criadaEm: new Date(Date.now() - 40 * dia).toISOString(),
  },
  {
    id: "seed-2",
    nome: "Rafael T.",
    nota: 5,
    foto: { src: "/img/avaliacao-gato.jpg", alt: "Gato tigrado" },
    comentario: "Excelente profissional! Cuidou muito bem da minha gata e me deixou super tranquila durante todo o atendimento.",
    status: "aprovada",
    criadaEm: new Date(Date.now() - 18 * dia).toISOString(),
  },
  {
    id: "seed-3",
    nome: "Juliana M.",
    nota: 5,
    foto: { src: "/img/aquario-peixe-palhaco.jpg", alt: "Peixe-palhaço" },
    comentario: "A consultoria de aquarismo foi perfeita! Meu aquário nunca esteve tão equilibrado.",
    status: "aprovada",
    criadaEm: new Date(Date.now() - 5 * dia).toISOString(),
  },
  // Exemplos para a demonstração da área admin
  {
    id: "seed-4",
    nome: "Carlos A.",
    nota: 5,
    comentario: "Veio em casa atender meu cachorro idoso, com muita paciência. Recomendo demais!",
    status: "pendente",
    criadaEm: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "seed-5",
    nome: "Fernanda L.",
    nota: 4,
    comentario: "Ótimo atendimento na clínica de Cruzeiro. Só demorou um pouco para conseguir horário.",
    status: "pendente",
    criadaEm: new Date(Date.now() - 1 * dia).toISOString(),
  },
  {
    id: "seed-6",
    nome: "promo123",
    nota: 1,
    comentario: "Compre seguidores baratos no meu perfil!!! Acesse o link na bio.",
    status: "recusada",
    criadaEm: new Date(Date.now() - 3 * dia).toISOString(),
  },
];

// globalThis evita que o hot reload do `next dev` zere a lista a cada edição
const g = globalThis as typeof globalThis & { __avaliacoesStoreV2?: Avaliacao[] };
const store = (g.__avaliacoesStoreV2 ??= [...iniciais]);

// Mais recentes primeiro; sem filtro, devolve todas
export function listarAvaliacoes(status?: StatusAvaliacao): Avaliacao[] {
  return store
    .filter((a) => !status || a.status === status)
    .sort((a, b) => b.criadaEm.localeCompare(a.criadaEm));
}

export function contarPorStatus(): Record<StatusAvaliacao, number> {
  const total = { pendente: 0, aprovada: 0, recusada: 0 };
  for (const a of store) total[a.status]++;
  return total;
}

export function adicionarAvaliacao(dados: Pick<Avaliacao, "nome" | "nota" | "comentario">): Avaliacao {
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
