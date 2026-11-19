/* ═════════════ RÉGLAGES (à modifier ici) ═════════════ */
export const CONFIG = {
  whatsapp: "33602567474", // numéro WhatsApp au format international, sans + ni espaces
  cutoffHour: 14, // heure limite pour la livraison le jour même
  freeFrom: 40, // livraison offerte à partir de ce montant (€)
  ship: { jour: 3.9, lendemain: 1.9, retrait: 0 },
  // Paiement par carte SumUp : mets NEXT_PUBLIC_SUMUP_ENABLED=true sur Vercel
  // une fois SUMUP_API_KEY et SUMUP_MERCHANT_CODE ajoutés. Sinon seule la commande WhatsApp s'affiche.
  sumupEnabled: process.env.NEXT_PUBLIC_SUMUP_ENABLED === "true",
};

export const LENGTHS = [
  { id: "courte", label: "Courte", packs: 3 },
  { id: "mi", label: "Mi-longue", packs: 5 },
  { id: "longue", label: "Longue", packs: 7 },
];

export const PRICES: Record<string, Record<string, number>> = {
  meches: { courte: 18, mi: 25, longue: 32 },
  complete: { courte: 30, mi: 37, longue: 44 },
};

export const COLORS = [
  { id: "1B", label: "Noir naturel", hex: "#1b1612" },
  { id: "2", label: "Brun foncé", hex: "#3b2618" },
  { id: "4", label: "Châtain", hex: "#5e3a22" },
  { id: "27", label: "Miel", hex: "#b9772f" },
  { id: "30", label: "Cuivré", hex: "#8f4421" },
  { id: "613", label: "Blond", hex: "#e6cf96" },
];

export const ACC: Record<string, { name: string; price: number; icon: string; desc: string }> = {
  perles: { name: "Lot de perles (50)", price: 3, icon: "✨", desc: "Perles dorées et colorées pour finir tes nattes." },
  enfile: { name: "Enfile-perles", price: 2, icon: "🪡", desc: "Pour passer les perles en quelques secondes." },
  aiguille: { name: "Aiguille crochet", price: 2, icon: "🪝", desc: "Aiguille à clapet pour poser tes mèches crochet." },
  peigne: { name: "Peigne queue de rat", price: 2.5, icon: "🪮", desc: "Pour des raies nettes et des sections propres." },
  gel: { name: "Gel edges", price: 5, icon: "🫙", desc: "Tenue forte sans effet carton." },
  huile: { name: "Huile cuir chevelu", price: 6, icon: "💧", desc: "Apaise les démangeaisons sous les tresses." },
  mousse: { name: "Mousse fixante", price: 7, icon: "🫧", desc: "Lisse les frisottis et scelle les tresses." },
  bonnet: { name: "Bonnet satin", price: 7, icon: "🧢", desc: "Protège ta coiffure la nuit pour qu'elle dure plus longtemps." },
};

export type Box = {
  id: string;
  name: string;
  category: string;
  catLabel: string;
  subtitle: string;
  badge: string | null;
  badgeClass: string;
  diff: number;
  duration: string;
  img: string;
  desc: string;
  meches: string;
  acc: string[];
  packPrice: number;
  soon?: boolean;
};

