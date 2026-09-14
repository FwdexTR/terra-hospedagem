"use client";

import Image from "next/image";
import { Building2, CalendarRange, FileText, Users } from "lucide-react";
import { Revelar } from "./Revelar";
import { LinkZap } from "./BotaoZap";
import { MENSAGENS } from "@/lib/contato";
import { PREDIOS } from "@/data/predios";

const VANTAGENS = [
  {
    Icone: Users,
    titulo: "Equipes inteiras",
    texto:
      "Vários apartamentos no mesmo prédio ou distribuídos entre as quatro unidades, conforme o tamanho do time.",
  },
  {
    Icone: CalendarRange,
    titulo: "Estadias longas",
    texto:
      "Condição diferenciada para contratos mensais e para projetos com data de término definida.",
  },
  {
    Icone: FileText,
    titulo: "Faturamento para empresa",
    texto:
      "Emissão de nota fiscal e fechamento mensal, para entrar direto na prestação de contas.",
  },
  {
    Icone: Building2,
    titulo: "Mais barato que hotel",
    texto:
      "Cozinha no apartamento reduz a despesa com alimentação, e a diária cai conforme o período aumenta.",
  },
];

export function Empresas() {
  // Sala do Royal — comunica o padrão de apartamento que a empresa recebe
  const foto = PREDIOS[0].fotos[0];

  return (
    <section
      id="empresas"
      className="grao relative scroll-mt-24 overflow-hidden border-y border-borda bg-[var(--azul-900)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <Revelar className="order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-borda">
              {foto && (
                <Image
                  src={foto.src}
                  alt="Sala de apartamento da Terra Hospedagem, mobiliada e pronta para uso"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  placeholder="blur"
                  blurDataURL={foto.blur}
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--azul-950)]/55 to-transparent" />
            </div>
          </Revelar>

          <div className="order-1 lg:order-2">
            <Revelar>
              <p className="eyebrow">Para empresas</p>
              <h2 className="titulo mt-4 text-[clamp(2rem,5vw,3.4rem)] text-texto">
                Hospedagem corporativa
                <br />
                <span className="text-destaque">sem dor de cabeça.</span>
              </h2>
              <p className="mt-5 max-w-lg text-texto-suave">
                Se a sua empresa traz técnicos, consultores ou uma equipe em
                projeto para Campos, a conta fecha melhor em apartamento do que
                em hotel, e o pessoal fica mais confortável.
              </p>
            </Revelar>

            <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {VANTAGENS.map((item, i) => (
                <Revelar key={item.titulo} atraso={0.06 * i}>
                  <div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-borda-forte text-destaque">
                      <item.Icone className="h-[1.05rem] w-[1.05rem]" />
                    </span>
                    <h3 className="mt-4 text-[0.95rem] font-semibold text-texto">
                      {item.titulo}
                    </h3>
                    <p className="mt-1.5 text-[0.88rem] leading-relaxed text-texto-suave">
                      {item.texto}
                    </p>
                  </div>
                </Revelar>
              ))}
            </div>

            <Revelar atraso={0.2}>
              <LinkZap
                mensagem={MENSAGENS.corporativo}
                variante="solido"
                className="mt-10"
              >
                Falar sobre hospedagem corporativa
              </LinkZap>
            </Revelar>
          </div>
        </div>
      </div>
    </section>
  );
}
