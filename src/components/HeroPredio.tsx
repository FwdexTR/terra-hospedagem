"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ChevronLeft, MapPin } from "lucide-react";
import { RevelarPalavras } from "./Revelar";
import { LinkZap } from "./BotaoZap";
import { MENSAGENS } from "@/lib/contato";
import { useMontado } from "@/lib/useMontado";
import { CIDADE, ESTADO, type Predio } from "@/data/predios";

export function HeroPredio({ predio }: { predio: Predio }) {
  const referencia = useRef<HTMLElement>(null);
  const semMovimento = useReducedMotion();
  const montado = useMontado();

  const { scrollYProgress } = useScroll({
    target: referencia,
    offset: ["start start", "end start"],
  });
  const yFundo = useTransform(scrollYProgress, [0, 1], [
    "0%",
    semMovimento ? "0%" : "16%",
  ]);
  const escala = useTransform(scrollYProgress, [0, 1], [
    1,
    semMovimento ? 1 : 1.1,
  ]);

  const capa = predio.fotos[0];

  return (
    <section
      ref={referencia}
      id="topo"
      className="grao relative isolate flex min-h-[78svh] items-end overflow-hidden"
    >
      <motion.div
        style={montado ? { y: yFundo, scale: escala } : undefined}
        className="absolute inset-0 z-0"
      >
        {capa && (
          <Image
            src={capa.src}
            alt={`${predio.nome} — ${predio.chamada}`}
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={capa.blur}
            className="object-cover object-center"
          />
        )}
      </motion.div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[var(--azul-950)] via-[var(--azul-950)]/72 to-[var(--azul-950)]/30" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[var(--azul-950)]/90 via-[var(--azul-950)]/35 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex flex-wrap items-center gap-3"
        >
          <Link
            href="/#predios"
            className="inline-flex items-center gap-1.5 rounded-full border border-borda-forte bg-[var(--azul-950)]/60 px-4 py-1.5 text-[0.72rem] font-medium text-off-white backdrop-blur-sm transition-colors hover:border-destaque hover:text-destaque"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Todos os prédios
          </Link>
          <span className="inline-flex items-center gap-2 rounded-full border border-borda-forte bg-[var(--azul-950)]/60 px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-off-white backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5 text-destaque" />
            {predio.endereco ?? CIDADE} · {ESTADO}
          </span>
        </motion.div>

        <p className="eyebrow">{predio.subtitulo}</p>

        <h1 className="titulo mt-3 text-[clamp(2.4rem,8vw,5rem)] text-texto">
          <RevelarPalavras texto={predio.nome} atraso={0.1} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-3 text-lg font-medium text-destaque sm:text-xl"
        >
          {predio.chamada}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-off-white/90 sm:text-base"
        >
          {predio.descricao}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <LinkZap
            mensagem={MENSAGENS.predio(predio.nome)}
            variante="solido"
            className="px-8 py-4"
          >
            Consultar o {predio.nome}
          </LinkZap>
          <a
            href="#fotos"
            className="inline-flex items-center justify-center rounded-full border border-borda-forte px-7 py-4 text-sm font-semibold text-texto transition-all duration-300 hover:-translate-y-0.5 hover:border-destaque hover:text-destaque"
          >
            Ver as {predio.fotos.length} fotos
          </a>
        </motion.div>
      </div>
    </section>
  );
}
