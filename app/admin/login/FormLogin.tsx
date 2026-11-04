"use client";

import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, ehAdmin, useSessao } from "../auth";

function mensagemDeErro(e: unknown): string {
  const codigo = e instanceof FirebaseError ? e.code : "";
  if (codigo === "auth/invalid-credential" || codigo === "auth/invalid-email") return "E-mail ou senha incorretos.";
  if (codigo === "auth/too-many-requests") return "Muitas tentativas. Aguarde alguns minutos e tente de novo.";
  if (codigo === "auth/network-request-failed") return "Sem conexão. Verifique a internet e tente de novo.";
  return "Não foi possível entrar. Tente de novo.";
}

export default function FormLogin() {
  const router = useRouter();
  const sessao = useSessao();
  const [erro, setErro] = useState<string>();
  const [entrando, setEntrando] = useState(false);

  // Quem já está logado como admin vai direto para o painel
  useEffect(() => {
    if (sessao.estado === "admin") router.replace("/admin");
  }, [sessao.estado, router]);

  async function entrar(formData: FormData) {
    setErro(undefined);
    setEntrando(true);
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        String(formData.get("email") ?? "").trim(),
        String(formData.get("senha") ?? ""),
      );
      if (!(await ehAdmin(user))) {
        await signOut(auth);
        setErro("Esta conta não tem acesso à área admin.");
        return;
      }
      router.replace("/admin");
    } catch (e) {
      setErro(mensagemDeErro(e));
    } finally {
      setEntrando(false);
    }
  }

  return (
    <form action={entrar} className="adm-login__form">
      <label className="adm-campo">
        <span>E-mail</span>
        <input type="email" name="email" required autoFocus autoComplete="username" aria-invalid={!!erro} />
      </label>
      <label className="adm-campo">
        <span>Senha</span>
        <input
          type="password"
          name="senha"
          required
          autoComplete="current-password"
          aria-invalid={!!erro}
          aria-describedby={erro ? "erro-login" : undefined}
        />
      </label>
      {erro && (
        <p id="erro-login" className="adm-erro" role="alert">
          {erro}
        </p>
      )}
      <button type="submit" className="adm-botao adm-botao--verde" disabled={entrando}>
        {entrando ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
