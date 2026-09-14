import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Revelar } from "./Revelar";
import { CIDADE, PREDIOS } from "@/data/predios";

/**
 * Vitrine dos quatro prédios na home. Cada card leva à página da unidade, em
 * vez de trocar o conteúdo no lugar: assim tudo o que a pessoa vê depois de
 * clicar é daquele prédio, e o link de cada um pode ser mandado no WhatsApp.
 */
export function Predios() {
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

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {PREDIOS.map((predio, i) => (
            <Revelar key={predio.slug} atraso={0.06 * i}>
              <Link
                href={`/${predio.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-borda bg-[var(--azul-900)] transition-all duration-500 hover:-translate-y-1 hover:border-destaque"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {predio.fotos[0] && (
                    <Image
                      src={predio.fotos[0].src}
                      alt={`${predio.nome} — ${predio.chamada}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 45vw"
                      placeholder="blur"
                      blurDataURL={predio.fotos[0].blur}
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                  )}
                  <span className="absolute inset-0 bg-gradient-to-t from-[var(--azul-950)]/85 via-transparent to-transparent" />

                  <span className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3">
                    <span>
                      <span className="block text-[0.66rem] font-medium uppercase tracking-[0.18em] text-destaque">
                        {predio.subtitulo}
                      </span>
                      <span className="titulo mt-1 block text-[1.7rem] text-texto">
                        {predio.nome}
                      </span>
                    </span>
                    <span className="mb-1.5 shrink-0 rounded-full bg-[var(--azul-950)]/70 px-3 py-1 text-[0.68rem] text-off-white backdrop-blur">
                      {predio.fotos.length} fotos
                    </span>
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm font-medium text-destaque">
                    {predio.chamada}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {predio.destaques.slice(0, 3).map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-[0.86rem] text-texto-suave"
                      >
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-destaque" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-6 flex items-center gap-2 text-sm font-semibold text-texto transition-colors group-hover:text-destaque">
                    Ver o {predio.nome}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}
