"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { LinkZap } from "./BotaoZap";
import { MENSAGENS } from "@/lib/contato";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/#predios", texto: "Prédios" },
  { href: "/royal", texto: "Café da manhã" },
  { href: "/#incluso", texto: "O que está incluso" },
  { href: "/#empresas", texto: "Para empresas" },
  { href: "/#contato", texto: "Contato" },
];

export function Cabecalho() {
  const [rolou, setRolou] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // Trava a rolagem do corpo enquanto o menu está aberto
  useEffect(() => {
    document.body.style.overflow = menuAberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuAberto]);

  // Fecha o menu ao apertar Esc
  useEffect(() => {
    if (!menuAberto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuAberto(false);
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [menuAberto]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500",
          rolou ? "vidro border-b border-borda py-3" : "py-5",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" aria-label="Terra Hospedagem — início">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-[0.82rem] font-medium tracking-wide text-texto-suave transition-colors hover:text-texto"
              >
                {link.texto}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-destaque transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LinkZap
              mensagem={MENSAGENS.reserva}
              variante="solido"
              className="hidden px-6 py-2.5 text-[0.8rem] sm:inline-flex"
            >
              Reservar
            </LinkZap>

            <button
              type="button"
              onClick={() => setMenuAberto(true)}
              aria-label="Abrir menu"
              aria-expanded={menuAberto}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-borda-forte text-texto transition-colors hover:border-destaque hover:text-destaque lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuAberto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[var(--azul-950)] lg:hidden"
          >
            <div className="flex items-center justify-between px-5 py-5 sm:px-8">
              <Logo />
              <button
                type="button"
                onClick={() => setMenuAberto(false)}
                aria-label="Fechar menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-borda-forte text-texto"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-6 flex flex-col px-5 sm:px-8">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuAberto(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.06, duration: 0.4 }}
                  className="titulo border-b border-borda py-5 text-[1.8rem] text-texto"
                >
                  {link.texto}
                </motion.a>
              ))}
            </nav>

            <div className="px-5 pt-9 sm:px-8">
              <LinkZap
                mensagem={MENSAGENS.reserva}
                variante="solido"
                className="w-full py-4 text-base"
              >
                Reservar pelo WhatsApp
              </LinkZap>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
