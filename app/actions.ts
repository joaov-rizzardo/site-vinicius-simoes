"use server";

import { revalidatePath } from "next/cache";
import { adicionarAvaliacao } from "./lib/avaliacoes";
import { COMENTARIO_MAX, COMENTARIO_MIN, NOME_MAX, NOME_MIN } from "./lib/limites";
import { TOPICOS, type Notas } from "./lib/topicos";

const NOME_ANONIMO = "Anônimo";

export type EstadoAvaliacao = {
  ok: boolean;
  erros?: { notas?: string; nome?: string; comentario?: string; envio?: string };
  // Devolve o que foi digitado para não perder o texto quando há erro
  valores?: { notas: Partial<Notas>; nome: string; anonimo: boolean; comentario: string };
};

export async function enviarAvaliacao(_prev: EstadoAvaliacao, formData: FormData): Promise<EstadoAvaliacao> {
  // Cada tópico chega como um grupo de rádio `nota-<id>`
  const notas: Partial<Notas> = {};
  for (const t of TOPICOS) {
    const valor = Number(formData.get(`nota-${t.id}`));
    if (Number.isInteger(valor) && valor >= 1 && valor <= 5) notas[t.id] = valor;
  }
  // Avaliação anônima dispensa o nome e é publicada como "Anônimo"
  const anonimo = formData.get("anonimo") === "on";
  const nome = anonimo ? NOME_ANONIMO : String(formData.get("nome") ?? "").trim();
  const comentario = String(formData.get("comentario") ?? "").trim();

  const erros: EstadoAvaliacao["erros"] = {};
  if (Object.keys(notas).length < TOPICOS.length) erros.notas = "Dê uma nota de 1 a 5 estrelas para cada tópico.";
  if (!anonimo && (nome.length < NOME_MIN || nome.length > NOME_MAX))
    erros.nome = `Informe seu nome (${NOME_MIN} a ${NOME_MAX} caracteres).`;
  if (comentario.length < COMENTARIO_MIN)
    erros.comentario = `Conte um pouco como foi (mínimo de ${COMENTARIO_MIN} caracteres).`;
  else if (comentario.length > COMENTARIO_MAX)
    erros.comentario = `O comentário pode ter no máximo ${COMENTARIO_MAX} caracteres.`;

  if (Object.keys(erros).length)
    return { ok: false, erros, valores: { notas, nome: anonimo ? "" : nome, anonimo, comentario } };

  try {
    await adicionarAvaliacao({ nome, notas: notas as Notas, comentario });
  } catch (erro) {
    console.error("Falha ao salvar avaliação", erro);
    return {
      ok: false,
      erros: { envio: "Não foi possível enviar sua avaliação agora. Tente novamente em instantes." },
      valores: { notas, nome: anonimo ? "" : nome, anonimo, comentario },
    };
  }
  revalidatePath("/");
  return { ok: true };
}
