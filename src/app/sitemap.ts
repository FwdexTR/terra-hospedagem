import type { MetadataRoute } from "next";
import { PREDIOS } from "@/data/predios";
import { SITE } from "@/lib/site";

/** Mapa do site para os buscadores: a home e a página de cada prédio. */
export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();

  return [
    {
      url: SITE,
      lastModified: agora,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...PREDIOS.map((predio) => ({
      url: `${SITE}/${predio.slug}`,
      lastModified: agora,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
