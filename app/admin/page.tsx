import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { contarPorStatus, listarAvaliacoes, type Avaliacao, type StatusAvaliacao } from "../lib/avaliacoes";
import { moderar, sair } from "./actions";
import { estaLogado } from "./sessao";

const abas: { status: StatusAvaliacao; rotulo: string; vazio: string }[] = [
  { status: "pendente", rotulo: "Pendentes", vazio: "Nenhuma avaliação aguardando aprovação." },
  { status: "aprovada", rotulo: "Aprovadas", vazio: "Nenhuma avaliação aprovada ainda." },
  { status: "recusada", rotulo: "Recusadas", vazio: "Nenhuma avaliação recusada." },
];

const dataHora = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "America/Sao_Paulo",
});

export default async function Admin({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  if (!(await estaLogado())) redirect("/admin/login");

  const { status: param } = await searchParams;
  const aba = abas.find((a) => a.status === param) ?? abas[0];
  const contagem = contarPorStatus();
  const avaliacoes = listarAvaliacoes(aba.status);

  return (
    <>
      <header className="adm-topo">
        <div className="adm-topo__inner">
          <Link href="/admin" className="adm-marca">
            <Image src="/img/logo.png" alt="" width={34} height={40} loading="eager" />
            <span>
              <strong>Área admin</strong>
              <small>Vinicius Vicente Simões</small>
            </span>
          </Link>
          <nav className="adm-topo__acoes" aria-label="Conta">
            <Link href="/#avaliacoes" target="_blank" className="adm-link">
              Ver site ↗
            </Link>
            <form action={sair}>
              <button type="submit" className="adm-link">
                Sair
              </button>
            </form>
          </nav>
        </div>
      </header>

      <main className="adm-main">
        <div className="adm-cabecalho">
          <h1>Avaliações</h1>
          <p>Avaliações enviadas pelo site só aparecem para os visitantes depois de aprovadas.</p>
        </div>

        <nav className="adm-abas" aria-label="Filtrar avaliações">
          {abas.map((a) => (
            <Link
              key={a.status}
              href={`/admin?status=${a.status}`}
              className={`adm-abas__item adm-abas__item--${a.status}`}
              aria-current={a.status === aba.status ? "page" : undefined}
            >
              {a.rotulo}
              <span className="adm-abas__contador">{contagem[a.status]}</span>
            </Link>
          ))}
        </nav>

        {avaliacoes.length === 0 ? (
          <p className="adm-vazio">{aba.vazio}</p>
        ) : (
          <ul className="adm-lista">
            {avaliacoes.map((a) => (
              <Card key={a.id} avaliacao={a} />
            ))}
          </ul>
        )}
      </main>
    </>
  );
}

function Card({ avaliacao: a }: { avaliacao: Avaliacao }) {
  return (
    <li className="adm-card">
      <div className="adm-card__topo">
        <div className="adm-card__avatar">
          {a.foto ? (
            <Image src={a.foto.src} alt={a.foto.alt} fill sizes="44px" />
          ) : (
            <span aria-hidden="true">{a.nome.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <div className="adm-card__quem">
          <strong>{a.nome}</strong>
          <time dateTime={a.criadaEm}>{dataHora.format(new Date(a.criadaEm))}</time>
        </div>
        <div className="adm-card__nota" role="img" aria-label={`${a.nota} de 5 estrelas`}>
          {"★".repeat(a.nota)}
          <span>{"★".repeat(5 - a.nota)}</span>
        </div>
      </div>

      <blockquote className="adm-card__texto">“{a.comentario}”</blockquote>

      <form action={moderar} className="adm-card__acoes">
        <input type="hidden" name="id" value={a.id} />
        {a.status !== "aprovada" && (
          <button type="submit" name="acao" value="aprovar" className="adm-botao adm-botao--verde">
            ✓ Aprovar
          </button>
        )}
        {a.status === "pendente" && (
          <button type="submit" name="acao" value="recusar" className="adm-botao adm-botao--contorno">
            Recusar
          </button>
        )}
        {a.status === "aprovada" && (
          <button type="submit" name="acao" value="pendente" className="adm-botao adm-botao--contorno">
            Tirar do site
          </button>
        )}
        {a.status === "recusada" && (
          <button type="submit" name="acao" value="excluir" className="adm-botao adm-botao--perigo">
            Excluir
          </button>
        )}
      </form>
    </li>
  );
}
