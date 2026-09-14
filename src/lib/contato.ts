/** Número da Terra Hospedagem em formato internacional, sem símbolos. */
export const WHATSAPP = "5522992575677";

/** Como o número aparece para leitura humana. */
export const WHATSAPP_EXIBICAO = "(22) 99257-5677";

/**
 * Monta o link do WhatsApp com a mensagem já escrita.
 * A mensagem muda conforme de onde a pessoa clicou, para que a conversa
 * comece com contexto e não com um "olá" solto.
 */
export function linkZap(mensagem: string): string {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
}

export const MENSAGENS = {
  geral:
    "Olá! Vim pelo site da Terra Hospedagem e gostaria de verificar disponibilidade e valores. Poderiam me ajudar?",

  reserva:
    "Olá! Vim pelo site da Terra Hospedagem e quero fazer uma reserva. Já consigo adiantar as datas que preciso.",

  corporativo:
    "Olá! Vim pelo site da Terra Hospedagem. Represento uma empresa e gostaria de falar sobre hospedagem corporativa — acomodação de equipe, estadias longas e faturamento.",

  mensal:
    "Olá! Vim pelo site da Terra Hospedagem e tenho interesse em uma estadia mensal. Podem me passar as condições?",

  predio: (nome: string) =>
    `Olá! Vim pelo site da Terra Hospedagem e me interessei pelo ${nome}. Gostaria de saber sobre disponibilidade e valores.`,
} as const;

/** Links para o rodapé e para a seção de contato. */
export const CONTATO = {
  telefone: WHATSAPP_EXIBICAO,
  telefoneLink: `tel:+${WHATSAPP}`,
  cidade: "Campos dos Goytacazes",
  estado: "RJ",
} as const;
