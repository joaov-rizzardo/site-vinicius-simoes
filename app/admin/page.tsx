import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  calcularMedias,
  contarPorStatus,
  listarAvaliacoes,
  type Avaliacao,
  type Medias,
  type StatusAvaliacao,
} from "../lib/avaliacoes";
import { formatarNota, mediaDasNotas, TOPICOS } from "../lib/topicos";
import { moderar, sair } from "./actions";
import { estaLogado } from "./sessao";

// "todas" não é um status: é a aba que lista tudo o que foi recebido
type Aba = StatusAvaliacao | "todas";

const abas: { status: Aba; rotulo: string; vazio: string }[] = [
  { status: "todas", rotulo: "Todas", vazio: "Nenhuma avaliação recebida ainda." },
  { status: "pendente", rotulo: "Pendentes", vazio: "Nenhuma avaliação aguardando aprovação." },
  { status: "aprovada", rotulo: "Aprovadas", vazio: "Nenhuma avaliação aprovada ainda." },
  { status: "recusada", rotulo: "Recusadas", vazio: "Nenhuma avaliação recusada." },
];

const nomeStatus: Record<StatusAvaliacao, string> = { pendente: "Pendente", aprovada: "No site", recusada: "Recusada" };

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
  const todas = contagem.pendente + contagem.aprovada + contagem.recusada;
  const avaliacoes = listarAvaliacoes(aba.status === "todas" ? undefined : aba.status);
  // Recusadas (spam, ofensas) não entram nas médias
  const medias = calcularMedias(listarAvaliacoes().filter((a) => a.status !== "recusada"));

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

        {medias && <PainelMedias medias={medias} />}

        <nav className="adm-abas" aria-label="Filtrar avaliações">
          {abas.map((a) => (
            <Link
              key={a.status}
              href={`/admin?status=${a.status}`}
              className={`adm-abas__item adm-abas__item--${a.status}`}
              aria-current={a.status === aba.status ? "page" : undefined}
            >
              {a.rotulo}
              <span className="adm-abas__contador">{a.status === "todas" ? todas : contagem[a.status]}</span>
            </Link>
          ))}
        </nav>

        {avaliacoes.length === 0 ? (
          <p className="adm-vazio">{aba.vazio}</p>
        ) : (
          <ul className="adm-lista">
            {avaliacoes.map((a) => (
              <Card key={a.id} avaliacao={a} mostrarStatus={aba.status === "todas"} />
            ))}
          </ul>
        )}
      </main>
    </>
  );
}

function PainelMedias({ medias }: { medias: Medias }) {
  return (
    <section className="adm-medias" aria-labelledby="adm-medias-titulo">
      <div className="adm-medias__geral">
        <h2 id="adm-medias-titulo">Média geral</h2>
        <strong>{formatarNota(medias.geral)}</strong>
        <small>
          {medias.total} {medias.total === 1 ? "avaliação" : "avaliações"} · aprovadas e pendentes
        </small>
      </div>
      <ul className="adm-medias__topicos" aria-label="Média por tópico">
        {TOPICOS.map((t) => {
          const valor = medias.porTopico[t.id];
          return (
            <li key={t.id}>
              <span className="adm-medias__nome">{t.nome}</span>
              <span className="adm-medias__trilho" aria-hidden="true">
                <span style={{ width: `${(valor / 5) * 100}%` }} />
              </span>
              <strong>{formatarNota(valor)}</strong>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Card({ avaliacao: a, mostrarStatus }: { avaliacao: Avaliacao; mostrarStatus: boolean }) {
  const media = mediaDasNotas(a.notas);
  return (
    <li className="adm-card">
      <div className="adm-card__topo">
        <div className="adm-card__avatar">
          <span aria-hidden="true">{a.nome.charAt(0).toUpperCase()}</span>
        </div>
        <div className="adm-card__quem">
          <strong>{a.nome}</strong>
          <time dateTime={a.criadaEm}>{dataHora.format(new Date(a.criadaEm))}</time>
        </div>
        {mostrarStatus && <span className={`adm-status adm-status--${a.status}`}>{nomeStatus[a.status]}</span>}
        <div className="adm-card__media" aria-label={`Média ${formatarNota(media)} de 5`}>
          <span aria-hidden="true">★</span>
          {formatarNota(media)}
        </div>
      </div>

      <blockquote className="adm-card__texto">“{a.comentario}”</blockquote>

      <dl className="adm-card__notas">
        {TOPICOS.map((t) => (
          <div key={t.id} className={a.notas[t.id] <= 3 ? "baixa" : undefined}>
            <dt>{t.nome}</dt>
            <dd>{a.notas[t.id]}</dd>
          </div>
        ))}
      </dl>

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
