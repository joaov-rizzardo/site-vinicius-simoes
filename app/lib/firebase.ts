// SDK web do Firebase: a mesma instância serve o servidor (leituras públicas e envio de avaliações)
// e o navegador (área admin logada). Quem protege os dados são as regras em firestore.rules.
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// getApps() evita inicializar de novo a cada hot reload do `next dev`
export const app = getApps().length ? getApp() : initializeApp(config);
export const db = getFirestore(app);
