// Presets de animação da Motion, usados pelos componentes via `motion/react-client`.
// São objetos simples (sem funções), então funcionam também em Server Components.

const suave = [0.2, 0.7, 0.2, 1] as const;

const deslocamentos = {
  cima: { y: 32 },
  esquerda: { x: -48 },
  direita: { x: 48 },
  zoom: { y: 24, scale: 0.96 },
};

type Direcao = keyof typeof deslocamentos;

// Entrada ao rolar: aparece uma vez quando o elemento entra na tela.
// `ordem` escalona elementos vizinhos (0, 1, 2…).
export function revelar(direcao: Direcao = "cima", ordem = 0) {
  return {
    initial: { opacity: 0, ...deslocamentos[direcao] },
    whileInView: { opacity: 1, x: 0, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.8, delay: ordem * 0.11, ease: suave },
  };
}

// Entrada ao carregar a página (hero), com atraso em segundos
export function entrada(atraso = 0, y = 26) {
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: atraso, ease: suave },
  };
}

// Movimento contínuo de vaivém no eixo Y (flutuar)
export function flutuar(distancia: number, duracao: number, atraso = 0) {
  return {
    animate: { y: [0, -distancia] },
    transition: {
      duration: duracao,
      delay: atraso,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut" as const,
    },
  };
}
