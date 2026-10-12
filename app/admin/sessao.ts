import { createHash } from "node:crypto";
import { cookies } from "next/headers";

// Login simples de protótipo: uma senha única, definida em ADMIN_SENHA.
// Antes de publicar, trocar por autenticação de verdade (usuário, senha com hash, expiração de sessão).
export const SENHA_DEMO = "vinicius2026";
const SENHA = process.env.ADMIN_SENHA || SENHA_DEMO;

const COOKIE = "admin_sessao";
// O cookie guarda um hash derivado da senha, nunca a senha em si
const token = createHash("sha256").update(`admin:${SENHA}`).digest("hex");

export function senhaConfere(senha: string) {
  return senha === SENHA;
}

export async function estaLogado() {
  return (await cookies()).get(COOKIE)?.value === token;
}

export async function abrirSessao() {
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 8,
  });
}

export async function encerrarSessao() {
  (await cookies()).delete({ name: COOKIE, path: "/admin" });
}
