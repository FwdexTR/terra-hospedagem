"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDown, MapPin } from "lucide-react";
import { RevelarPalavras } from "./Revelar";
import { LinkZap } from "./BotaoZap";
import { MENSAGENS } from "@/lib/contato";
import { CIDADE, ESTADO, ROOFTOP } from "@/data/predios";
import { useMontado } from "@/lib/useMontado";

const NUMEROS = [
  { valor: "4", rotulo: "prédios na cidade" },
  { valor: "100%", rotulo: "apartamentos mobiliados" },
  { valor: "Todo dia", rotulo: "café da manhã no rooftop" },
];

export function Hero() {
  const referencia = useRef<HTMLElement>(null);
  const semMovimento = useReducedMotion();
  const montado = useMontado();

  const { scrollYProgress } = useScroll({
    target: referencia,
    offset: ["start start", "end start"],
  });

  // Parallax: o fundo sobe mais devagar que o conteúdo.
  // Quem pede menos movimento recebe um range achatado em vez de uma árvore
  // diferente — assim o HTML do servidor e o do cliente continuam iguais.
  const yFundo = useTransform(scrollYProgress, [0, 1], [
    "0%",
    semMovimento ? "0%" : "18%",
  ]);
  const escala = useTransform(scrollYProgress, [0, 1], [
    1,
    semMovimento ? 1 : 1.12,
  ]);
  const opacidadeConteudo = useTransform(scrollYProgress, [0, 0.75], [
    1,
    semMovimento ? 1 : 0,
  ]);

  const capa = ROOFTOP[0];

  return (
    <section
      ref={referencia}
      id="topo"
      className="grao relative isolate flex min-h-[100svh] items-end overflow-hidden"
    >
      {/* Fundo */}
      <motion.div
        style={montado ? { y: yFundo, scale: escala } : undefined}
        className="absolute inset-0 z-0"
      >
        {capa && (
          <Image
            src={capa.src}
            alt="Pôr do sol visto do rooftop da Terra Hospedagem, com mesa posta para o café da manhã"
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={capa.blur}
            className="object-cover object-center"
          />
        )}
      </motion.div>

      {/* Camadas de escurecimento — garantem contraste do texto sobre a foto */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[var(--azul-950)] via-[var(--azul-950)]/70 to-[var(--azul-950)]/25" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[var(--azul-950)]/90 via-[var(--azul-950)]/35 to-transparent" />

      <motion.div
        style={montado ? { opacity: opacidadeConteudo } : undefined}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-10 pt-24 sm:px-8 sm:pb-20 sm:pt-32"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-borda-forte bg-[var(--azul-950)]/60 px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-off-white backdrop-blur-sm"
        >
          <MapPin className="h-3.5 w-3.5 text-destaque" />
          {CIDADE} · {ESTADO}
        </motion.p>

        <h1 className="titulo max-w-4xl text-[clamp(2.1rem,6.6vw,4.6rem)] text-texto">
          <RevelarPalavras texto="Um apartamento pronto" atraso={0.15} />
          <br />
          <span className="text-destaque">
            <RevelarPalavras texto="esperando por você." atraso={0.42} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-off-white/90 sm:mt-7 sm:text-lg"
        >
          Quatro prédios em {CIDADE} com apartamentos mobiliados, cozinha
          equipada e enxoval incluso. Você chega com a mala e já está em casa —
          por uma diária, um mês ou o tempo que o projeto durar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9"
        >
          <LinkZap mensagem={MENSAGENS.reserva} variante="solido" className="px-8 py-4">
            Consultar disponibilidade
          </LinkZap>
          <a
            href="#predios"
            className="inline-flex items-center justify-center gap-2.5 rounded-full border border-borda-forte px-7 py-4 text-sm font-semibold tracking-wide text-texto transition-all duration-300 hover:-translate-y-0.5 hover:border-destaque hover:text-destaque"
          >
            Conhecer os prédios
          </a>
        </motion.div>

        {/* Números */}
        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-9 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-xl border border-borda sm:mt-14"
        >
          {NUMEROS.map((item) => (
            <div
              key={item.rotulo}
              className="bg-[var(--azul-950)]/55 px-3 py-3.5 backdrop-blur-sm sm:px-5 sm:py-4"
            >
              <dt className="titulo text-lg text-destaque sm:text-[1.7rem]">
                {item.valor}
              </dt>
              <dd className="mt-1 text-[0.68rem] leading-snug text-texto-fraco sm:text-[0.78rem]">
                {item.rotulo}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Seta de rolagem */}
      <motion.a
        href="#predios"
        aria-label="Ir para os prédios"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-6 right-5 z-10 hidden h-11 w-11 items-center justify-center rounded-full border border-borda-forte text-texto-suave transition-colors hover:border-destaque hover:text-destaque sm:right-8 lg:flex"
      >
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
