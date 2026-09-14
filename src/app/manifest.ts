import type { MetadataRoute } from "next";
import { CIDADE } from "@/data/predios";

/**
 * Manifesto para quem adiciona o site à tela inicial do celular — comum entre
 * hóspedes que voltam, já que a reserva é toda por WhatsApp.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Terra Hospedagem",
    short_name: "Terra",
    description: `Apartamentos mobiliados em ${CIDADE} para diária, temporada e hospedagem corporativa.`,
    start_url: "/",
    display: "standalone",
    background_color: "#001529",
    theme_color: "#001529",
    lang: "pt-BR",
    icons: [
      {
        src: "/icones/icone-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icones/icone-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
