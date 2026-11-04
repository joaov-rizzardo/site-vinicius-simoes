"use client";

// O painel e o login só renderizam no navegador (ssr: false). Eles usam o Firestore completo, que, no servidor,
// puxaria gRPC + protobufjs para o Cloudflare Workers, onde a geração de código com `new Function` é bloqueada.
// Não se perde nada: sem a sessão do Firebase Auth, que só existe no navegador, eles mostrariam só o "carregando".
import dynamic from "next/dynamic";

export const PainelAdmin = dynamic(() => import("./PainelAdmin"), { ssr: false });
export const FormLogin = dynamic(() => import("./login/FormLogin"), { ssr: false });
