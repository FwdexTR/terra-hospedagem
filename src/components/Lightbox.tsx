"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Foto } from "@/data/predios";

type Props = {
  fotos: Foto[];
  indice: number | null;
  aoFechar: () => void;
  aoTrocar: (indice: number) => void;
  legenda?: string;
};

export function Lightbox({ fotos, indice, aoFechar, aoTrocar, legenda }: Props) {
  const aberto = indice !== null;

  const anterior = useCallback(() => {
    if (indice === null) return;
    aoTrocar((indice - 1 + fotos.length) % fotos.length);
  }, [indice, fotos.length, aoTrocar]);

  const proxima = useCallback(() => {
    if (indice === null) return;
    aoTrocar((indice + 1) % fotos.length);
  }, [indice, fotos.length, aoTrocar]);

  // Teclado: Esc fecha, setas navegam
  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") aoFechar();
      if (e.key === "ArrowLeft") anterior();
      if (e.key === "ArrowRight") proxima();
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberto, aoFechar, anterior, proxima]);

  // Impede a página de rolar por trás do lightbox
  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  const foto = indice !== null ? fotos[indice] : null;

  return (
    <AnimatePresence>
      {aberto && foto && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={legenda ? `Galeria — ${legenda}` : "Galeria de fotos"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={aoFechar}
          className="fixed inset-0 z-[60] flex flex-col bg-[var(--azul-950)]/96 backdrop-blur-md"
        >
          {/* Barra superior */}
          <div className="flex shrink-0 items-center justify-between px-5 py-4 sm:px-8">
            <p className="text-[0.78rem] tracking-wide text-texto-fraco">
              {legenda ? `${legenda} · ` : ""}
              {indice + 1} de {fotos.length}
            </p>
            <button
              type="button"
              onClick={aoFechar}
              aria-label="Fechar galeria"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-borda-forte text-texto transition-colors hover:border-destaque hover:text-destaque"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Imagem */}
          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-3 sm:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={foto.src}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full w-full"
              >
                <Image
                  src={foto.src}
                  alt={legenda ? `${legenda} — foto ${indice + 1}` : `Foto ${indice + 1}`}
                  fill
                  sizes="100vw"
                  placeholder="blur"
                  blurDataURL={foto.blur}
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={anterior}
              aria-label="Foto anterior"
              className="absolute left-1 flex h-12 w-12 items-center justify-center rounded-full border border-borda-forte bg-[var(--azul-950)]/70 text-texto backdrop-blur transition-colors hover:border-destaque hover:text-destaque sm:left-3"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={proxima}
              aria-label="Próxima foto"
              className="absolute right-1 flex h-12 w-12 items-center justify-center rounded-full border border-borda-forte bg-[var(--azul-950)]/70 text-texto backdrop-blur transition-colors hover:border-destaque hover:text-destaque sm:right-3"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Miniaturas */}
          <div
            className="flex shrink-0 gap-2 overflow-x-auto px-5 pb-5 sm:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            {fotos.map((f, i) => (
              <button
                key={f.src}
                type="button"
                onClick={() => aoTrocar(i)}
                aria-label={`Ver foto ${i + 1}`}
                aria-current={i === indice}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md transition-all duration-300 ${
                  i === indice
                    ? "opacity-100 ring-2 ring-destaque"
                    : "opacity-40 hover:opacity-80"
                }`}
              >
                <Image
                  src={f.src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
