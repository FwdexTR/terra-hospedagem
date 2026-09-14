import fotos from "./fotos.json";

export type Foto = {
  src: string;
  largura: number;
  altura: number;
  blur: string;
};

/** Nome de um ícone do lucide-react, resolvido em `src/lib/icones.ts`. */
export type NomeIcone =
  | "coffee"
  | "sunset"
  | "utensils"
  | "waves"
  | "dumbbell"
  | "flame"
  | "concierge"
  | "briefcase";

export type ItemAreaComum = {
  icone: NomeIcone;
  titulo: string;
  texto: string;
};

/**
 * Área comum de um prédio. Só existe onde de fato existe: o rooftop com café da
 * manhã é exclusivo do Boulevard, o lazer é exclusivo do Via Park, e o Flavan não
 * tem área comum. Atribuir isso errado faria o site prometer o que a unidade
 * não entrega.
 */
export type AreaComum = {
  rotulo: string;
  titulo: string;
  destaque: string;
  texto: string;
  itens: ItemAreaComum[];
  fotos: Foto[];
};

export type Predio = {
  slug: string;
  nome: string;
  subtitulo: string;
  chamada: string;
  descricao: string;
  /** Preencher com o endereço real — enquanto for null o site mostra só a cidade */
  endereco: string | null;
  bairro: string | null;
  perfil: string;
  destaques: string[];
  comodidades: string[];
  fotos: Foto[];
  areaComum: AreaComum | null;
};

const galeria = fotos as Record<string, Foto[]>;

export const CIDADE = "Campos dos Goytacazes";
export const ESTADO = "RJ";

export const PREDIOS: Predio[] = [
  {
    slug: "boulevard",
    nome: "Boulevard",
    subtitulo: "Apartamentos amplos",
    chamada: "O mais espaçoso, com café da manhã no rooftop",
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
    fotos: galeria.boulevard ?? [],
    areaComum: {
      rotulo: "Exclusivo do Boulevard",
      titulo: "O dia começa no",
      destaque: "rooftop",
      texto:
        "Na cobertura do Boulevard, com vista aberta para a cidade, o café da manhã é servido todos os dias. No fim da tarde, o mesmo espaço vira o melhor lugar do prédio para sentar e ver o sol se pôr.",
      itens: [
        {
          icone: "coffee",
          titulo: "Café da manhã servido",
          texto:
            "Buffet montado toda manhã com pães, frios, frutas, bolos e café fresco. Já está na diária.",
        },
        {
          icone: "sunset",
          titulo: "Vista aberta da cidade",
          texto:
            "Fica na cobertura, de frente para o pôr do sol. É o melhor fim de tarde do prédio.",
        },
        {
          icone: "utensils",
          titulo: "Espaço para receber",
          texto:
            "Mesas grandes, área coberta e guarda-sóis. Serve tanto para uma reunião rápida quanto para reunir a família.",
        },
      ],
      fotos: galeria.rooftop ?? [],
    },
  },
  {
    slug: "via-park",
    nome: "Via Park",
    subtitulo: "Flat Service",
    chamada: "Piscina, academia e sauna",
    descricao:
      "O prédio com a área de lazer mais completa da rede. Os apartamentos têm varanda com vista, sala de estar, cozinha equipada e escrivaninha para quem precisa trabalhar hospedado.",
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
    areaComum: {
      rotulo: "Exclusivo do Via Park",
      titulo: "Lazer completo",
      destaque: "no prédio",
      texto:
        "É a unidade com a melhor estrutura da rede. Piscina adulto e infantil com área de sol, academia equipada com esteiras e estação de musculação, e sauna — tudo dentro do prédio, sem precisar sair para treinar ou relaxar.",
      itens: [
        {
          icone: "waves",
          titulo: "Piscina adulto e infantil",
          texto:
            "Área externa com espreguiçadeiras e jardim, boa tanto para quem viaja com crianças quanto para o fim do expediente.",
        },
        {
          icone: "dumbbell",
          titulo: "Academia equipada",
          texto:
            "Esteiras, bicicletas e estação de musculação, com sala espelhada e vista para a área da piscina.",
        },
        {
          icone: "flame",
          titulo: "Sauna",
          texto:
            "Para quem fica semanas hospedado, é o tipo de estrutura que faz diferença na rotina.",
        },
      ],
      fotos: (galeria.vp ?? []).slice(1, 7),
    },
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
    areaComum: null,
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
    areaComum: null,
  },
];

/** Fotos do rooftop do Boulevard — usadas também como capa da home. */
export const ROOFTOP: Foto[] = galeria.rooftop ?? [];

export function predioPorSlug(slug: string): Predio | undefined {
  return PREDIOS.find((p) => p.slug === slug);
}

/** Os outros três prédios, para a navegação no rodapé de cada página. */
export function outrosPredios(slug: string): Predio[] {
  return PREDIOS.filter((p) => p.slug !== slug);
}
