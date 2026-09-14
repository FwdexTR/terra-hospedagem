"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Revelar } from "./Revelar";
import { LinkZap } from "./BotaoZap";
import { MENSAGENS } from "@/lib/contato";

const PERGUNTAS = [
  {
    pergunta: "Qual o período mínimo de estadia?",
    resposta:
      "Trabalhamos com diária, então dá para ficar uma noite só. Para estadias de uma semana ou mais, e principalmente para períodos mensais, o valor da diária cai. Vale consultar pelo WhatsApp informando as datas.",
  },
  {
    pergunta: "O café da manhã está incluso?",
    resposta:
      "Sim, o café da manhã é servido no rooftop e já está na diária. O buffet tem pães, frios, frutas, bolos e café.",
  },
  {
    pergunta: "Preciso levar roupa de cama e toalha?",
    resposta:
      "Não. Todos os apartamentos vão com enxoval completo: cama arrumada, toalhas de banho e de rosto. A arrumação é feita periodicamente durante a estadia.",
  },
  {
    pergunta: "Posso cozinhar no apartamento?",
    resposta:
      "Pode, e é justamente a ideia. As cozinhas têm geladeira, fogão ou cooktop, micro-ondas, cafeteira, panelas, louça e talheres. Para quem fica semanas, isso reduz bastante a despesa com alimentação.",
  },
  {
    pergunta: "Tem estacionamento?",
    resposta:
      "A disponibilidade de vaga varia de prédio para prédio. Pergunte pelo WhatsApp dizendo em qual unidade você pretende ficar que a gente confirma na hora.",
  },
  {
    pergunta: "Como funciona para empresas?",
    resposta:
      "Atendemos empresas que precisam acomodar equipes, com emissão de nota fiscal e fechamento mensal. Conseguimos reservar vários apartamentos no mesmo prédio e negociar condição por volume e por tempo de contrato.",
  },
  {
    pergunta: "Aceita animal de estimação?",
    resposta:
      "Depende do prédio e do porte do animal. Fale com a gente antes de reservar para confirmarmos a unidade certa para você.",
  },
  {
    pergunta: "Como faço a reserva?",
    resposta:
      "Pelo WhatsApp. Você manda as datas e quantas pessoas são, a gente confirma a disponibilidade e passa o valor fechado. Não pedimos fiador nem contrato de imobiliária.",
  },
];

export function Faq() {
  const [aberta, setAberta] = useState<number | null>(0);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Revelar>
          <p className="eyebrow">Dúvidas frequentes</p>
          <h2 className="titulo mt-4 text-[clamp(2rem,5vw,3.2rem)] text-texto">
            O que costumam nos perguntar.
          </h2>
        </Revelar>

        <div className="mt-12 divide-y divide-[var(--borda)] border-y border-borda">
          {PERGUNTAS.map((item, i) => {
            const estaAberta = aberta === i;
            return (
              <Revelar key={item.pergunta} atraso={0.03 * i}>
                <div>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setAberta(estaAberta ? null : i)}
                      aria-expanded={estaAberta}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-destaque"
                    >
                      <span className="text-[1.02rem] font-medium text-texto">
                        {item.pergunta}
                      </span>
                      <motion.span
                        animate={{ rotate: estaAberta ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-borda-forte text-destaque"
                      >
                        <Plus className="h-4 w-4" />
                      </motion.span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {estaAberta && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-12 text-[0.95rem] leading-relaxed text-texto-suave">
                          {item.resposta}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Revelar>
            );
          })}
        </div>

        <Revelar atraso={0.1}>
          <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-borda bg-[var(--azul-900)] px-6 py-8 text-center">
            <p className="text-texto-suave">
              Ficou alguma dúvida que não está aqui?
            </p>
            <LinkZap mensagem={MENSAGENS.geral} variante="solido">
              Perguntar no WhatsApp
            </LinkZap>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
