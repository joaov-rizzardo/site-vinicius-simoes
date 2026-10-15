"use client";

import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { app, db } from "../lib/firebase";

export const auth = getAuth(app);

// Qualquer pessoa pode criar conta no Firebase Auth com a config pública, então estar logado não basta:
// só é admin quem tem um documento em `admins/{uid}` (criado à mão no console do Firebase).
export async function ehAdmin(usuario: User): Promise<boolean> {
  try {
    return (await getDoc(doc(db, "admins", usuario.uid))).exists();
  } catch {
    return false;
  }
}

export type Sessao =
  | { estado: "carregando" }
  | { estado: "fora" }
  | { estado: "sem-permissao"; usuario: User }
  | { estado: "admin"; usuario: User };

export function useSessao(): Sessao {
  const [sessao, setSessao] = useState<Sessao>({ estado: "carregando" });

  useEffect(
    () =>
      onAuthStateChanged(auth, async (usuario) => {
        if (!usuario) return setSessao({ estado: "fora" });
        setSessao({ estado: (await ehAdmin(usuario)) ? "admin" : "sem-permissao", usuario });
      }),
    [],
  );

  return sessao;
}
