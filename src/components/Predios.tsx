"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { Check, Expand, MapPin } from "lucide-react";
import { Lightbox } from "./Lightbox";
import { Revelar } from "./Revelar";
import { LinkZap } from "./BotaoZap";
import { MENSAGENS } from "@/lib/contato";
import { CIDADE, PREDIOS, type Predio } from "@/data/predios";
import { cn } from "@/lib/utils";

export function Predios() {
  const [ativo, setAtivo] = useState(PREDIOS[0].slug);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const predio = PREDIOS.find((p) => p.slug === ativo) ?? PREDIOS[0];

  return (
    <section id="predios" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Revelar>
          <p className="eyebrow">Onde você fica</p>
          <h2 className="titulo mt-4 max-w-2xl text-[clamp(2rem,5vw,3.4rem)] text-texto">
            Quatro prédios, quatro perfis de estadia.
          </h2>
          <p className="mt-5 max-w-xl text-texto-suave">
            Todos em {CIDADE}, todos mobiliados e prontos para uso. A diferença
            está no tamanho, na estrutura e no preço. Escolha o que combina com
            a sua viagem.
          </p>
        </Revelar>

        {/* Seletor de prédios */}
        <Revelar atraso={0.1}>
          <div
            role="tablist"
            aria-label="Prédios da Terra Hospedagem"
            className="mt-12 flex gap-2 overflow-x-auto pb-2"
          >
            {PREDIOS.map((p) => {
              const selecionado = p.slug === ativo;
              return (
                <button
                  key={p.slug}
                  role="tab"
                  type="button"
                  aria-selected={selecionado}
                  onClick={() => {
                    setAtivo(p.slug);
                    setLightbox(null);
                  }}
                  className={cn(
                    "relative shrink-0 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300",
                    selecionado
                      ? "text-[var(--terra-900)]"
                      : "border border-borda text-texto-suave hover:border-borda-forte hover:text-texto",
                  )}
                >
                  {selecionado && (
                    <motion.span
                      layoutId="pilula-predio"
                      className="absolute inset-0 rounded-full bg-destaque"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{p.nome}</span>
                </button>
              );
            })}
          </div>
        </Revelar>

        {/* Painel do prédio selecionado */}
        <motion.div
          key={predio.slug}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14"
        >
          <GaleriaPredio predio={predio} aoAbrir={setLightbox} />
          <FichaPredio predio={predio} />
        </motion.div>
      </div>

      <Lightbox
        fotos={predio.fotos}
        indice={lightbox}
        aoFechar={() => setLightbox(null)}
        aoTrocar={setLightbox}
        legenda={predio.nome}
      />
    </section>
  );
}

/** Mosaico de fotos: a primeira ocupa destaque, as demais formam a grade. */
function GaleriaPredio({
  predio,
  aoAbrir,
}: {
  predio: Predio;
  aoAbrir: (i: number) => void;
}) {
  const [principal, ...resto] = predio.fotos;
  if (!principal) return null;

  return (
    <div className="grid gap-3">
      <button
        type="button"
        onClick={() => aoAbrir(0)}
        className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-borda"
      >
        <Image
          src={principal.src}
          alt={`${predio.nome} — ${predio.chamada}`}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          placeholder="blur"
          blurDataURL={principal.blur}
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-[var(--terra-900)]/70 via-transparent to-transparent" />
        <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-[var(--terra-900)]/75 px-4 py-2 text-[0.72rem] font-medium tracking-wide text-areia-100 backdrop-blur">
          <Expand className="h-3.5 w-3.5 text-destaque" />
          Ver as {predio.fotos.length} fotos
        </span>
      </button>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {resto.slice(0, 7).map((foto, i) => (
          <button
            key={foto.src}
            type="button"
            onClick={() => aoAbrir(i + 1)}
            aria-label={`Abrir foto ${i + 2} do ${predio.nome}`}
            className="group relative aspect-square overflow-hidden rounded-xl border border-borda"
          >
            <Image
              src={foto.src}
              alt={`${predio.nome} — foto ${i + 2}`}
              fill
              sizes="(max-width: 640px) 33vw, 15vw"
              placeholder="blur"
              blurDataURL={foto.blur}
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            />
            <span className="absolute inset-0 bg-[var(--terra-900)]/25 transition-opacity duration-500 group-hover:opacity-0" />
          </button>
        ))}

        {resto.length > 7 && (
          <button
            type="button"
            onClick={() => aoAbrir(8)}
            className="flex aspect-square items-center justify-center rounded-xl border border-borda-forte text-center text-[0.76rem] font-medium leading-tight text-texto-suave transition-colors hover:border-destaque hover:text-destaque"
          >
            +{resto.length - 7}
            <br />
            fotos
          </button>
        )}
      </div>
    </div>
  );
}

function FichaPredio({ predio }: { predio: Predio }) {
  return (
    <div className="flex flex-col rounded-2xl border border-borda bg-[var(--terra-850)] p-7">
      <p className="eyebrow">{predio.subtitulo}</p>
      <h3 className="titulo mt-3 text-[2rem] text-texto">{predio.nome}</h3>
      <p className="mt-1.5 text-sm font-medium text-destaque">{predio.chamada}</p>

      <p className="mt-5 text-[0.92rem] leading-relaxed text-texto-suave">
        {predio.descricao}
      </p>

      <ul className="mt-6 space-y-2.5">
        {predio.destaques.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-texto-suave">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-destaque" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-borda pt-5">
        <p className="text-[0.7rem] uppercase tracking-[0.16em] text-texto-fraco">
          Indicado para
        </p>
        <p className="mt-1.5 text-sm text-texto-suave">{predio.perfil}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {predio.comodidades.map((item) => (
          <span
            key={item}
            className="rounded-full border border-borda px-3 py-1 text-[0.72rem] text-texto-fraco"
          >
            {item}
          </span>
        ))}
      </div>

      <p className="mt-6 flex items-center gap-1.5 text-[0.78rem] text-texto-fraco">
        <MapPin className="h-3.5 w-3.5 text-destaque" />
        {predio.endereco ?? CIDADE} · RJ
      </p>

      <LinkZap
        mensagem={MENSAGENS.predio(predio.nome)}
        variante="zap"
        className="mt-6 w-full py-3.5"
      >
        Consultar o {predio.nome}
      </LinkZap>
    </div>
  );
}
