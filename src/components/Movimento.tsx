"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Configura o motion uma única vez para o site inteiro.
 *
 * `reducedMotion="user"` faz a própria biblioteca respeitar a preferência do
 * sistema: transform e layout deixam de animar, opacidade continua. Isso evita
 * ramificar a árvore com useReducedMotion em cada componente — o que causava
 * erro de hidratação, já que o hook devolve null no servidor e o valor real no
 * cliente.
 */
export function Movimento({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
