import { cn } from "@/lib/utils";

/**
 * Símbolo da Terra Hospedagem: a letra "t" cujo contraforma desenha uma casa —
 * o corte diagonal na haste e o triângulo à direita formam as duas águas do
 * telhado. Redesenhado em vetor a partir do brandbook (2025).
 *
 * `cor` controla o preenchimento: "marca" usa o laranja oficial, "atual" herda
 * a cor do texto (para aplicações monocromáticas sobre azul, laranja ou chumbo,
 * como prevê o manual).
 */
export function Simbolo({
  className,
  cor = "marca",
}: {
  className?: string;
  cor?: "marca" | "atual";
}) {
  return (
    <svg
      viewBox="0 0 100 129"
      aria-hidden="true"
      className={className}
      fill={cor === "marca" ? "var(--laranja)" : "currentColor"}
    >
      {/* haste vertical com o corte diagonal */}
      <path d="M0 0H33v30.7L0 63.3Z" />
      {/* telhado */}
      <path d="M66.3 30.7 100 63.3H34.9Z" />
      {/* base do "t" */}
      <path d="M0 66.3h33v29h66.5v10a49.8 23.4 0 0 1-99.5 0Z" />
    </svg>
  );
}

/**
 * Assinatura completa: símbolo + logotipo.
 *
 * O logotipo é composto em texto com a fonte do site. A tipografia oficial é a
 * ITC Avant Garde Gothic Pro, que é licenciada e não pode ser servida na web
 * sem licença própria — se a Terra adquirir a licença, basta trocar a família
 * em `--fonte-titulo` no layout.
 */
export function Logo({
  className,
  variante = "horizontal",
  mono = false,
}: {
  className?: string;
  variante?: "horizontal" | "vertical";
  mono?: boolean;
}) {
  const vertical = variante === "vertical";

  return (
    <span
      className={cn(
        "flex",
        vertical ? "flex-col items-center gap-2" : "items-center gap-2.5",
        className,
      )}
    >
      <Simbolo
        cor={mono ? "atual" : "marca"}
        className={cn("shrink-0", vertical ? "h-11 w-auto" : "h-9 w-auto")}
      />

      <span
        className={cn(
          "flex flex-col leading-[0.92]",
          vertical && "items-center",
        )}
      >
        <span className="text-[1.32rem] font-bold tracking-[-0.035em] text-texto">
          terra
        </span>
        <span className="text-[0.6rem] font-medium tracking-[0.02em] text-texto-suave">
          hospedagem
        </span>
      </span>
    </span>
  );
}
