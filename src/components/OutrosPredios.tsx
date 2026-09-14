import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Revelar } from "./Revelar";
import { outrosPredios } from "@/data/predios";

/** Navegação para as outras unidades, no fim da página de cada prédio. */
export function OutrosPredios({ slugAtual }: { slugAtual: string }) {
  const predios = outrosPredios(slugAtual);

  return (
    <section className="relative border-t border-borda py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Revelar>
          <p className="eyebrow">Outras unidades</p>
          <h2 className="titulo mt-4 text-[clamp(1.7rem,4vw,2.6rem)] text-texto">
            Conheça os outros prédios.
          </h2>
        </Revelar>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {predios.map((p, i) => (
            <Revelar key={p.slug} atraso={0.06 * i}>
              <Link
                href={`/${p.slug}`}
                className="group block overflow-hidden rounded-2xl border border-borda transition-colors hover:border-destaque"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {p.fotos[0] && (
                    <Image
                      src={p.fotos[0].src}
                      alt={p.nome}
                      fill
                      sizes="(max-width: 640px) 100vw, 30vw"
                      placeholder="blur"
                      blurDataURL={p.fotos[0].blur}
                      className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                  )}
                  <span className="absolute inset-0 bg-gradient-to-t from-[var(--azul-950)]/80 to-transparent" />
                </div>
                <div className="flex items-center justify-between gap-3 bg-[var(--azul-900)] px-5 py-4">
                  <span>
                    <span className="block font-semibold text-texto">
                      {p.nome}
                    </span>
                    <span className="block text-[0.78rem] text-texto-fraco">
                      {p.chamada}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-destaque transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}
