"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Coffee, Sunset, UtensilsCrossed } from "lucide-react";
import { Revelar } from "./Revelar";
import { Lightbox } from "./Lightbox";
import { ROOFTOP } from "@/data/predios";
import { useMontado } from "@/lib/useMontado";

const PONTOS = [
  {
    Icone: Coffee,
    titulo: "Café da manhã servido",
    texto:
      "Buffet montado toda manhã com pães, frios, frutas, bolos e café fresco. Já está na diária.",
  },
  {
    Icone: Sunset,
    titulo: "Vista aberta da cidade",
    texto:
      "O terraço fica na cobertura, de frente para o pôr do sol. É o melhor fim de tarde do prédio.",
  },
  {
    Icone: UtensilsCrossed,
    titulo: "Espaço para receber",
    texto:
      "Mesas grandes, área coberta e guarda-sóis. Serve tanto para uma reunião rápida quanto para reunir a família.",
  },
];

export function Rooftop() {
  const referencia = useRef<HTMLElement>(null);
  const semMovimento = useReducedMotion();
  const montado = useMontado();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: referencia,
    offset: ["start end", "end start"],
  });
  // Range achatado quando a pessoa pede menos movimento, em vez de trocar a
  // árvore renderizada — ver o comentário equivalente no Hero.
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    semMovimento ? ["0%", "0%"] : ["-6%", "6%"],
  );

  const [destaque, ...demais] = ROOFTOP;

  return (
    <section
      ref={referencia}
      id="rooftop"
      className="grao relative scroll-mt-24 overflow-hidden border-y border-borda bg-[var(--azul-900)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Texto */}
          <div>
            <Revelar>
              <p className="eyebrow">Área comum</p>
              <h2 className="titulo mt-4 text-[clamp(2rem,5vw,3.4rem)] text-texto">
                O dia começa no{" "}
                <span className="text-destaque">terraço</span>.
              </h2>
              <p className="mt-5 max-w-lg text-texto-suave">
                Na cobertura tem um rooftop com vista aberta para a cidade, onde
                o café da manhã é servido todos os dias. No fim da tarde, o
                mesmo espaço vira o melhor lugar do prédio para sentar e ver o
                sol se pôr.
              </p>
            </Revelar>

            <ul className="mt-10 space-y-7">
              {PONTOS.map((ponto, i) => (
                <Revelar as="li" key={ponto.titulo} atraso={0.08 * i}>
                  <div className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-borda-forte text-destaque">
                      <ponto.Icone className="h-[1.15rem] w-[1.15rem]" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-texto">{ponto.titulo}</h3>
                      <p className="mt-1 text-[0.92rem] leading-relaxed text-texto-suave">
                        {ponto.texto}
                      </p>
                    </div>
                  </div>
                </Revelar>
              ))}
            </ul>
          </div>

          {/* Fotos */}
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
                  alt="Terraço da Terra Hospedagem no fim da tarde, com mesas postas e o sol se pondo sobre a cidade"
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
                  aria-label={`Abrir foto ${i + 2} do terraço`}
                  className="group relative block aspect-square w-full overflow-hidden rounded-xl border border-borda"
                >
                  <Image
                    src={foto.src}
                    alt={`Terraço e café da manhã — foto ${i + 2}`}
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
        fotos={ROOFTOP}
        indice={lightbox}
        aoFechar={() => setLightbox(null)}
        aoTrocar={setLightbox}
        legenda="Terraço e café da manhã"
      />
    </section>
  );
}
