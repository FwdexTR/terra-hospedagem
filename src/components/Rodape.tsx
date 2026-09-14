import Link from "next/link";
import { Logo } from "./Logo";
import { CONTATO, WHATSAPP_EXIBICAO, linkZap, MENSAGENS } from "@/lib/contato";
import { PREDIOS } from "@/data/predios";

const NAVEGACAO = [
  { href: "/#predios", texto: "Prédios" },
  { href: "/boulevard", texto: "Café da manhã" },
  { href: "/#incluso", texto: "O que está incluso" },
  { href: "/#empresas", texto: "Para empresas" },
  { href: "/#contato", texto: "Contato" },
];

export function Rodape() {
  const ano = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-borda bg-[var(--azul-900)]">
      {/* Faixa deslizante com os nomes dos prédios */}
      <div className="flex overflow-hidden border-b border-borda py-5">
        <div className="marquee flex shrink-0 items-center gap-10 whitespace-nowrap pr-10">
          {[...PREDIOS, ...PREDIOS, ...PREDIOS, ...PREDIOS].map((p, i) => (
            <span
              key={`${p.slug}-${i}`}
              className="titulo flex items-center gap-10 text-[1.5rem] text-texto-fraco"
            >
              {p.nome}
              <span className="text-destaque">·</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-5 max-w-sm text-[0.92rem] leading-relaxed text-texto-suave">
              Apartamentos mobiliados em {CONTATO.cidade}, para diária, temporada
              e estadias corporativas.
            </p>
            <a
              href={linkZap(MENSAGENS.geral)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-lg font-semibold text-destaque transition-colors hover:text-destaque-claro"
            >
              {WHATSAPP_EXIBICAO}
            </a>
          </div>

          <nav aria-label="Rodapé">
            <h2 className="text-[0.7rem] uppercase tracking-[0.18em] text-texto-fraco">
              Navegar
            </h2>
            <ul className="mt-4 space-y-2.5">
              {NAVEGACAO.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[0.9rem] text-texto-suave transition-colors hover:text-destaque"
                  >
                    {item.texto}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.7rem] uppercase tracking-[0.18em] text-texto-fraco">
              Nossos prédios
            </h2>
            <ul className="mt-4 space-y-2.5">
              {PREDIOS.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/${p.slug}`}
                    className="text-[0.9rem] text-texto-suave transition-colors hover:text-destaque"
                  >
                    {p.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-borda pt-6 text-[0.78rem] text-texto-fraco sm:flex-row sm:items-center">
          <p>
            © {ano} Terra Hospedagem · {CONTATO.cidade}/{CONTATO.estado}
          </p>
          <p>
            Feito por{" "}
            <a
              href="#topo"
              className="text-texto-suave transition-colors hover:text-destaque"
            >
              Aplass
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
