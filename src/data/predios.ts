import fotos from "./fotos.json";

export type Foto = {
  src: string;
  largura: number;
  altura: number;
  blur: string;
};

export type Predio = {
  slug: string;
  nome: string;
  subtitulo: string;
  /** Frase curta usada no card e no topo da galeria */
  chamada: string;
  descricao: string;
  /** Preencher com o endereço real — enquanto estiver null o site mostra só a cidade */
  endereco: string | null;
  bairro: string | null;
  perfil: string;
  destaques: string[];
  comodidades: string[];
  fotos: Foto[];
  /** Foto usada como capa do card */
  capa: Foto;
};

const galeria = fotos as Record<string, Foto[]>;

export const CIDADE = "Campos dos Goytacazes";
export const ESTADO = "RJ";

export const PREDIOS: Predio[] = [
  {
    slug: "royal",
    nome: "Royal",
    subtitulo: "Apartamentos amplos",
    chamada: "O mais espaçoso da rede",
    descricao:
      "Apartamentos de um e dois quartos com sala separada, varanda e vista aberta da cidade. Acabamento recente, porcelanato em todos os ambientes e banheiros revestidos em mármore. A cozinha tem fogão, geladeira, micro-ondas e cafeteira, e a área de serviço vem com máquina de lavar — dá para morar meses sem sentir falta de nada.",
    endereco: null,
    bairro: null,
    perfil: "Famílias, estadias longas e equipes em projeto",
    destaques: [
      "1 e 2 quartos com sala separada",
      "Varanda com vista da cidade",
      "Área de serviço com máquina de lavar",
      "Café da manhã no rooftop",
    ],
    comodidades: [
      "Ar-condicionado",
      "Cozinha completa",
      "Máquina de lavar",
      "Wi-Fi",
      "Smart TV",
      "Enxoval incluso",
    ],
    fotos: galeria.royal ?? [],
    capa: (galeria.royal ?? [])[0],
  },
  {
    slug: "via-park",
    nome: "Via Park",
    subtitulo: "Flat Service",
    chamada: "Piscina, academia e sauna",
    descricao:
      "O prédio com a área de lazer mais completa da rede: piscina adulto e infantil, academia equipada com esteiras e estação de musculação, e sauna. Os apartamentos têm varanda com vista, sala de estar, cozinha equipada e escrivaninha para quem precisa trabalhar hospedado.",
    endereco: null,
    bairro: null,
    perfil: "Estadias longas, executivos e quem quer estrutura de lazer",
    destaques: [
      "Piscina adulto e infantil",
      "Academia equipada",
      "Sauna",
      "Varanda com vista",
    ],
    comodidades: [
      "Piscina",
      "Academia",
      "Sauna",
      "Cozinha equipada",
      "Wi-Fi",
      "Recepção",
    ],
    fotos: galeria.vp ?? [],
    capa: (galeria.vp ?? [])[0],
  },
  {
    slug: "soho",
    nome: "Soho",
    subtitulo: "Flat executivo",
    chamada: "Enxoval de hotel, autonomia de flat",
    descricao:
      "Formato enxuto para quem viaja a trabalho: cama box de casal, escrivaninha com cadeira, enxoval e arrumação no padrão hoteleiro, mais uma cozinha compacta com frigobar, cooktop e cafeteira. Tudo em um só ambiente, bem resolvido.",
    endereco: null,
    bairro: null,
    perfil: "Viagens de trabalho e estadias curtas",
    destaques: [
      "Cama box de casal",
      "Escrivaninha para trabalhar",
      "Cozinha compacta com frigobar",
      "Enxoval e arrumação de hotel",
    ],
    comodidades: [
      "Ar-condicionado",
      "Escrivaninha",
      "Frigobar",
      "Cooktop",
      "Wi-Fi",
      "Enxoval incluso",
    ],
    fotos: galeria.soho ?? [],
    capa: (galeria.soho ?? [])[0],
  },
  {
    slug: "flavan",
    nome: "Flavan",
    subtitulo: "Studios mobiliados",
    chamada: "Direto ao ponto, pelo melhor preço",
    descricao:
      "Studios e apartamentos compactos, todos mobiliados e prontos para uso: cama, sofá, Smart TV, ar-condicionado e cozinha com geladeira, cooktop e micro-ondas. A opção mais econômica da rede, sem abrir mão do essencial.",
    endereco: null,
    bairro: null,
    perfil: "Estadias econômicas, técnicos e profissionais em deslocamento",
    destaques: [
      "Studios e apartamentos compactos",
      "Totalmente mobiliado",
      "Cozinha equipada",
      "Melhor custo da rede",
    ],
    comodidades: [
      "Ar-condicionado",
      "Smart TV",
      "Cozinha equipada",
      "Wi-Fi",
      "Enxoval incluso",
      "Box blindex",
    ],
    fotos: galeria.flavan ?? [],
    capa: (galeria.flavan ?? [])[0],
  },
];

/** Fotos do rooftop e do café da manhã — área comum, usada em seção própria */
export const ROOFTOP: Foto[] = galeria.rooftop ?? [];

export const TODAS_AS_FOTOS: Foto[] = [
  ...ROOFTOP,
  ...PREDIOS.flatMap((p) => p.fotos),
];

export function predioPorSlug(slug: string): Predio | undefined {
  return PREDIOS.find((p) => p.slug === slug);
}
