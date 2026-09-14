"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Atraso em segundos — use para escalonar itens de uma lista */
  atraso?: number;
  /** Deslocamento inicial em px */
  deslocamento?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header" | "footer";
};

/**
 * Revela o conteúdo quando ele entra na viewport.
 *
 * A preferência por menos movimento é tratada pelo MotionConfig no layout, e
 * não com um if aqui dentro: ramificar a árvore quebraria a hidratação.
 */
export function Revelar({
  children,
  atraso = 0,
  deslocamento = 24,
  className,
  as = "div",
}: Props) {
  const Componente = motion[as];

  return (
    <Componente
      className={className}
      initial={{ opacity: 0, y: deslocamento }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: atraso,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Componente>
  );
}

/**
 * Revela o texto palavra a palavra, cada uma subindo de dentro de uma máscara.
 * Usado apenas no título do hero, onde o efeito se justifica.
 */
export function RevelarPalavras({
  texto,
  className,
  atraso = 0,
}: {
  texto: string;
  className?: string;
  atraso?: number;
}) {
  const palavras = texto.split(" ");

  return (
    <span className={className}>
      {palavras.map((palavra, i) => (
        <span
          key={`${palavra}-${i}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.9,
              delay: atraso + i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {palavra}
            {i < palavras.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
