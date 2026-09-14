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

## Estrutura

- `/` — vitrine da rede: hero, os quatro prédios, café da manhã do Royal
  (rotulado e com link), o que está incluso, empresas, FAQ e contato.
- `/royal`, `/via-park`, `/soho`, `/flavan` — uma página por prédio, geradas
  estaticamente a partir de `PREDIOS` em `src/data/predios.ts`.

Cada página mostra **apenas** o que é daquela unidade. A área comum vive em
`predio.areaComum` e é `null` onde não existe, então a seção simplesmente não
renderiza — foi assim que se resolveu a confusão de o rooftop do Royal aparecer
embaixo do Via Park.

## Marca

Cores oficiais do brandbook (2025), em `src/app/marca.css`:

| Cor | Hex | Uso no site |
|---|---|---|
| Laranja | `#FF6700` | Destaques, CTAs, ícones |
| Azul | `#004E98` | Cor institucional; o fundo usa uma escala derivada dela |
| Off White | `#F4F4F4` | Texto |
| Chumbo | `#1A1A1A` | Texto sobre laranja |

O fundo escuro (`--azul-950` … `--azul-800`) é uma escala derivada do azul da
marca: mesmo matiz (hsl 209 100%), só variando a luminosidade.

**Contraste**: texto sobre laranja usa chumbo, não branco — branco sobre
`#FF6700` dá 2,65:1 e reprova no WCAG; chumbo dá 5,96:1.

**Logo**: o símbolo foi redesenhado em vetor a partir do brandbook, em
`src/components/Logo.tsx`. Se o designer tiver o arquivo vetorial original
(AI/EPS/SVG), vale substituir pelo oficial.

**Tipografia**: a do brandbook é ITC Avant Garde Gothic Pro, que é licenciada e
não pode ser servida na web sem licença própria. O site usa **Poppins**, a
substituta livre mais próxima (mesma construção geométrica, bojos circulares,
altura de x grande). Para trocar pela original depois de licenciada, mexer só
em `src/app/layout.tsx`.

## Pendências de conteúdo

Estes campos estão como `null` em `src/data/predios.ts` porque não foram
informados. Enquanto estiverem assim, o site mostra apenas a cidade no lugar do
endereço:

- `endereco` e `bairro` dos quatro prédios

O único endereço conhecido veio da fachada fotografada do Via Park: **424**.

Áreas comuns já confirmadas pelo cliente: o rooftop com café da manhã é
exclusivo do **Royal**, o lazer (piscina, academia, sauna) é exclusivo do
**Via Park**, e **Flavan** e **Soho** não têm área comum.

## Fotos

As fotos originais ficam em `_fotos-origem/` (fora do git). Para regerar as
versões otimizadas em `public/fotos/` e o manifesto `src/data/fotos.json`:

```bash
node scripts/otimizar-fotos.mjs
```

A seleção de quais fotos entram no site está no objeto `SELECAO` desse script,
por número da foto dentro de cada pasta (ordem alfabética).

## Publicar

Site estático, sem back-end.

Repositório: `FwdexTR/terra-hospedagem` (privado)
Projeto Vercel: `terra-hospedagem` (time `fwdextrs-projects`)

O deploy é automático: **todo push na `main` publica em produção**.

```bash
git push
```

Quando o domínio definitivo existir, apontar `terrahospedagem.com.br` para o
projeto na Vercel e definir a variável `NEXT_PUBLIC_SITE_URL` com ele — é o que
o Next usa para montar as URLs absolutas da prévia de compartilhamento no
WhatsApp.
