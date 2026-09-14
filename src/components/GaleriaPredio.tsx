"use client";

import Image from "next/image";
import { useState } from "react";
import { Check } from "lucide-react";
import { Lightbox } from "./Lightbox";
import { Revelar } from "./Revelar";
import { LinkZap } from "./BotaoZap";
import { MENSAGENS } from "@/lib/contato";
import type { Predio } from "@/data/predios";

/** Galeria completa da página do prédio, com a ficha ao lado. */
export function GaleriaPredio({ predio }: { predio: Predio }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="fotos" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-14">
          <div>
            <Revelar>
              <p className="eyebrow">Por dentro</p>
              <h2 className="titulo mt-4 text-[clamp(1.8rem,4.2vw,2.8rem)] text-texto">
                Como é o apartamento.
              </h2>
            </Revelar>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {predio.fotos.map((foto, i) => (
                <Revelar key={foto.src} atraso={0.03 * (i % 6)}>
                  <button
                    type="button"
                    onClick={() => setLightbox(i)}
                    aria-label={`Abrir foto ${i + 1} do ${predio.nome}`}
                    className="group relative block aspect-square w-full overflow-hidden rounded-xl border border-borda"
                  >
                    <Image
                      src={foto.src}
                      alt={`${predio.nome} — foto ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      placeholder="blur"
                      blurDataURL={foto.blur}
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                    />
                    <span className="absolute inset-0 bg-[var(--azul-950)]/20 transition-opacity duration-500 group-hover:opacity-0" />
                  </button>
                </Revelar>
              ))}
            </div>
          </div>

          {/* Ficha — acompanha a rolagem no desktop */}
          <Revelar>
            <div className="lg:sticky lg:top-28">
              <div className="rounded-2xl border border-borda bg-[var(--azul-900)] p-7">
                <p className="eyebrow">{predio.subtitulo}</p>
                <h3 className="titulo mt-3 text-[1.8rem] text-texto">
                  {predio.nome}
                </h3>

                <ul className="mt-6 space-y-2.5">
                  {predio.destaques.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-texto-suave"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-destaque" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-borda pt-5">
                  <p className="text-[0.7rem] uppercase tracking-[0.16em] text-texto-fraco">
                    Indicado para
                  </p>
                  <p className="mt-1.5 text-sm text-texto-suave">
                    {predio.perfil}
                  </p>
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

                <LinkZap
                  mensagem={MENSAGENS.predio(predio.nome)}
                  variante="solido"
                  className="mt-6 w-full py-3.5"
                >
                  Consultar valores
                </LinkZap>
              </div>
            </div>
          </Revelar>
        </div>
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
