"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Revelar } from "./Revelar";
import { Lightbox } from "./Lightbox";
import { ICONES } from "@/lib/icones";
import { useMontado } from "@/lib/useMontado";
import type { AreaComum } from "@/data/predios";

/**
 * Área comum de um prédio: rooftop com café da manhã no Royal, lazer no Via
 * Park. Recebe o conteúdo por prop porque cada unidade tem a sua — e prédios
 * sem área comum simplesmente não renderizam esta seção.
 */
export function AreaComumSecao({
  area,
  nomePredio,
  /** Quando presente, mostra um link para a página do prédio — usado na home,
   *  onde a seção aparece fora do contexto da unidade. */
  href,
}: {
  area: AreaComum;
  nomePredio: string;
  href?: string;
}) {
  const referencia = useRef<HTMLElement>(null);
  const semMovimento = useReducedMotion();
  const montado = useMontado();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: referencia,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    semMovimento ? ["0%", "0%"] : ["-6%", "6%"],
  );

  const [destaque, ...demais] = area.fotos;

  return (
    <section
      ref={referencia}
      id="area-comum"
      className="grao relative scroll-mt-24 overflow-hidden border-y border-borda bg-[var(--azul-900)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Revelar>
              <p className="eyebrow">{area.rotulo}</p>
              <h2 className="titulo mt-4 text-[clamp(1.9rem,4.6vw,3.2rem)] text-texto">
                {area.titulo}{" "}
                <span className="text-destaque">{area.destaque}</span>.
              </h2>
              <p className="mt-5 max-w-lg text-texto-suave">{area.texto}</p>
            </Revelar>

            <ul className="mt-10 space-y-7">
              {area.itens.map((item, i) => {
                const Icone = ICONES[item.icone];
                return (
                  <Revelar as="li" key={item.titulo} atraso={0.08 * i}>
                    <div className="flex gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-borda-forte text-destaque">
                        <Icone className="h-[1.15rem] w-[1.15rem]" />
                      </span>
                      <div>
                        <h3 className="font-semibold text-texto">
                          {item.titulo}
                        </h3>
                        <p className="mt-1 text-[0.92rem] leading-relaxed text-texto-suave">
                          {item.texto}
                        </p>
                      </div>
                    </div>
                  </Revelar>
                );
              })}
            </ul>

            {href && (
              <Revelar atraso={0.24}>
                <Link
                  href={href}
                  className="mt-9 inline-flex items-center gap-2 rounded-full border border-borda-forte px-6 py-3 text-sm font-semibold text-texto transition-all duration-300 hover:-translate-y-0.5 hover:border-destaque hover:text-destaque"
                >
                  Ver o {nomePredio}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Revelar>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {destaque && (
              <motion.button
                type="button"
                onClick={() => setLightbox(0)}
                style={montado ? { y } : undefined}
                className="group relative col-span-2 aspect-[4/3] overflow-hidden rounded-2xl border border-borda"
              >
                <Image
                  src={destaque.src}
                  alt={`Área comum do ${nomePredio}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  placeholder="blur"
                  blurDataURL={destaque.blur}
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </motion.button>
            )}

            {demais.slice(0, 4).map((foto, i) => (
              <Revelar key={foto.src} atraso={0.05 * i}>
                <button
                  type="button"
                  onClick={() => setLightbox(i + 1)}
                  aria-label={`Abrir foto ${i + 2} da área comum`}
                  className="group relative block aspect-square w-full overflow-hidden rounded-xl border border-borda"
                >
                  <Image
                    src={foto.src}
                    alt={`Área comum do ${nomePredio} — foto ${i + 2}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 22vw"
                    placeholder="blur"
                    blurDataURL={foto.blur}
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  />
                </button>
              </Revelar>
            ))}
          </div>
        </div>
      </div>

      <Lightbox
        fotos={area.fotos}
        indice={lightbox}
        aoFechar={() => setLightbox(null)}
        aoTrocar={setLightbox}
        legenda={`${nomePredio} — área comum`}
      />
    </section>
  );
}
