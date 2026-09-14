import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const ORIGEM = path.resolve('_fotos-origem');
const DESTINO = path.resolve('public/fotos');
const MANIFESTO = path.resolve('src/data/fotos.json');

// Seleção curada por prédio: número exibido no contact sheet (1-indexado, ordem alfabética)
const SELECAO = {
  Royal:   [21, 19, 30, 32, 23, 5, 9, 10, 13, 16, 26, 34, 12, 43],
  Flavan:  [3, 16, 28, 13, 10, 18, 23, 29, 31, 24],
  Soho:    [10, 16, 2, 7, 11, 3, 9, 1, 13, 12],
  VP:      [1, 3, 5, 4, 7, 9, 16, 22, 21, 24, 20, 23],
  Rooftop: [14, 11, 10, 3, 12, 1, 4, 8, 7, 2],
};

const LARGURA_MAX = 2000;

const arquivos = (dir) =>
  fs.readdirSync(dir).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();

const manifesto = {};

for (const [predio, indices] of Object.entries(SELECAO)) {
  const dirOrigem = path.join(ORIGEM, predio);
  if (!fs.existsSync(dirOrigem)) {
    console.warn(`! pasta ausente: ${predio}`);
    continue;
  }
  const lista = arquivos(dirOrigem);
  const dirDestino = path.join(DESTINO, predio.toLowerCase());
  fs.mkdirSync(dirDestino, { recursive: true });

  manifesto[predio.toLowerCase()] = [];

  for (let ordem = 0; ordem < indices.length; ordem++) {
    const idx = indices[ordem] - 1;
    const nomeOrigem = lista[idx];
    if (!nomeOrigem) {
      console.warn(`! ${predio} #${indices[ordem]} não existe (tem ${lista.length})`);
      continue;
    }
    const slug = `${predio.toLowerCase()}-${String(ordem + 1).padStart(2, '0')}`;
    const destino = path.join(dirDestino, `${slug}.webp`);

    const img = sharp(path.join(dirOrigem, nomeOrigem)).rotate();
    const meta = await img.metadata();
    const largura = Math.min(meta.width ?? LARGURA_MAX, LARGURA_MAX);

    const info = await img
      .resize({ width: largura, withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(destino);

    // placeholder blur embutido
    const blur = await sharp(path.join(dirOrigem, nomeOrigem))
      .rotate().resize(16).webp({ quality: 35 }).toBuffer();

    manifesto[predio.toLowerCase()].push({
      src: `/fotos/${predio.toLowerCase()}/${slug}.webp`,
      largura: info.width,
      altura: info.height,
      blur: `data:image/webp;base64,${blur.toString('base64')}`,
    });
    process.stdout.write('.');
  }
  console.log(` ${predio}: ${manifesto[predio.toLowerCase()].length} fotos`);
}

fs.mkdirSync(path.dirname(MANIFESTO), { recursive: true });
fs.writeFileSync(MANIFESTO, JSON.stringify(manifesto, null, 2));
console.log('\nManifesto:', MANIFESTO);
