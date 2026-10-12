"use client";

import { useActionState } from "react";
import { entrar } from "../actions";

export default function FormLogin() {
  const [estado, acao, entrando] = useActionState(entrar, {});

  return (
    <form action={acao} className="adm-login__form">
      <label className="adm-campo">
        <span>Senha</span>
        <input
          type="password"
          name="senha"
          required
          autoFocus
          autoComplete="current-password"
          aria-invalid={!!estado.erro}
          aria-describedby={estado.erro ? "erro-senha" : undefined}
        />
      </label>
      {estado.erro && (
        <p id="erro-senha" className="adm-erro" role="alert">
          {estado.erro}
        </p>
      )}
      <button type="submit" className="adm-botao adm-botao--verde" disabled={entrando}>
        {entrando ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
