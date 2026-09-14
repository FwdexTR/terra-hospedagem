import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { CIDADE, ESTADO } from "@/data/predios";
import { WHATSAPP_EXIBICAO } from "@/lib/contato";

const corpo = Inter({
  variable: "--fonte-corpo",
  subsets: ["latin"],
  display: "swap",
});

const titulo = Fraunces({
  variable: "--fonte-titulo",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const DESCRICAO =
  `Apartamentos mobiliados em ${CIDADE} para diária, temporada e hospedagem corporativa. ` +
  `Quatro prédios, cozinha equipada, enxoval incluso e café da manhã no rooftop.`;

/**
 * Domínio do site. Define NEXT_PUBLIC_SITE_URL na Vercel quando o domínio
 * definitivo existir — é o que o Next usa para montar as URLs absolutas das
 * imagens de Open Graph (a prévia que aparece ao compartilhar no WhatsApp).
 */
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://terrahospedagem.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: `Terra Hospedagem — Apartamentos mobiliados em ${CIDADE}`,
    template: "%s · Terra Hospedagem",
  },
  description: DESCRICAO,
  keywords: [
    "apart hotel Campos dos Goytacazes",
    "flat Campos dos Goytacazes",
    "apartamento mobiliado Campos",
    "hospedagem corporativa Campos dos Goytacazes",
    "aluguel por temporada Campos",
    "Terra Hospedagem",
  ],
  openGraph: {
    title: `Terra Hospedagem — Apartamentos mobiliados em ${CIDADE}`,
    description: DESCRICAO,
    locale: "pt_BR",
    type: "website",
    siteName: "Terra Hospedagem",
    images: [
      {
        url: "/fotos/rooftop/rooftop-01.webp",
        width: 1200,
        height: 630,
        alt: "Terraço da Terra Hospedagem ao pôr do sol",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Terra Hospedagem — ${CIDADE}`,
    description: DESCRICAO,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0c1210",
  colorScheme: "dark",
};

/** Dados estruturados para o Google entender que é uma hospedagem local. */
const DADOS_ESTRUTURADOS = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Terra Hospedagem",
  description: DESCRICAO,
  telephone: "+5522992575677",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: CIDADE,
    addressRegion: ESTADO,
    addressCountry: "BR",
  },
  amenityFeature: [
    "Café da manhã",
    "Wi-Fi",
    "Ar-condicionado",
    "Cozinha equipada",
    "Piscina",
    "Academia",
  ].map((nome) => ({
    "@type": "LocationFeatureSpecification",
    name: nome,
    value: true,
  })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${corpo.variable} ${titulo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(DADOS_ESTRUTURADOS),
          }}
        />
        {children}
        <span className="sr-only">
          Contato Terra Hospedagem: {WHATSAPP_EXIBICAO}
        </span>
      </body>
    </html>
  );
}
