import { useMemo, useState } from "react";
import { Check, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ObjectVisual } from "@/components/object-visual";
import { cn } from "@/lib/utils";
import { formatObjectSize } from "@/lib/format";
import { SORT_OPTIONS, maxDimension, type CatalogObject, type SortKey } from "@/lib/types";

const CATEGORY_ORDER = [
  "Celestial Objects",
  "Animals",
  "Humans",
  "Miscellaneous Objects",
  "Buildings",
];

function sortObjects(objects: CatalogObject[], sort: SortKey): CatalogObject[] {
  const copy = [...objects];
  if (sort === "first-added") copy.sort((a, b) => a.createdAt.localeCompare(b.createdAt) || a.id - b.id);
  else if (sort === "latest-added") copy.sort((a, b) => b.createdAt.localeCompare(a.createdAt) || b.id - a.id);
  else if (sort === "largest") copy.sort((a, b) => maxDimension(b) - maxDimension(a));
  else if (sort === "smallest") copy.sort((a, b) => maxDimension(a) - maxDimension(b));
  else {
    copy.sort((a, b) => {
      const ca = CATEGORY_ORDER.indexOf(a.category);
      const cb = CATEGORY_ORDER.indexOf(b.category);
      const ra = ca === -1 ? 99 : ca;
      const rb = cb === -1 ? 99 : cb;
      if (ra !== rb) return ra - rb;
      if (a.category !== b.category) return a.category.localeCompare(b.category);
      if (a.subcategory !== b.subcategory) return a.subcategory.localeCompare(b.subcategory);
      return a.name.localeCompare(b.name);
    });
  }
  return copy;
}

type Group = { category: string; sub: { name: string; items: CatalogObject[] }[] };

function groupDefault(objects: CatalogObject[]): Group[] {
  const map = new Map<string, Map<string, CatalogObject[]>>();
  for (const obj of objects) {
    if (!map.has(obj.category)) map.set(obj.category, new Map());
    const sub = map.get(obj.category)!;
    const key = obj.subcategory || "";
    if (!sub.has(key)) sub.set(key, []);
    sub.get(key)!.push(obj);
  }
  const cats = [...map.keys()].sort((a, b) => {
    const ia = CATEGORY_ORDER.indexOf(a);
    const ib = CATEGORY_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b);
  });
  return cats.map((category) => ({
    category,
    sub: [...map.get(category)!.entries()].map(([name, items]) => ({ name, items })),
  }));
}

function ObjectRow({
  object,
  onCanvas,
  onAdd,
}: {
  object: CatalogObject;
  onCanvas: boolean;
  onAdd: (object: CatalogObject) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onAdd(object)}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-sm px-2 py-1.5 text-left transition-colors hover:bg-bg-subtle",
        onCanvas && "bg-bg-subtle/60",
      )}
    >
      <div className="relative flex size-9 shrink-0 items-end justify-center overflow-hidden rounded-sm bg-bg shadow-[var(--shadow-border)]">
        <div className="h-[78%] w-[78%]">
          <ObjectVisual object={object} />
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm text-fg">{object.name}</div>
        <div className="font-mono text-[11px] text-subtle tabular-nums">{formatObjectSize(object)}</div>
      </div>
      {onCanvas ? <Check className="size-3.5 shrink-0 text-primary" /> : null}
    </button>
  );
}

export function CatalogPanel({
  objects,
  canvasObjectIds,
  onAdd,
  className,
}: {
  objects: CatalogObject[];
  canvasObjectIds: Set<number>;
  onAdd: (object: CatalogObject) => void;
  className?: string;
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("default");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? objects.filter(
          (o) =>
            o.name.toLowerCase().includes(q) ||
            o.category.toLowerCase().includes(q) ||
            o.subcategory.toLowerCase().includes(q),
        )
      : objects;
    return sortObjects(list, sort);
  }, [objects, query, sort]);

  const grouped = sort === "default" && !query.trim() ? groupDefault(filtered) : null;

  return (
    <div className={cn("flex min-h-0 flex-col", className)}>
      <div className="flex items-center justify-between px-3 pt-3 pb-2">
        <h2 className="text-xs font-medium tracking-wide text-muted uppercase">Object catalog</h2>
        <span className="font-mono text-[11px] text-subtle tabular-nums">
          {filtered.length}/{objects.length}
        </span>
      </div>
      <div className="flex flex-col gap-2 px-3 pb-2">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-subtle" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search objects"
            className="h-9 pl-8"
            aria-label="Search objects"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-subtle">Sort by</span>
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger className="h-8 flex-1 text-xs" aria-label="Sort catalog">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.key} value={opt.key}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <ScrollArea className="min-h-0 flex-1">
        <div className="px-2 pb-3">
          {filtered.length === 0 ? (
            <p className="px-2 py-8 text-center text-sm text-subtle">No results</p>
          ) : grouped ? (
            grouped.map((g) => {
              const catKey = g.category;
              const catOpen = !collapsed[catKey];
              return (
                <div key={g.category} className="mb-1">
                  <button
                    type="button"
                    className="flex w-full items-center gap-1 rounded-sm px-2 py-1.5 text-left text-xs font-medium text-muted hover:bg-bg-subtle hover:text-fg"
                    onClick={() => setCollapsed((c) => ({ ...c, [catKey]: !c[catKey] }))}
                  >
                    <ChevronRight className={cn("size-3.5 transition-transform", catOpen && "rotate-90")} />
                    {g.category}
                  </button>
                  {catOpen
                    ? g.sub.map((s) => {
                        const subKey = `${g.category}::${s.name}`;
                        const subOpen = !collapsed[subKey];
                        if (!s.name) {
                          return (
                            <div key={subKey} className="pl-2">
                              {s.items.map((obj) => (
                                <ObjectRow
                                  key={obj.id}
                                  object={obj}
                                  onCanvas={canvasObjectIds.has(obj.id)}
                                  onAdd={onAdd}
                                />
                              ))}
                            </div>
                          );
                        }
                        return (
                          <div key={subKey} className="pl-2">
                            <button
                              type="button"
                              className="flex w-full items-center gap-1 rounded-sm px-2 py-1 text-left text-[11px] font-medium text-subtle hover:bg-bg-subtle hover:text-muted"
                              onClick={() => setCollapsed((c) => ({ ...c, [subKey]: !c[subKey] }))}
                            >
                              <ChevronRight
                                className={cn("size-3 transition-transform", subOpen && "rotate-90")}
                              />
                              {s.name}
                            </button>
                            {subOpen
                              ? s.items.map((obj) => (
                                  <ObjectRow
                                    key={obj.id}
                                    object={obj}
                                    onCanvas={canvasObjectIds.has(obj.id)}
                                    onAdd={onAdd}
                                  />
                                ))
                              : null}
                          </div>
                        );
                      })
                    : null}
                </div>
              );
            })
          ) : (
            filtered.map((obj) => (
              <ObjectRow key={obj.id} object={obj} onCanvas={canvasObjectIds.has(obj.id)} onAdd={onAdd} />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
