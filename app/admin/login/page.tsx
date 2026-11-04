import Image from "next/image";
import FormLogin from "./FormLogin";

export default function Login() {
  return (
    <main className="adm-login">
      <div className="adm-login__caixa">
        <Image src="/img/logo.png" alt="" width={64} height={76} className="adm-login__logo" />
        <h1>Área admin</h1>
        <p className="adm-login__sub">Moderação das avaliações do site</p>
        <FormLogin />
      </div>
    </main>
  );
}
