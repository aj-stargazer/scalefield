import type { CatalogObject } from "@/lib/types";

const KEY = "scalefield.community.v1";

export function loadLocalCommunity(): CatalogObject[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCatalogObject);
  } catch {
    return [];
  }
}

export function saveLocalCommunity(objects: CatalogObject[]) {
  if (typeof window === "undefined") return;
  const community = objects.filter((o) => !o.isSeed);
  window.localStorage.setItem(KEY, JSON.stringify(community));
}

export function upsertLocalCommunity(object: CatalogObject) {
  const next = loadLocalCommunity().filter((o) => o.slug !== object.slug);
  next.push({ ...object, isSeed: false });
  saveLocalCommunity(next);
}

function isCatalogObject(value: unknown): value is CatalogObject {
  if (!value || typeof value !== "object") return false;
  const o = value as Record<string, unknown>;
  return (
    typeof o.slug === "string" &&
    typeof o.name === "string" &&
    typeof o.category === "string" &&
    typeof o.widthM === "number" &&
    typeof o.heightM === "number" &&
    typeof o.depthM === "number" &&
    typeof o.visualKind === "string" &&
    typeof o.color === "string"
  );
}
