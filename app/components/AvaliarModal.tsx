"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { enviarAvaliacao, type EstadoAvaliacao } from "../actions";
import { COMENTARIO_MAX, NOME_MAX } from "../lib/limites";
import { ROTULOS_NOTA, TOPICOS, type Notas, type TopicoId } from "../lib/topicos";
import { Estrela } from "./icons";

export default function AvaliarModal() {
  const dialogo = useRef<HTMLDialogElement>(null);
  const [enviado, setEnviado] = useState(false);
  // Trocar a key remonta o formulário e zera o estado da action
  const [tentativa, setTentativa] = useState(0);

  const fechar = () => dialogo.current?.close();

  return (
    <>
      <button
        type="button"
        className="aval__botao"
        onClick={() => {
          setEnviado(false);
          setTentativa((t) => t + 1);
          dialogo.current?.showModal();
        }}
      >
        <Estrela size={18} />
        Deixe sua avaliação
      </button>

      <dialog
        ref={dialogo}
        className="modal"
        aria-labelledby="modal-titulo"
        // Clique no fundo escurecido fecha o modal
        onClick={(e) => e.target === e.currentTarget && fechar()}
      >
        <div className="modal__caixa">
          <button type="button" className="modal__fechar" onClick={fechar} aria-label="Fechar">
            ×
          </button>
          {enviado ? (
            <div className="modal__obrigado" role="status">
              <span className="modal__estrelas" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Estrela key={i} size={26} />
                ))}
              </span>
              <h2 id="modal-titulo">Obrigado pela avaliação!</h2>
              <p>Ela será publicada no site assim que for aprovada.</p>
              <button type="button" className="modal__enviar" onClick={fechar}>
                Fechar
              </button>
            </div>
          ) : (
            <Formulario key={tentativa} onCancelar={fechar} onConcluido={() => setEnviado(true)} />
          )}
        </div>
      </dialog>
    </>
  );
}

function Formulario({ onCancelar, onConcluido }: { onCancelar: () => void; onConcluido: () => void }) {
  const [estado, acao, enviando] = useActionState<EstadoAvaliacao, FormData>(enviarAvaliacao, { ok: false });
  const [notas, setNotas] = useState<Partial<Notas>>({});
  const [caracteres, setCaracteres] = useState(estado.valores?.comentario.length ?? 0);
  const restantes = COMENTARIO_MAX - caracteres;
  const respondidos = Object.keys(notas).length;
  const completo = respondidos === TOPICOS.length;

  useEffect(() => {
    if (estado.ok) onConcluido();
  }, [estado.ok, onConcluido]);

  return (
    <form action={acao} className="modal__form" noValidate>
      <div>
        <h2 id="modal-titulo">Deixe sua avaliação</h2>
        <p className="modal__sub">Dê sua nota para os dois tópicos abaixo e escreva sua avaliação pessoal do atendimento.</p>
      </div>

      <div className="modal__topicos">
        <div className="modal__topicos-topo">
          <span>Sua nota por tópico</span>
          <small className={completo ? "completo" : undefined}>
            {respondidos} de {TOPICOS.length}
          </small>
        </div>
        {TOPICOS.map((t) => (
          <NotaTopico
            key={t.id}
            id={t.id}
            nome={t.nome}
            dica={t.dica}
            nota={notas[t.id] ?? 0}
            onEscolher={(n) => setNotas((atual) => ({ ...atual, [t.id]: n }))}
          />
        ))}
        {estado.erros?.notas && <p className="modal__erro">{estado.erros.notas}</p>}
      </div>

      <label className="modal__campo">
        <span>Seu nome</span>
        <input
          name="nome"
          defaultValue={estado.valores?.nome}
          maxLength={NOME_MAX}
          autoComplete="name"
          placeholder="Ex.: Ana P."
          aria-invalid={!!estado.erros?.nome}
        />
        {estado.erros?.nome && <p className="modal__erro">{estado.erros.nome}</p>}
      </label>

      <label className="modal__campo">
        <span>Sua avaliação pessoal</span>
        <textarea
          name="comentario"
          rows={4}
          maxLength={COMENTARIO_MAX}
          defaultValue={estado.valores?.comentario}
          onChange={(e) => setCaracteres(e.target.value.length)}
          aria-describedby="contador-comentario"
          placeholder="O que achou do atendimento? O que mais marcou?"
          aria-invalid={!!estado.erros?.comentario}
        />
        <small id="contador-comentario" className={`modal__contador${restantes <= 20 ? " modal__contador--fim" : ""}`}>
          {caracteres}/{COMENTARIO_MAX}
        </small>
        {estado.erros?.comentario && <p className="modal__erro">{estado.erros.comentario}</p>}
      </label>

      <div className="modal__acoes">
        <button type="button" className="modal__cancelar" onClick={onCancelar}>
          Cancelar
        </button>
        <button type="submit" className="modal__enviar" disabled={enviando || !completo}>
          {enviando ? "Enviando…" : "Enviar avaliação"}
        </button>
      </div>
    </form>
  );
}

// Uma linha de 5 estrelas (grupo de rádio) para um tópico
function NotaTopico({
  id,
  nome,
  dica,
  nota,
  onEscolher,
}: {
  id: TopicoId;
  nome: string;
  dica: string;
  nota: number;
  onEscolher: (n: number) => void;
}) {
  const [destaque, setDestaque] = useState(0);
  const exibida = destaque || nota;

  return (
    <fieldset className="modal__notas" aria-describedby={`dica-${id}`}>
      <legend>{nome}</legend>
      <small id={`dica-${id}`} className="modal__dica">
        {dica}
      </small>
      <div className="modal__linha" onMouseLeave={() => setDestaque(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <label key={n} onMouseEnter={() => setDestaque(n)} className={n <= exibida ? "on" : undefined}>
            <input
              type="radio"
              name={`nota-${id}`}
              value={n}
              checked={nota === n}
              onChange={() => onEscolher(n)}
              aria-label={`${n} ${n === 1 ? "estrela" : "estrelas"} – ${ROTULOS_NOTA[n]}`}
            />
            <Estrela size={28} />
          </label>
        ))}
        <span className="modal__rotulo" aria-hidden="true">
          {ROTULOS_NOTA[exibida]}
        </span>
      </div>
    </fieldset>
  );
}
