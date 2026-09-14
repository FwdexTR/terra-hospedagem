"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { MessageCircle, Phone } from "lucide-react";
import { Revelar } from "./Revelar";
import { LinkZap } from "./BotaoZap";
import { CONTATO, MENSAGENS, WHATSAPP_EXIBICAO } from "@/lib/contato";
import { ROOFTOP } from "@/data/predios";

const ATALHOS = [
  {
    rotulo: "Quero reservar",
    descricao: "Já tenho as datas",
    mensagem: MENSAGENS.reserva,
  },
  {
    rotulo: "Estadia mensal",
    descricao: "Vou ficar um mês ou mais",
    mensagem: MENSAGENS.mensal,
  },
  {
    rotulo: "Sou empresa",
    descricao: "Preciso acomodar uma equipe",
    mensagem: MENSAGENS.corporativo,
  },
];

export function Contato() {
  // Foto do fim de tarde no terraço — fecha o site no mesmo tom em que abriu
  const fundo = ROOFTOP[1] ?? ROOFTOP[0];

  return (
    <section
      id="contato"
      className="grao relative isolate scroll-mt-24 overflow-hidden py-24 sm:py-32"
    >
      {fundo && (
        <>
          <Image
            src={fundo.src}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL={fundo.blur}
            className="z-0 object-cover object-center"
          />
          <div className="absolute inset-0 z-[1] bg-[var(--terra-900)]/88" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Revelar>
          <p className="eyebrow">Fale com a gente</p>
          <h2 className="titulo mt-4 text-[clamp(2.1rem,6vw,4rem)] text-texto">
            Manda as datas.
            <br />
            <span className="text-destaque">A gente confirma na hora.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-texto-suave">
            O atendimento é direto pelo WhatsApp, com a recepção da Terra
            Hospedagem. Do outro lado tem uma pessoa, não um formulário.
          </p>
        </Revelar>

        <Revelar atraso={0.12}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <LinkZap
              mensagem={MENSAGENS.geral}
              variante="zap"
              className="px-9 py-4 text-base"
            >
              {WHATSAPP_EXIBICAO}
            </LinkZap>
            <a
              href={CONTATO.telefoneLink}
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-borda-forte px-7 py-4 text-sm font-semibold text-texto transition-all duration-300 hover:-translate-y-0.5 hover:border-destaque hover:text-destaque"
            >
              <Phone className="h-4 w-4" />
              Ligar
            </a>
          </div>
        </Revelar>

        {/* Atalhos que já abrem a conversa no assunto certo */}
        <div className="mt-12 grid gap-3 sm:grid-cols-3">
          {ATALHOS.map((atalho, i) => (
            <Revelar key={atalho.rotulo} atraso={0.06 * i}>
              <motion.a
                href={`https://wa.me/5522992575677?text=${encodeURIComponent(atalho.mensagem)}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="flex h-full flex-col items-center gap-2 rounded-2xl border border-borda bg-[var(--terra-850)]/80 px-5 py-6 backdrop-blur transition-colors hover:border-destaque"
              >
                <MessageCircle className="h-5 w-5 text-destaque" />
                <span className="mt-1 font-semibold text-texto">
                  {atalho.rotulo}
                </span>
                <span className="text-[0.82rem] text-texto-fraco">
                  {atalho.descricao}
                </span>
              </motion.a>
            </Revelar>
          ))}
        </div>

        <Revelar atraso={0.2}>
          <p className="mt-10 text-[0.82rem] text-texto-fraco">
            {CONTATO.cidade} · {CONTATO.estado}
          </p>
        </Revelar>
      </div>
    </section>
  );
}
