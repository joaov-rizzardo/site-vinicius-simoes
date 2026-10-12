import Image from "next/image";
import { redirect } from "next/navigation";
import { estaLogado, SENHA_DEMO } from "../sessao";
import FormLogin from "./FormLogin";

export default async function Login() {
  if (await estaLogado()) redirect("/admin");

  return (
    <main className="adm-login">
      <div className="adm-login__caixa">
        <Image src="/img/logo.png" alt="" width={64} height={76} className="adm-login__logo" />
        <h1>Área admin</h1>
        <p className="adm-login__sub">Moderação das avaliações do site</p>
        <FormLogin />
        {/* Só aparece enquanto ADMIN_SENHA não foi configurada */}
        {!process.env.ADMIN_SENHA && (
          <p className="adm-login__demo">
            Protótipo: use a senha <code>{SENHA_DEMO}</code>
          </p>
        )}
      </div>
    </main>
  );
}
