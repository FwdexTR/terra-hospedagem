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
import { Rooftop } from "@/components/Rooftop";

export default function Pagina() {
  return (
    <Movimento>
      <Cabecalho />
      <main className="flex-1">
        <Hero />
        <Predios />
        <Rooftop />
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