export const BOXES: Box[] = [
  {
    id: "knotless",
    name: "Knotless Braids",
    category: "tresses",
    catLabel: "Coiffure tressée",
    subtitle: "Légères, naturelles, sans nœuds",
    badge: "⭐ Best-seller",
    badgeClass: "badge-pop",
    diff: 2,
    duration: "4–6h",
    img: "/boxes/knoletss.jpg",
    desc: "La coiffure tendance par excellence. Légères sur le cuir chevelu, sans nœud à la racine : elles durent jusqu'à 8 semaines et s'adaptent à tous les styles.",
    meches: "pré-étirées",
    acc: ["peigne", "gel", "mousse", "bonnet"],
    packPrice: 15,
  },
  {
    id: "nattes-perles",
    name: "Nattes avec Perles",
    category: "tresses",
    catLabel: "Coiffure tressée",
    subtitle: "Élégantes & personnalisables",
    badge: "Nouveau",
    badgeClass: "badge-new",
    diff: 2,
    duration: "3–5h",
    img: "/boxes/natte.jpg",
    desc: "Des nattes classiques sublimées par des perles dorées ou colorées. La box complète inclut les perles et l'enfile-perles pour personnaliser entièrement ta coiffure.",
    meches: "pré-étirées",
    acc: ["perles", "enfile", "peigne", "gel", "mousse"],
    packPrice: 15,
  },
  {
    id: "crochet",
    name: "Crochet Braids",
    category: "crochet",
    catLabel: "Crochet",
    subtitle: "Rapide, volumineuse & protectrice",
    badge: "⚡ Rapide",
    badgeClass: "badge-excl",
    diff: 1,
    duration: "1–2h",
    img: "/boxes/crochet.jpg",
    desc: "La technique crochet est parfaite si tu veux un résultat rapide et impressionnant. En 1 à 2h, tu obtiens une coiffure volumineuse et protectrice qui dure des semaines.",
    meches: "pré-bouclées",
    acc: ["aiguille", "peigne", "gel", "huile", "bonnet"],
    packPrice: 15,
  },
  {
    id: "french-curls",
    name: "French Curls",
    category: "tresses",
    catLabel: "Coiffure tressée",
    subtitle: "Élégantes & bouclées",
    badge: "Bientôt",
    badgeClass: "badge-new",
    diff: 2,
    duration: "6–8h",
    img: "/boxes/french.jpg",
    desc: "Bientôt disponible.",
    meches: "bouclées",
    acc: [],
    packPrice: 0,
    soon: true,
  },
  {
    id: "twist-vanille",
    name: "Twist Vanille",
    category: "twists",
    catLabel: "Coiffure twistée",
    subtitle: "Douceur & élégance naturelle",
    badge: "Bientôt",
    badgeClass: "badge-tend",
    diff: 1,
    duration: "2–4h",
    img: "/boxes/twist%20vanille.jpg",
    desc: "Bientôt disponible.",
    meches: "twist",
    acc: [],
    packPrice: 0,
    soon: true,
  },
  {
    id: "boho-braids",
    name: "Boho Braids",
    category: "boho",
    catLabel: "Style Boho",
    subtitle: "Libre & romantique",
    badge: "Bientôt",
    badgeClass: "badge-excl",
    diff: 3,
    duration: "5–8h",
    img: "/boxes/braid%201.jpg",
    desc: "Bientôt disponible.",
    meches: "boho",
    acc: [],
    packPrice: 0,
    soon: true,
  },
];

export const eur = (n: number) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }) + "€";

export const accValue = (ids: string[]) => ids.reduce((s, id) => s + ACC[id].price, 0);

export type ShipChoice = "jour" | "lendemain" | "retrait";
export const SHIP_LABELS: Record<ShipChoice, string> = {
  jour: "Le jour même",
  lendemain: "Le lendemain",
  retrait: "Retrait en main propre",
};

/** Retrouve un article à partir de sa clé (box-…, acc-…, pack-…). Sert aussi au serveur pour recalculer les prix. */
export function resolveItem(key: string): { name: string; detail: string; price: number; img: string } | null {
  const parts = key.split("-");
  if (key.startsWith("acc-")) {
    const a = ACC[key.slice(4)];
    return a ? { name: a.name, detail: "Accessoire", price: a.price, img: "" } : null;
  }
  if (key.startsWith("pack-")) {
    const b = BOXES.find((x) => x.id === key.slice(5) && !x.soon);
    return b ? { name: "Pack accessoires " + b.name, detail: b.acc.map((a) => ACC[a].name).join(", "), price: b.packPrice, img: b.img } : null;
  }
  if (key.startsWith("box-")) {
    // box-<id>-<formule>-<longueur>-<couleur> ; l'id peut contenir des tirets
    const color = parts[parts.length - 1];
    const length = parts[parts.length - 2];
    const formula = parts[parts.length - 3];
    const id = parts.slice(1, parts.length - 3).join("-");
    const b = BOXES.find((x) => x.id === id && !x.soon);
    const L = LENGTHS.find((l) => l.id === length);
    if (!b || !L || !PRICES[formula] || !COLORS.some((c) => c.id === color)) return null;
    return {
      name: `${formula === "complete" ? "Box complète" : "Box mèches"} ${b.name}`,
      detail: `${L.label} (${L.packs} paquets) · couleur ${color}`,
      price: PRICES[formula][length],
      img: b.img,
    };
  }
  return null;
}

export function shipCostFor(ship: ShipChoice, subtotal: number) {
  return ship === "retrait" || subtotal >= CONFIG.freeFrom ? 0 : CONFIG.ship[ship];
}
