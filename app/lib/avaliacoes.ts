// Armazenamento em memória (protótipo): os dados somem ao reiniciar o servidor.
// Para persistir, basta reimplementar estas funções com um banco de dados.

export type Avaliacao = {
  id: string;
  nome: string;
  nota: 1 | 2 | 3 | 4 | 5;
  comentario: string;
  // Foto do pet; sem foto, o card mostra a inicial do nome
  foto?: { src: string; alt: string };
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
    criadaEm: new Date(Date.now() - 40 * dia).toISOString(),
  },
  {
    id: "seed-2",
    nome: "Rafael T.",
    nota: 5,
    foto: { src: "/img/avaliacao-gato.jpg", alt: "Gato tigrado" },
    comentario: "Excelente profissional! Cuidou muito bem da minha gata e me deixou super tranquila durante todo o atendimento.",
    criadaEm: new Date(Date.now() - 18 * dia).toISOString(),
  },
  {
    id: "seed-3",
    nome: "Juliana M.",
    nota: 5,
    foto: { src: "/img/aquario-peixe-palhaco.jpg", alt: "Peixe-palhaço" },
    comentario: "A consultoria de aquarismo foi perfeita! Meu aquário nunca esteve tão equilibrado.",
    criadaEm: new Date(Date.now() - 5 * dia).toISOString(),
  },
];

// globalThis evita que o hot reload do `next dev` zere a lista a cada edição
const g = globalThis as typeof globalThis & { __avaliacoesStore?: Avaliacao[] };
const store = (g.__avaliacoesStore ??= [...iniciais]);

// Mais recentes primeiro: quem acabou de avaliar vê o próprio card sem mexer no carrossel
export function listarAvaliacoes(): Avaliacao[] {
  return [...store].sort((a, b) => b.criadaEm.localeCompare(a.criadaEm));
}

export function adicionarAvaliacao(dados: Pick<Avaliacao, "nome" | "nota" | "comentario">): Avaliacao {
  const nova: Avaliacao = { ...dados, id: crypto.randomUUID(), criadaEm: new Date().toISOString() };
  store.push(nova);
  return nova;
}
