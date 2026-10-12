"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { alterarStatus, excluirAvaliacao } from "../lib/avaliacoes";
import { abrirSessao, encerrarSessao, estaLogado, senhaConfere } from "./sessao";

export async function entrar(_prev: { erro?: string }, formData: FormData): Promise<{ erro?: string }> {
  if (!senhaConfere(String(formData.get("senha") ?? ""))) return { erro: "Senha incorreta." };
  await abrirSessao();
  redirect("/admin");
}

export async function sair() {
  await encerrarSessao();
  redirect("/admin/login");
}

// Uma única action para os botões de cada card: o botão clicado envia `acao`
export async function moderar(formData: FormData) {
  if (!(await estaLogado())) redirect("/admin/login");

  const id = String(formData.get("id") ?? "");
  const acao = formData.get("acao");
  if (acao === "aprovar") alterarStatus(id, "aprovada");
  else if (acao === "recusar") alterarStatus(id, "recusada");
  else if (acao === "pendente") alterarStatus(id, "pendente");
  else if (acao === "excluir") excluirAvaliacao(id);

  revalidatePath("/admin");
  revalidatePath("/");
}
