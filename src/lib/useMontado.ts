"use client";

import { useSyncExternalStore } from "react";

/** Nada muda depois da hidratação, então não há a que se inscrever. */
const semAssinatura = () => () => {};
const noCliente = () => true;
const noServidor = () => false;

/**
 * Devolve false no servidor e no primeiro render do cliente, true depois.
 *
 * Serve para efeitos que dependem da posição real de rolagem: o servidor sempre
 * assume scroll zero, mas o cliente pode hidratar com a página já rolada — e o
 * transform resultante não bateria. Adiando a aplicação para depois da
 * hidratação, os dois lados renderizam o mesmo HTML.
 *
 * Usa useSyncExternalStore em vez de useState + useEffect: o React já sabe
 * distinguir o snapshot do servidor do snapshot do cliente, e assim não há
 * setState dentro de efeito nem render em cascata.
 */
export function useMontado(): boolean {
  return useSyncExternalStore(semAssinatura, noCliente, noServidor);
}
