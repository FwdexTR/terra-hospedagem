"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { linkZap, MENSAGENS } from "@/lib/contato";
import { cn } from "@/lib/utils";

function IconeZap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.6-.92-2.2-.24-.58-.48-.5-.67-.5-.17 0-.37-.03-.57-.03-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23z" />
    </svg>
  );
}

/**
 * Botão fixo de WhatsApp. Aparece depois que a pessoa rola o primeiro terço
 * da tela, para não competir com a chamada principal do hero.
 * No desktop abre um rótulo ao passar o mouse.
 */
export function BotaoZap() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > 420);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <AnimatePresence>
      {visivel && (
        <motion.a
          href={linkZap(MENSAGENS.geral)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Conversar no WhatsApp com a Terra Hospedagem"
          initial={{ opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 16 }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "group fixed bottom-5 right-5 z-50 flex items-center gap-0 overflow-hidden",
            "rounded-full bg-[var(--zap)] text-[#06281a] shadow-[0_10px_32px_-6px_rgba(37,211,102,0.55)]",
            "sm:bottom-7 sm:right-7",
          )}
        >
          <span className="pulso-zap flex h-14 w-14 shrink-0 items-center justify-center rounded-full">
            <IconeZap className="h-7 w-7" />
          </span>
          {/* Rótulo que expande no hover — só em telas com ponteiro fino */}
          <span
            className={cn(
              "hidden max-w-0 whitespace-nowrap text-sm font-semibold",
              "transition-[max-width,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "group-hover:max-w-[15rem] group-hover:pr-6 group-focus-visible:max-w-[15rem] group-focus-visible:pr-6",
              "lg:block",
            )}
          >
            Falar com a recepção
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/** Botão de WhatsApp usado dentro do conteúdo (hero, seções, rodapé). */
export function LinkZap({
  mensagem,
  children,
  variante = "solido",
  className,
}: {
  mensagem: string;
  children: React.ReactNode;
  variante?: "solido" | "contorno" | "zap";
  className?: string;
}) {
  const estilos = {
    solido:
      "bg-destaque text-[var(--terra-900)] hover:bg-destaque-claro shadow-[0_8px_28px_-10px_var(--ouro-500)]",
    contorno:
      "border border-borda-forte text-texto hover:border-destaque hover:text-destaque",
    zap: "bg-[var(--zap)] text-[#06281a] hover:brightness-110 shadow-[0_8px_28px_-10px_rgba(37,211,102,0.7)]",
  }[variante];

  return (
    <a
      href={linkZap(mensagem)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5",
        "text-sm font-semibold tracking-wide transition-all duration-300",
        "hover:-translate-y-0.5 active:translate-y-0",
        estilos,
        className,
      )}
    >
      {variante === "zap" && <IconeZap className="h-[1.15rem] w-[1.15rem]" />}
      {children}
    </a>
  );
}
