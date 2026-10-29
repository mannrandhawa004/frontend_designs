export type Mode = "buy" | "rent";
export type PropertyType = "Villa" | "Chalet" | "Cabin" | "Penthouse";

export interface Property {
  id: string;
  name: string;
  address: string;
  region: string;
  type: PropertyType;
  price: number;
  rent: number;
  area: number;
  yard: number;
  outdoorLabel: "yard" | "terrace";
  beds: number;
  baths: number;
  likes: number;
  saves: number;
  year: number;
  image: string;
  gallery: string[];
  heroPosition?: string;
  description: string;
  amenities: string[];
}

export interface Filters {
  location: string;
  type: string;
  maxPrice: number | null;
}

export const PROPERTIES: Property[] = [
  {
    id: "lunar-oasis",
    name: "Lunar Oasis Villa",
    address: "1874 Forest Haven Rd, Asheville",
    region: "Arizona",
    type: "Villa",
    price: 298000,
    rent: 2900,
    area: 695,
    yard: 126,
    outdoorLabel: "yard",
    beds: 3,
    baths: 2,
    likes: 4400,
    saves: 157,
    year: 2024,
    image: "images/hero-lunar.jpg",
    gallery: ["images/hero-lunar.jpg", "images/interior.jpg"],
    heroPosition: "center 62%",
    description:
      "This futuristic villa seamlessly blends into the desert environment, offering a modern, flowing space with panoramic desert views. Its innovative design makes it a perfect luxury getaway.",
    amenities: ["Panoramic glazing", "Smart home", "Cove lighting", "Heated floors", "EV charging", "Solar roof"],
  },
  {
    id: "aurora-crest",
    name: "Aurora Crest Chalet",
    address: "52 Glacier Point Ln, Aspen",
    region: "Colorado",
    type: "Chalet",
    price: 640000,
    rent: 5200,
    area: 820,
    yard: 400,
    outdoorLabel: "yard",
    beds: 4,
    baths: 3,
    likes: 5200,
    saves: 341,
    year: 2023,
    image: "images/hero-aurora.jpg",
    gallery: ["images/hero-aurora.jpg", "images/interior.jpg"],
    heroPosition: "center 60%",
    description:
      "Perched above a silent pine valley, this sculpted chalet frames the peaks through floor-to-ceiling glass. Warm interiors, a cantilevered deck and heated floors make winter feel effortless.",
    amenities: ["Ski-in / ski-out", "Fireplace lounge", "Heated deck", "Sauna", "Boot room", "Smart home"],
  },
  {
    id: "mirage-dune",
    name: "Mirage Dune Pavilion",
    address: "908 Sandstone Way, Sedona",
    region: "Arizona",
    type: "Villa",
    price: 289000,
    rent: 2750,
    area: 540,
    yard: 210,
    outdoorLabel: "yard",
    beds: 3,
    baths: 3,
    likes: 3100,
    saves: 212,
    year: 2024,
    image: "images/hero-mirage.jpg",
    gallery: ["images/hero-mirage.jpg", "images/interior.jpg"],
    heroPosition: "center 60%",
    description:
      "A cluster of softly rounded pavilions rising from red-rock terrain. Curved glass walls, a reflecting pool and sunset terraces turn every evening into a quiet spectacle.",
    amenities: ["Reflecting pool", "Sunset terrace", "Outdoor kitchen", "Stargazing deck", "Solar roof"],
  },
  {
    id: "solace-retreat",
    name: "Solace Desert Retreat",
    address: "47 Saguaro Ridge, Scottsdale",
    region: "Arizona",
    type: "Villa",
    price: 276000,
    rent: 2600,
    area: 480,
    yard: 340,
    outdoorLabel: "yard",
    beds: 2,
    baths: 2,
    likes: 1900,
    saves: 96,
    year: 2022,
    image: "images/listing-solace.jpg",
    gallery: ["images/listing-solace.jpg", "images/interior.jpg"],
    description:
      "Low-slung and serene, this retreat wraps around a private courtyard pool. Sliding glass walls dissolve the line between cool interiors and the open Sonoran desert.",
    amenities: ["Courtyard pool", "Sliding glass walls", "Desert garden", "Fire pit", "Home office"],
  },
  {
    id: "halo-cliff",
    name: "Halo Cliff Residence",
    address: "2210 Pacific Bluff Dr, Big Sur",
    region: "California",
    type: "Villa",
    price: 1250000,
    rent: 9800,
    area: 960,
    yard: 280,
    outdoorLabel: "terrace",
    beds: 5,
    baths: 4,
    likes: 8700,
    saves: 612,
    year: 2023,
    image: "images/listing-halo.jpg",
    gallery: ["images/listing-halo.jpg", "images/interior.jpg"],
    description:
      "Carved into the Big Sur bluffs, this residence floats above the Pacific. Sweeping curved walls, an infinity terrace and ocean views from every single room.",
    amenities: ["Infinity pool", "Ocean views", "Wine cellar", "Home cinema", "Gym", "Guest suite"],
  },
  {
    id: "nimbus-lake",
    name: "Nimbus Lake House",
    address: "15 Emerald Bay Rd, Lake Tahoe",
    region: "Nevada",
    type: "Cabin",
    price: 480000,
    rent: 4100,
    area: 410,
    yard: 520,
    outdoorLabel: "yard",
    beds: 3,
    baths: 2,
    likes: 2600,
    saves: 188,
    year: 2021,
    image: "images/listing-nimbus.jpg",
    gallery: ["images/listing-nimbus.jpg", "images/interior.jpg"],
    description:
      "A calm timber-and-glass hideaway on the shore of Lake Tahoe, with a private dock, a cedar sauna and a fireplace lounge looking across mirror-still water.",
    amenities: ["Private dock", "Cedar sauna", "Fireplace", "Kayak storage", "Forest trails"],
  },
  {
    id: "celeste-sky",
    name: "Celeste Sky Penthouse",
    address: "300 Summit Ridge, Park City",
    region: "Utah",
    type: "Penthouse",
    price: 920000,
    rent: 7600,
    area: 380,
    yard: 60,
    outdoorLabel: "terrace",
    beds: 2,
    baths: 2,
    likes: 3900,
    saves: 274,
    year: 2025,
    image: "images/interior.jpg",
    gallery: ["images/interior.jpg", "images/hero-lunar.jpg"],
    description:
      "Flowing white interiors, hidden cove lighting and a wraparound terrace high above the snowy plateau. A penthouse designed like a calm, luminous cloud.",
    amenities: ["Wraparound terrace", "Concierge", "Private elevator", "Spa access", "Smart glass"],
  },
];

export const FEATURED_IDS = ["lunar-oasis", "aurora-crest", "mirage-dune"];

export const LOCATIONS = ["Any", "Arizona", "California", "Colorado", "Nevada", "Utah"];
export const TYPES = ["Any", "Villa", "Chalet", "Cabin", "Penthouse"];

export const PRICE_OPTIONS: Record<Mode, (number | null)[]> = {
  buy: [300000, 500000, 750000, 1000000, 1500000, null],
  rent: [3000, 5000, 8000, 10000, null],
};

export const PRICE_DEFAULT: Record<Mode, number> = { buy: 300000, rent: 3000 };

export const DEFAULT_FILTERS: Filters = {
  location: "Arizona",
  type: "Villa",
  maxPrice: 300000,
};

export const getProperty = (id: string): Property =>
  PROPERTIES.find((p) => p.id === id) ?? PROPERTIES[0];

export const priceFor = (p: Property, mode: Mode) => (mode === "buy" ? p.price : p.rent);

export const matchesFilters = (p: Property, f: Filters, mode: Mode) =>
  (f.location === "Any" || p.region === f.location) &&
  (f.type === "Any" || p.type === f.type) &&
  (f.maxPrice === null || priceFor(p, mode) <= f.maxPrice);
