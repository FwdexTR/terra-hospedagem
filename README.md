# Terra Hospedagem

Site institucional da Terra Hospedagem — apartamentos mobiliados em Campos dos
Goytacazes (RJ) para diária, temporada e hospedagem corporativa.

Next.js 16 · React 19 · Tailwind 4 · Motion

## Rodar

```bash
npm run dev
```

## Onde mexer em cada coisa

| O que | Arquivo |
|---|---|
| Cores da marca | `src/app/marca.css` |
| Telefone e mensagens do WhatsApp | `src/lib/contato.ts` |
| Textos e dados dos prédios | `src/data/predios.ts` |
| Perguntas frequentes | `src/components/Faq.tsx` |
| Itens inclusos | `src/components/Incluso.tsx` |

## Pendências de conteúdo

Estes campos estão como `null` em `src/data/predios.ts` porque não foram
informados. Enquanto estiverem assim, o site mostra apenas a cidade no lugar do
endereço:

- `endereco` e `bairro` dos quatro prédios

O único endereço conhecido veio da fachada fotografada do Via Park: **424**.

Também falta confirmar:

- A qual prédio pertence o rooftop com café da manhã. As fotos da pasta do
  rooftop incluem um apartamento idêntico ao do Royal, então a seção foi escrita
  como área comum da rede — se for exclusivo de um prédio, o texto precisa mudar.
- Cores oficiais (aguardando o brand book) — trocar em `src/app/marca.css`.
- Logo oficial — hoje há um monograma provisório em `src/components/Logo.tsx`.

## Fotos

As fotos originais ficam em `_fotos-origem/` (fora do git). Para regerar as
versões otimizadas em `public/fotos/` e o manifesto `src/data/fotos.json`:

```bash
node scripts/otimizar-fotos.mjs
```

A seleção de quais fotos entram no site está no objeto `SELECAO` desse script,
por número da foto dentro de cada pasta (ordem alfabética).

## Publicar

Site estático, sem back-end. Na Vercel, definir `NEXT_PUBLIC_SITE_URL` com o
domínio final para que a prévia de compartilhamento do WhatsApp use a URL certa.
