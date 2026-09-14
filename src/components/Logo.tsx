import { cn } from "@/lib/utils";

/**
 * Marca provisória: monograma em arco sobre linha de horizonte.
 * Substituir pelo arquivo oficial do brand book quando disponível.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        className="h-8 w-8 shrink-0 text-destaque"
      >
        <circle
          cx="20"
          cy="20"
          r="18.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.45"
        />
        {/* sol nascendo sobre a linha do horizonte */}
        <path
          d="M9 25a11 11 0 0 1 22 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <line
          x1="6"
          y1="25"
          x2="34"
          y2="25"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <line
          x1="11"
          y1="29.5"
          x2="29"
          y2="29.5"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>

      <span className="flex flex-col leading-none">
        <span className="titulo text-[1.06rem] tracking-[0.02em] text-texto">
          Terra
        </span>
        <span className="text-[0.56rem] font-medium uppercase tracking-[0.3em] text-destaque">
          Hospedagem
        </span>
      </span>
    </span>
  );
}
