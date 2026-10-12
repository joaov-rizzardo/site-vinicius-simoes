"use client";

import { Children, isValidElement, useCallback, useEffect, useRef, useState } from "react";
import { Seta } from "./icons";

// Trilho com scroll-snap: arrastar/deslizar funciona nativamente; setas e pontos navegam por página
export default function Carrossel({ children, rotulo }: { children: React.ReactNode; rotulo: string }) {
  const trilho = useRef<HTMLDivElement>(null);
  const itens = Children.toArray(children);
  const [pagina, setPagina] = useState(0);
  const [paginas, setPaginas] = useState(1);
  // Distância de um card ao próximo (largura + vão) e quantos cabem por página.
  // Medir pelos cards evita errar a conta por causa do vão: com a largura visível
  // como "página", a última posição caía perto do fim e o scroll-snap puxava de volta.
  const medida = useRef({ passo: 1, porPagina: 1 });

  const medir = useCallback(() => {
    const el = trilho.current;
    const cards = el ? (Array.from(el.children) as HTMLElement[]) : [];
    if (!el || cards.length === 0) return;
    const passo = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : cards[0].offsetWidth;
    const estilo = getComputedStyle(el);
    const util = el.clientWidth - parseFloat(estilo.paddingLeft) - parseFloat(estilo.paddingRight);
    const vao = passo - cards[0].offsetWidth;
    const porPagina = Math.max(1, Math.round((util + vao) / passo));
    medida.current = { passo, porPagina };

    // A última página pode ser parcial (4 cards com 3 por página = 2 páginas)
    const total = Math.ceil(cards.length / porPagina);
    setPaginas(total);
    const fim = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    setPagina(fim ? total - 1 : Math.min(total - 1, Math.round(el.scrollLeft / (passo * porPagina))));
  }, []);

  // Avaliação nova entra no início; o scroll-snap mantém o card antigo à vista e a esconderia,
  // então volta para o começo sempre que a lista cresce
  const qtdAnterior = useRef(itens.length);
  useEffect(() => {
    if (itens.length > qtdAnterior.current) trilho.current?.scrollTo({ left: 0 });
    qtdAnterior.current = itens.length;
  }, [itens.length]);

  useEffect(() => {
    const el = trilho.current;
    if (!el) return;
    medir();
    const obs = new ResizeObserver(medir);
    obs.observe(el);
    el.addEventListener("scroll", medir, { passive: true });
    return () => {
      obs.disconnect();
      el.removeEventListener("scroll", medir);
    };
  }, [medir, itens.length]);

  const irPara = (p: number) => {
    const el = trilho.current;
    const { passo, porPagina } = medida.current;
    // Leva ao primeiro card da página; no fim o navegador limita ao máximo da rolagem
    if (el) el.scrollTo({ left: p * porPagina * passo, behavior: "smooth" });
  };

  return (
    <div className="carrossel" role="region" aria-roledescription="carrossel" aria-label={rotulo}>
      <div ref={trilho} className="carrossel__trilho" tabIndex={0}>
        {itens.map((item, i) => (
          <div key={isValidElement(item) ? item.key : i} className="carrossel__item" role="group" aria-roledescription="slide" aria-label={`${i + 1} de ${itens.length}`}>
            {item}
          </div>
        ))}
      </div>

      {paginas > 1 && (
        <div className="carrossel__controles">
          <button
            type="button"
            className="carrossel__seta carrossel__seta--anterior"
            onClick={() => irPara(pagina - 1)}
            disabled={pagina === 0}
            aria-label="Avaliações anteriores"
          >
            <Seta />
          </button>
          <div className="carrossel__pontos">
            {Array.from({ length: paginas }, (_, p) => (
              <button
                key={p}
                type="button"
                className={p === pagina ? "ativo" : undefined}
                onClick={() => irPara(p)}
                aria-label={`Página ${p + 1} de ${paginas}`}
                aria-current={p === pagina}
              />
            ))}
          </div>
          <button
            type="button"
            className="carrossel__seta"
            onClick={() => irPara(pagina + 1)}
            disabled={pagina === paginas - 1}
            aria-label="Próximas avaliações"
          >
            <Seta />
          </button>
        </div>
      )}
    </div>
  );
}
