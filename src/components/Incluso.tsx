"use client";

import {
  AirVent,
  BedDouble,
  CookingPot,
  Droplets,
  KeyRound,
  Sparkles,
  Tv,
  Wifi,
} from "lucide-react";
import { Revelar } from "./Revelar";
import { cn } from "@/lib/utils";

const ITENS = [
  {
    Icone: CookingPot,
    titulo: "Cozinha equipada",
    texto:
      "Geladeira, fogão ou cooktop, micro-ondas, cafeteira, louça e talheres. Dá para cozinhar de verdade.",
    largo: true,
  },
  {
    Icone: BedDouble,
    titulo: "Enxoval incluso",
    texto: "Cama arrumada, toalhas e roupa de banho no padrão de hotel.",
  },
  {
    Icone: Wifi,
    titulo: "Wi-Fi",
    texto: "Internet em todos os apartamentos, para trabalhar ou assistir.",
  },
  {
    Icone: AirVent,
    titulo: "Ar-condicionado",
    texto: "Em todos os quartos. Verão em Campos pede isso.",
  },
  {
    Icone: Tv,
    titulo: "Smart TV",
    texto: "Para usar suas próprias contas de streaming.",
  },
  {
    Icone: Droplets,
    titulo: "Área de serviço",
    texto:
      "Tanque e máquina de lavar nos apartamentos maiores, pensado para quem fica semanas.",
  },
  {
    Icone: Sparkles,
    titulo: "Limpeza",
    texto: "Arrumação periódica, combinada conforme o tempo de estadia.",
  },
  {
    Icone: KeyRound,
    titulo: "Check-in sem burocracia",
    texto:
      "Sem fiador, sem contrato longo e sem depósito de imobiliária. Você fala com a gente e já reserva.",
    largo: true,
  },
];

export function Incluso() {
  return (
    <section id="incluso" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Revelar>
          <p className="eyebrow">O que está incluso</p>
          <h2 className="titulo mt-4 max-w-2xl text-[clamp(2rem,5vw,3.4rem)] text-texto">
            Você chega com a mala. O resto já está aqui.
          </h2>
          <p className="mt-5 max-w-xl text-texto-suave">
            Ninguém precisa montar casa nem esperar instalação de internet. Os
            apartamentos ficam prontos para uso desde a primeira noite.
          </p>
        </Revelar>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ITENS.map((item, i) => (
            <Revelar key={item.titulo} atraso={0.04 * i}>
              <article
                className={cn(
                  "group h-full rounded-2xl border border-borda bg-[var(--terra-850)] p-6",
                  "transition-all duration-500 hover:-translate-y-1 hover:border-borda-forte",
                  item.largo && "lg:col-span-2",
                )}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-borda-forte text-destaque transition-colors duration-500 group-hover:bg-destaque group-hover:text-[var(--terra-900)]">
                  <item.Icone className="h-[1.15rem] w-[1.15rem]" />
                </span>
                <h3 className="mt-5 font-semibold text-texto">{item.titulo}</h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-texto-suave">
                  {item.texto}
                </p>
              </article>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}
