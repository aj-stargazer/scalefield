import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Group as PanelGroup, Panel, Separator as PanelResizeHandle } from "react-resizable-panels";
import { Library } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { CatalogPanel } from "@/components/catalog-panel";
import { CanvasObjectsPanel } from "@/components/canvas-objects-panel";
import { ComparisonCanvas } from "@/components/comparison-canvas";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCatalog } from "@/lib/use-catalog";
import { useCompareStore } from "@/lib/store";
import { PRESET_SCENES, maxDimension, type CatalogObject } from "@/lib/types";

type Search = {
  objects?: string;
  silhouette?: string;
};

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    objects: typeof s.objects === "string" ? s.objects : undefined,
    silhouette: s.silhouette === "1" || s.silhouette === true ? "1" : undefined,
  }),
  component: Home,
});

function parseSlugs(value?: string) {
  if (!value) return [];
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function Home() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/" });
  const { data: catalog = [], isLoading } = useCatalog();

  const items = useCompareStore((s) => s.items);
  const silhouette = useCompareStore((s) => s.silhouette);
  const labels = useCompareStore((s) => s.labels);
  const selectedId = useCompareStore((s) => s.selectedId);
  const addObject = useCompareStore((s) => s.addObject);
  const removeInstance = useCompareStore((s) => s.removeInstance);
  const moveInstance = useCompareStore((s) => s.moveInstance);
  const select = useCompareStore((s) => s.select);
  const setSilhouette = useCompareStore((s) => s.setSilhouette);
  const setLabels = useCompareStore((s) => s.setLabels);
  const replaceFromSlugs = useCompareStore((s) => s.replaceFromSlugs);
  const clear = useCompareStore((s) => s.clear);

  const [catalogOpen, setCatalogOpen] = useState(false);
  const hydrated = useRef(false);
  const focusRef = useRef<(id: string) => void>(() => {});

  useEffect(() => {
    if (hydrated.current || catalog.length === 0) return;
    hydrated.current = true;
    const slugs = parseSlugs(search.objects);
    if (slugs.length) replaceFromSlugs(slugs, catalog);
    if (search.silhouette === "1") setSilhouette(true);
  }, [catalog, replaceFromSlugs, search.objects, search.silhouette, setSilhouette]);

  useEffect(() => {
    if (!hydrated.current) return;
    const objects = items.map((i) => i.object.slug).join(",") || undefined;
    const sil = silhouette ? "1" : undefined;
    if (objects === (search.objects || undefined) && sil === search.silhouette) return;
    void navigate({
      search: { objects, silhouette: sil },
      replace: true,
    });
  }, [items, silhouette, navigate, search.objects, search.silhouette]);

  const canvasObjectIds = useMemo(() => new Set(items.map((i) => i.object.id)), [items]);

  const onAdd = useCallback(
    (object: CatalogObject) => {
      addObject(object);
      setCatalogOpen(false);
    },
    [addObject],
  );

  const loadSlugs = useCallback(
    (slugs: string[]) => {
      replaceFromSlugs(slugs, catalog);
    },
    [catalog, replaceFromSlugs],
  );

  const surprise = useCallback(() => {
    if (catalog.length === 0) return;
    const ready = PRESET_SCENES.filter((s) =>
      s.slugs.every((slug) => catalog.some((o) => o.slug === slug)),
    );
    if (ready.length && Math.random() > 0.4) {
      const pick = ready[Math.floor(Math.random() * ready.length)]!;
      replaceFromSlugs(pick.slugs, catalog);
      return;
    }
    const sorted = [...catalog].sort((a, b) => maxDimension(a) - maxDimension(b));
    const window = Math.min(4, sorted.length);
    const start = Math.floor(Math.random() * Math.max(1, sorted.length - window + 1));
    replaceFromSlugs(
      sorted.slice(start, start + window).map((o) => o.slug),
      catalog,
    );
  }, [catalog, replaceFromSlugs]);

  const onFocusRequest = useCallback((handler: (id: string) => void) => {
    focusRef.current = handler;
  }, []);

  const sidebar = (
    <div className="flex h-full min-h-0 flex-col">
      <PanelGroup orientation="vertical" className="h-full">
        <Panel defaultSize="68%" minSize="30%">
          <CatalogPanel objects={catalog} canvasObjectIds={canvasObjectIds} onAdd={onAdd} className="h-full" />
        </Panel>
        <PanelResizeHandle className="h-1.5 bg-border hover:bg-primary/40" />
        <Panel defaultSize="32%" minSize="18%">
          <CanvasObjectsPanel
            items={items}
            selectedId={selectedId}
            onSelect={select}
            onRemove={removeInstance}
            onFocus={(id) => focusRef.current(id)}
            className="h-full border-t-0"
          />
        </Panel>
      </PanelGroup>
    </div>
  );

  return (
    <div className="flex h-dvh flex-col bg-bg text-fg">
        <AppHeader
          right={
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Switch
                  id="silhouette"
                  checked={silhouette}
                  onCheckedChange={setSilhouette}
                  aria-label="Silhouette mode"
                />
                <Label htmlFor="silhouette" className="hidden cursor-pointer sm:inline">
                  Silhouette
                </Label>
              </div>
              {items.length > 0 ? (
                <Button type="button" size="sm" variant="ghost" onClick={() => clear()}>
                  Clear
                </Button>
              ) : null}
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="lg:hidden"
                onClick={() => setCatalogOpen(true)}
              >
                <Library className="size-3.5" />
                Catalog
              </Button>
            </div>
          }
        />

        <div className="flex min-h-0 flex-1">
          <ComparisonCanvas
            items={items}
            catalog={catalog}
            silhouette={silhouette}
            labels={labels}
            selectedId={selectedId}
            onSelect={select}
            onMove={moveInstance}
            onFocusRequest={onFocusRequest}
            onToggleLabels={() => setLabels(!labels)}
            onSurprise={surprise}
            onPreset={loadSlugs}
          />
          <aside className="hidden w-[340px] shrink-0 border-l border-border bg-bg-elevated lg:flex lg:flex-col">
            {isLoading ? (
              <p className="p-4 text-sm text-subtle">Loading catalog…</p>
            ) : (
              sidebar
            )}
          </aside>
        </div>

        <Sheet open={catalogOpen} onOpenChange={setCatalogOpen}>
          <SheetContent side="right" className="p-0">
            <SheetHeader>
              <SheetTitle>Catalog</SheetTitle>
            </SheetHeader>
            <div className="min-h-0 flex-1">{sidebar}</div>
          </SheetContent>
        </Sheet>
      </div>
  );
}
