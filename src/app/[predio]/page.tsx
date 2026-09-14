import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AreaComumSecao } from "@/components/AreaComumSecao";
import { BotaoZap } from "@/components/BotaoZap";
import { Cabecalho } from "@/components/Cabecalho";
import { Contato } from "@/components/Contato";
import { GaleriaPredio } from "@/components/GaleriaPredio";
import { HeroPredio } from "@/components/HeroPredio";
import { Movimento } from "@/components/Movimento";
import { OutrosPredios } from "@/components/OutrosPredios";
import { Rodape } from "@/components/Rodape";
import { CIDADE, ESTADO, PREDIOS, predioPorSlug } from "@/data/predios";

/** Gera as quatro páginas estaticamente no build. */
export function generateStaticParams() {
  return PREDIOS.map((p) => ({ predio: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/[predio]">,
): Promise<Metadata> {
  const { predio: slug } = await props.params;
  const predio = predioPorSlug(slug);
  if (!predio) return {};

  const descricao = `${predio.chamada}. ${predio.descricao}`;

  return {
    title: `${predio.nome} — ${predio.subtitulo} em ${CIDADE}`,
    description: descricao,
    alternates: { canonical: `/${predio.slug}` },
    openGraph: {
      title: `${predio.nome} · Terra Hospedagem`,
      description: predio.chamada,
      images: predio.fotos[0] ? [{ url: predio.fotos[0].src }] : undefined,
    },
  };
}

export default async function PaginaPredio(props: PageProps<"/[predio]">) {
  const { predio: slug } = await props.params;
  const predio = predioPorSlug(slug);

  if (!predio) notFound();

  const dadosEstruturados = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: `Terra Hospedagem — ${predio.nome}`,
    description: predio.descricao,
    telephone: "+5522992575677",
    address: {
      "@type": "PostalAddress",
      streetAddress: predio.endereco ?? undefined,
      addressLocality: CIDADE,
      addressRegion: ESTADO,
      addressCountry: "BR",
    },
    amenityFeature: predio.comodidades.map((nome) => ({
      "@type": "LocationFeatureSpecification",
      name: nome,
      value: true,
    })),
  };

  return (
    <Movimento>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados) }}
      />
      <Cabecalho />
      <main className="flex-1">
        <HeroPredio predio={predio} />
        <GaleriaPredio predio={predio} />
        {predio.areaComum && (
          <AreaComumSecao area={predio.areaComum} nomePredio={predio.nome} />
        )}
        <OutrosPredios slugAtual={predio.slug} />
        <Contato fundo={predio.fotos[predio.fotos.length - 1] ?? predio.fotos[0]} />
      </main>
      <Rodape />
      <BotaoZap />
    </Movimento>
  );
}
