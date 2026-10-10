export type CatalogObject = {
  id: number;
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  widthM: number;
  heightM: number;
  depthM: number;
  visualKind: string;
  color: string;
  imageKey: string;
  imageAspect: number | null;
  sourceNote: string | null;
  isSeed: boolean;
  createdAt: string;
};

export type SortKey =
  | "default"
  | "first-added"
  | "latest-added"
  | "largest"
  | "smallest";

export const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "first-added", label: "First Added" },
  { key: "latest-added", label: "Latest Added" },
  { key: "largest", label: "Largest" },
  { key: "smallest", label: "Smallest" },
];

export const VISUAL_KINDS = [
  "sphere",
  "box",
  "building",
  "person",
  "animal",
  "vehicle",
  "device",
] as const;

export type VisualKindOption = (typeof VISUAL_KINDS)[number];

export const STOCK_IMAGES: { key: string; label: string }[] = [
  { key: "", label: "None — use shape" },
  { key: "mercury", label: "Mercury" },
  { key: "venus", label: "Venus" },
  { key: "earth", label: "Earth" },
  { key: "mars", label: "Mars" },
  { key: "jupiter", label: "Jupiter" },
  { key: "saturn", label: "Saturn" },
  { key: "neptune", label: "Neptune" },
  { key: "the-sun", label: "The Sun" },
  { key: "housecat", label: "Housecat" },
  { key: "average-man", label: "Person" },
  { key: "average-semi-truck", label: "Semi truck" },
  { key: "atari-800", label: "Atari 800" },
  { key: "empire-state-building", label: "Empire State Building" },
  { key: "willis-tower", label: "Willis Tower" },
  { key: "burj-khalifa", label: "Burj Khalifa" },
];

export const STOCK_IMAGE_KEYS = STOCK_IMAGES.map((s) => s.key).filter(Boolean) as [
  string,
  ...string[],
];

export function objectImageSrc(
  object: { imageKey?: string | null } | string | null | undefined,
): string | null {
  const imageKey = typeof object === "string" || object == null ? object : object.imageKey;
  if (!imageKey) return null;
  if ((STOCK_IMAGE_KEYS as readonly string[]).includes(imageKey)) return `/objects/${imageKey}.png`;
  if (/^community\/[a-z0-9-]+\.(png|jpg|webp|gif)$/.test(imageKey)) return `/objects/${imageKey}`;
  return null;
}

export const STOCK_IMAGE_PX: Record<string, { w: number; h: number }> = {
  "atari-800": { w: 1109, h: 374 },
  "average-man": { w: 256, h: 717 },
  "average-semi-truck": { w: 759, h: 151 },
  "burj-khalifa": { w: 272, h: 828 },
  earth: { w: 636, h: 634 },
  "empire-state-building": { w: 142, h: 443 },
  housecat: { w: 608, h: 540 },
  jupiter: { w: 677, h: 643 },
  mars: { w: 591, h: 602 },
  mercury: { w: 579, h: 660 },
  neptune: { w: 602, h: 609 },
  saturn: { w: 1024, h: 401 },
  "the-sun": { w: 487, h: 487 },
  venus: { w: 261, h: 270 },
  "willis-tower": { w: 132, h: 527 },
};

/** On-canvas width so photo height maps 1:1 to real-world height. */
export function visualWidthM(
  obj: Pick<CatalogObject, "widthM" | "heightM" | "imageKey"> & { imageAspect?: number | null },
): number {
  if (obj.imageAspect && obj.imageAspect > 0) return obj.heightM * obj.imageAspect;
  const px = obj.imageKey ? STOCK_IMAGE_PX[obj.imageKey] : undefined;
  if (px && px.h > 0) return obj.heightM * (px.w / px.h);
  return obj.widthM;
}

export const UNIT_TO_METERS: Record<string, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1_000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1_609.344,
  au: 149_597_870_700,
};

export const UNITS = [
  { id: "mm", label: "mm" },
  { id: "cm", label: "cm" },
  { id: "m", label: "m" },
  { id: "km", label: "km" },
  { id: "in", label: "in" },
  { id: "ft", label: "ft" },
  { id: "yd", label: "yd" },
  { id: "mi", label: "mi" },
  { id: "au", label: "AU" },
] as const;

export function maxDimension(obj: Pick<CatalogObject, "widthM" | "heightM" | "depthM">) {
  return Math.max(obj.widthM, obj.heightM, obj.depthM);
}

export function isSpherical(kind: string) {
  return (
    kind === "sphere" ||
    kind === "mercury" ||
    kind === "venus" ||
    kind === "earth" ||
    kind === "mars" ||
    kind === "jupiter" ||
    kind === "saturn" ||
    kind === "uranus" ||
    kind === "neptune" ||
    kind === "the-sun" ||
    kind === "sirius" ||
    kind === "vega" ||
    kind === "pollux" ||
    kind === "arcturus"
  );
}

export const PRESET_SCENES: { id: string; label: string; slugs: string[] }[] = [
  {
    id: "inner-planets",
    label: "Inner planets",
    slugs: ["mercury", "venus", "earth", "mars"],
  },
  {
    id: "gas-giants",
    label: "Gas giants",
    slugs: ["jupiter", "saturn", "uranus", "neptune"],
  },
  {
    id: "stars",
    label: "Stars",
    slugs: ["the-sun", "sirius", "vega", "pollux", "arcturus"],
  },
  {
    id: "skyscrapers",
    label: "Skyscrapers",
    slugs: ["empire-state-building", "willis-tower", "burj-khalifa"],
  },
  {
    id: "everyday",
    label: "Everyday",
    slugs: ["housecat", "average-man", "average-semi-truck", "atari-800"],
  },
];
