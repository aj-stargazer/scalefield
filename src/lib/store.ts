import { create } from "zustand";
import type { CatalogObject } from "@/lib/types";
import { visualWidthM } from "@/lib/types";

export type CanvasItem = {
  instanceId: string;
  object: CatalogObject;
  /** World X of the object's center, in meters. */
  x: number;
};

type CompareState = {
  items: CanvasItem[];
  silhouette: boolean;
  labels: boolean;
  selectedId: string | null;
  setSilhouette: (value: boolean) => void;
  setLabels: (value: boolean) => void;
  select: (id: string | null) => void;
  addObject: (object: CatalogObject, x?: number) => string;
  addMany: (objects: CatalogObject[]) => void;
  removeInstance: (instanceId: string) => void;
  moveInstance: (instanceId: string, x: number) => void;
  clear: () => void;
  replaceFromSlugs: (slugs: string[], catalog: CatalogObject[]) => void;
};

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function nextX(items: CanvasItem[], widthM: number): number {
  if (items.length === 0) return 0;
  let maxRight = -Infinity;
  for (const item of items) {
    maxRight = Math.max(maxRight, item.x + visualWidthM(item.object) / 2);
  }
  const gap = Math.max(widthM * 0.18, ...items.map((i) => visualWidthM(i.object) * 0.06));
  return maxRight + gap + widthM / 2;
}

export const useCompareStore = create<CompareState>((set, get) => ({
  items: [],
  silhouette: false,
  labels: true,
  selectedId: null,
  setSilhouette: (value) => set({ silhouette: value }),
  setLabels: (value) => set({ labels: value }),
  select: (id) => set({ selectedId: id }),
  addObject: (object, x) => {
    const instanceId = uid();
    const placedX = x ?? nextX(get().items, visualWidthM(object));
    set((s) => ({
      items: [...s.items, { instanceId, object, x: placedX }],
      selectedId: instanceId,
    }));
    return instanceId;
  },
  addMany: (objects) => {
    if (objects.length === 0) return;
    set((s) => {
      const items = [...s.items];
      let selectedId = s.selectedId;
      for (const object of objects) {
        const instanceId = uid();
        const x = nextX(items, visualWidthM(object));
        items.push({ instanceId, object, x });
        selectedId = instanceId;
      }
      return { items, selectedId };
    });
  },
  removeInstance: (instanceId) =>
    set((s) => ({
      items: s.items.filter((i) => i.instanceId !== instanceId),
      selectedId: s.selectedId === instanceId ? null : s.selectedId,
    })),
  moveInstance: (instanceId, x) =>
    set((s) => ({
      items: s.items.map((i) => (i.instanceId === instanceId ? { ...i, x } : i)),
    })),
  clear: () => set({ items: [], selectedId: null }),
  replaceFromSlugs: (slugs, catalog) => {
    const bySlug = new Map(catalog.map((o) => [o.slug, o]));
    const items: CanvasItem[] = [];
    for (const slug of slugs) {
      const object = bySlug.get(slug);
      if (!object) continue;
      const x = nextX(items, object.widthM);
      items.push({ instanceId: uid(), object, x });
    }
    set({ items, selectedId: items[0]?.instanceId ?? null });
  },
}));
