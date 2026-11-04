// App do Firebase, compartilhado pelo servidor e pelo navegador. Quem protege os dados são as regras em firestore.rules.
// O Firestore fica em módulos separados, porque cada lado usa uma versão diferente do SDK:
// - servidor (Cloudflare Workers): `firebase/firestore/lite`, via REST/fetch (lib/avaliacoes-servidor.ts).
//   O SDK completo, no servidor, usa gRPC + protobufjs, que gera código com `new Function` — o Workers bloqueia.
// - navegador (área admin): `firebase/firestore` completo, que tem tempo real (lib/avaliacoes-admin.ts).
import { getApp, getApps, initializeApp } from "firebase/app";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// getApps() evita inicializar de novo a cada hot reload do `next dev`
export const app = getApps().length ? getApp() : initializeApp(config);
