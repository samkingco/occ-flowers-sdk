export type RankingMethod =
  | "tokenId"
  | "rank-occurrence"
  | "rank-probability"
  | "rank-rarity-tools";

export interface ListFlowersOptions {
  sortBy?: RankingMethod;
  sortOrder?: "ASC" | "DESC";
}

export interface Flower {
  tokenId: number;
  attributes: FlowerAttributes;
  image: {
    svg: string;
    png: string;
    gif: string | null;
  };
  rarity: {
    occurrence: Rarity;
    probability: Rarity;
    rarityTools: Rarity;
  };
}

interface Rarity {
  score: number;
  rank: number;
}

export interface FlowerAttributes {
  petalStyle: AttrPetalStyles;
  petalColor: AttrColors;
  coreSize: number;
  noOfPetals: number;
  bgColor: AttrColors;
  bgOverlay: AttrColors;
  bgType: AttrBgTypes;
  mutation: AttrMutations;
  spin: boolean;
}

enum AttrPetalStyles {
  Apricot = "Apricot",
  Aquilegia = "Aquilegia",
  Aster = "Aster",
  Bellflower = "Bellflower",
  BirdOfParadise = "Bird of Paradise",
  Chamomile = "Chamomile",
  Dahlia = "Dahlia",
  Daisy = "Daisy",
  Digital = "Digital",
  Ethereum = "Ethereum",
  Gardenias = "Gardenias",
  Hibiscus = "Hibiscus",
  Jasmine = "Jasmine",
  Lotus = "Lotus",
  Magnolia = "Magnolia",
  Plumeria = "Plumeria",
  Tulip = "Tulip",
}

enum AttrColors {
  ArylideYellow = "Arylide Yellow",
  BlueViolet = "Blue Violet",
  BrightBlue = "Bright Blue",
  BrightCerulean = "Bright Cerulean",
  BrightSun = "Bright Sun",
  CanaryYellow = "Canary Yellow",
  CarminePink = "Carmine Pink",
  DarkMagenta = "Dark Magenta",
  EasternBlue = "Eastern Blue",
  Eggshell = "Eggshell",
  EgyptianBlue = "Egyptian Blue",
  Geraldine = "Geraldine",
  Golden = "Golden",
  GreyGoose = "Grey Goose",
  GreyishPurple = "Greyish Purple",
  InternationalOrange = "International Orange",
  LaserLemon = "Laser Lemon",
  LightAprico = "Light Aprico",
  LipstickPink = "Lipstick Pink",
  Melrose = "Melrose",
  PaleAqua = "Pale Aqua",
  PaleOrange = "Pale Orange",
  PeachPuff = "Peach Puff",
  PeachSchnapps = "Peach Schnapps",
  PinkFlare = "Pink Flare",
  PinkSherbet = "Pink Sherbet",
  Porcelain = "Porcelain",
  PowderAsh = "Powder Ash",
  PowderBlue = "Powder Blue",
  PurpleHaze = "Purple Haze",
  Rosa = "Rosa",
  Sand = "Sand",
  SweetPink = "Sweet Pink",
  Tan = "Tan",
  TeaRose = "Tea Rose",
  Thunderbird = "Thunderbird",
  Topaz = "Topaz",
  Tuna = "Tuna",
  White = "White",
}

enum AttrBgTypes {
  Blingy = "Blingy",
  Dalmatian = "Dalmatian",
  DarkTrip = "Dark Trip",
  LightTrip = "Light Trip",
  NightSky = "Night Sky",
  Normal = "Normal",
  Radial = "Radial",
  Rainbow = "Rainbow",
  Trippy = "Trippy",
}

enum AttrMutations {
  Glitched = "Glitched",
  Heart = "Heart",
  Infected = "Infected",
  LongBoi = "Long Boi",
  None = "None",
  Sketched = "Sketched",
  Skewed = "Skewed",
}
