"use server";

import { revalidatePath } from "next/cache";
import { adicionarAvaliacao, type Avaliacao } from "./lib/avaliacoes";
import { COMENTARIO_MAX, COMENTARIO_MIN, NOME_MAX, NOME_MIN } from "./lib/limites";

export type EstadoAvaliacao = {
  ok: boolean;
  erros?: { nota?: string; nome?: string; comentario?: string };
  // Devolve o que foi digitado para não perder o texto quando há erro
  valores?: { nota: number; nome: string; comentario: string };
};

export async function enviarAvaliacao(_prev: EstadoAvaliacao, formData: FormData): Promise<EstadoAvaliacao> {
  const nota = Number(formData.get("nota"));
  const nome = String(formData.get("nome") ?? "").trim();
  const comentario = String(formData.get("comentario") ?? "").trim();

  const erros: EstadoAvaliacao["erros"] = {};
  if (!Number.isInteger(nota) || nota < 1 || nota > 5) erros.nota = "Escolha de 1 a 5 estrelas.";
  if (nome.length < NOME_MIN || nome.length > NOME_MAX) erros.nome = `Informe seu nome (${NOME_MIN} a ${NOME_MAX} caracteres).`;
  if (comentario.length < COMENTARIO_MIN) erros.comentario = `Conte um pouco como foi (mínimo de ${COMENTARIO_MIN} caracteres).`;
  else if (comentario.length > COMENTARIO_MAX) erros.comentario = `O comentário pode ter no máximo ${COMENTARIO_MAX} caracteres.`;

  if (Object.keys(erros).length) return { ok: false, erros, valores: { nota, nome, comentario } };

  adicionarAvaliacao({ nome, nota: nota as Avaliacao["nota"], comentario });
  revalidatePath("/");
  return { ok: true };
}
