"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { enviarAvaliacao, type EstadoAvaliacao } from "../actions";
import { COMENTARIO_MAX, NOME_MAX } from "../lib/limites";
import { Estrela } from "./icons";

const rotulos = ["", "Péssimo", "Ruim", "Regular", "Bom", "Excelente"];

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
  const [nota, setNota] = useState(0);
  const [destaque, setDestaque] = useState(0);
  const [caracteres, setCaracteres] = useState(estado.valores?.comentario.length ?? 0);
  const restantes = COMENTARIO_MAX - caracteres;
  const exibida = destaque || nota;

  useEffect(() => {
    if (estado.ok) onConcluido();
  }, [estado.ok, onConcluido]);

  return (
    <form action={acao} className="modal__form" noValidate>
      <div>
        <h2 id="modal-titulo">Deixe sua avaliação</h2>
        <p className="modal__sub">Conte como foi o atendimento para você e seu pet.</p>
      </div>

      <fieldset className="modal__notas" onMouseLeave={() => setDestaque(0)}>
        <legend>Sua nota</legend>
        <div className="modal__linha">
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} onMouseEnter={() => setDestaque(n)} className={n <= exibida ? "on" : undefined}>
              <input
                type="radio"
                name="nota"
                value={n}
                checked={nota === n}
                onChange={() => setNota(n)}
                aria-label={`${n} ${n === 1 ? "estrela" : "estrelas"} – ${rotulos[n]}`}
              />
              <Estrela size={36} />
            </label>
          ))}
          <span className="modal__rotulo" aria-hidden="true">
            {rotulos[exibida]}
          </span>
        </div>
        {estado.erros?.nota && <p className="modal__erro">{estado.erros.nota}</p>}
      </fieldset>

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
        <span>Comentário</span>
        <textarea
          name="comentario"
          rows={4}
          maxLength={COMENTARIO_MAX}
          defaultValue={estado.valores?.comentario}
          onChange={(e) => setCaracteres(e.target.value.length)}
          aria-describedby="contador-comentario"
          placeholder="O que achou do atendimento?"
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
        <button type="submit" className="modal__enviar" disabled={enviando || nota === 0}>
          {enviando ? "Enviando…" : "Enviar avaliação"}
        </button>
      </div>
    </form>
  );
}
