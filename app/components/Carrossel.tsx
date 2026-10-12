"use client";

import { Children, isValidElement, useCallback, useEffect, useRef, useState } from "react";
import { Seta } from "./icons";

// Trilho com scroll-snap: arrastar/deslizar funciona nativamente; setas e pontos navegam por página
export default function Carrossel({ children, rotulo }: { children: React.ReactNode; rotulo: string }) {
  const trilho = useRef<HTMLDivElement>(null);
  const itens = Children.toArray(children);
  const [pagina, setPagina] = useState(0);
  const [paginas, setPaginas] = useState(1);

  const medir = useCallback(() => {
    const el = trilho.current;
    if (!el) return;
    // Qualquer sobra além da área visível conta como uma página a mais (4 cards com 3 por página = 2 páginas)
    const sobra = el.scrollWidth - el.clientWidth;
    const total = 1 + Math.max(0, Math.ceil((sobra - 4) / el.clientWidth));
    setPaginas(total);
    // No fim do trilho a última página pode ser parcial: arredonda para ela
    const fim = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    setPagina(fim ? total - 1 : Math.round(el.scrollLeft / el.clientWidth));
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
    if (el) el.scrollTo({ left: p * el.clientWidth, behavior: "smooth" });
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
