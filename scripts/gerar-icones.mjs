import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

/**
 * Gera os ícones do site a partir do símbolo da marca (o "t" que desenha uma
 * casa). Rode depois de mexer no símbolo em src/components/Logo.tsx:
 *
 *   node scripts/gerar-icones.mjs
 */

const LARANJA = "#ff6700";
const FUNDO = "#001529"; // mesmo azul do site, para o ícone destacar em abas claras

// Caminhos do símbolo — os mesmos de src/components/Logo.tsx (viewBox 0 0 100 129)
const SIMBOLO = `
  <path d="M0 0H33v30.7L0 63.3Z"/>
  <path d="M66.3 30.7 100 63.3H34.9Z"/>
  <path d="M0 66.3h33v29h66.5v10a49.8 23.4 0 0 1-99.5 0Z"/>
`;

/**
 * Monta um SVG quadrado com o símbolo centralizado.
 * @param {number} lado tamanho do quadrado
 * @param {number} ocupacao fração da altura ocupada pelo símbolo
 * @param {number} raio arredondamento do fundo (0 = quadrado)
 */
function svgQuadrado(lado, { ocupacao = 0.7, raio = 0, fundo = FUNDO } = {}) {
  const alturaSimbolo = lado * ocupacao;
  const escala = alturaSimbolo / 129;
  const larguraSimbolo = 100 * escala;
  const x = (lado - larguraSimbolo) / 2;
  const y = (lado - alturaSimbolo) / 2;

  const fundoEl = fundo
    ? `<rect width="${lado}" height="${lado}" rx="${raio}" fill="${fundo}"/>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${lado}" height="${lado}" viewBox="0 0 ${lado} ${lado}">
  ${fundoEl}
  <g transform="translate(${x} ${y}) scale(${escala})" fill="${LARANJA}">${SIMBOLO}</g>
</svg>`;
}

const appDir = path.resolve("src/app");
const publicDir = path.resolve("public");

// favicon em SVG — é o que os navegadores modernos usam, e escala sem perder nitidez
fs.writeFileSync(path.join(appDir, "icon.svg"), svgQuadrado(512, { raio: 96 }));

// PNG de fallback para quem não lê SVG
await sharp(Buffer.from(svgQuadrado(512, { raio: 96 })))
  .resize(192, 192)
  .png()
  .toFile(path.join(appDir, "icon.png"));

// Ícone de iOS: sem cantos arredondados (o sistema recorta) e com mais respiro
await sharp(Buffer.from(svgQuadrado(512, { raio: 0, ocupacao: 0.58 })))
  .resize(180, 180)
  .png()
  .toFile(path.join(appDir, "apple-icon.png"));

// Ícones do manifesto, para quando alguém adiciona o site à tela inicial
fs.mkdirSync(path.join(publicDir, "icones"), { recursive: true });
for (const tamanho of [192, 512]) {
  await sharp(Buffer.from(svgQuadrado(512, { raio: 96 })))
    .resize(tamanho, tamanho)
    .png()
    .toFile(path.join(publicDir, "icones", `icone-${tamanho}.png`));
}

/**
 * Monta um .ico com PNGs embutidos. O Next já declara icon.svg e icon.png nas
 * tags do <head>, mas navegadores e crawlers antigos pedem /favicon.ico direto
 * — sem o arquivo, vira 404 no log.
 */
async function gerarIco(destino, tamanhos = [16, 32, 48]) {
  const pngs = await Promise.all(
    tamanhos.map((t) =>
      sharp(Buffer.from(svgQuadrado(512, { raio: 96 })))
        .resize(t, t)
        .png()
        .toBuffer(),
    ),
  );

  const cabecalho = Buffer.alloc(6);
  cabecalho.writeUInt16LE(0, 0); // reservado
  cabecalho.writeUInt16LE(1, 2); // 1 = ícone
  cabecalho.writeUInt16LE(pngs.length, 4);

  let deslocamento = 6 + pngs.length * 16;
  const entradas = pngs.map((png, i) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(tamanhos[i] >= 256 ? 0 : tamanhos[i], 0); // largura
    e.writeUInt8(tamanhos[i] >= 256 ? 0 : tamanhos[i], 1); // altura
    e.writeUInt8(0, 2); // cores da paleta
    e.writeUInt8(0, 3); // reservado
    e.writeUInt16LE(1, 4); // planos
    e.writeUInt16LE(32, 6); // bits por pixel
    e.writeUInt32LE(png.length, 8);
    e.writeUInt32LE(deslocamento, 12);
    deslocamento += png.length;
    return e;
  });

  fs.writeFileSync(destino, Buffer.concat([cabecalho, ...entradas, ...pngs]));
}

await gerarIco(path.join(publicDir, "favicon.ico"));

console.log("Ícones gerados:");
console.log("  src/app/icon.svg");
console.log("  src/app/icon.png");
console.log("  src/app/apple-icon.png");
console.log("  public/favicon.ico");
console.log("  public/icones/icone-192.png, icone-512.png");
