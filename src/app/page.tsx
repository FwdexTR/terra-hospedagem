import { AreaComumSecao } from "@/components/AreaComumSecao";
import { BotaoZap } from "@/components/BotaoZap";
import { Cabecalho } from "@/components/Cabecalho";
import { Contato } from "@/components/Contato";
import { Empresas } from "@/components/Empresas";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { Incluso } from "@/components/Incluso";
import { Movimento } from "@/components/Movimento";
import { Predios } from "@/components/Predios";
import { Rodape } from "@/components/Rodape";
import { predioPorSlug } from "@/data/predios";

export default function Pagina() {
  // O café da manhã no rooftop é do Boulevard. Aparece na home por ser o melhor
  // visual da rede, mas sempre rotulado e com link para a página certa.
  const boulevard = predioPorSlug("boulevard");

  return (
    <Movimento>
      <Cabecalho />
      <main className="flex-1">
        <Hero />
        <Predios />
        {boulevard?.areaComum && (
          <AreaComumSecao
            area={boulevard.areaComum}
            nomePredio={boulevard.nome}
            href={`/${boulevard.slug}`}
          />
        )}
        <Incluso />
        <Empresas />
        <Faq />
        <Contato />
      </main>
      <Rodape />
      <BotaoZap />
    </Movimento>
  );
}
