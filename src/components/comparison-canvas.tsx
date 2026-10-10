import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { Dices, Focus, Minus, Plus, Tag } from "lucide-react";
import { ObjectVisual } from "@/components/object-visual";
import { Button } from "@/components/ui/button";
import { formatMeters, formatObjectSize } from "@/lib/format";
import { PRESET_SCENES, objectImageSrc, visualWidthM, type CatalogObject } from "@/lib/types";
import type { CanvasItem } from "@/lib/store";
import { cn } from "@/lib/utils";

type Camera = {
  originX: number;
  pxPerMeter: number;
};

const GROUND_PAD = 56;
const TOP_PAD = 72;

function niceScale(pxPerMeter: number) {
  const ppm = Math.max(pxPerMeter, 1e-32);
  const targetPx = 120;
  const rawM = targetPx / ppm;
  const pow = Math.pow(10, Math.floor(Math.log10(rawM)));
  const n = rawM / pow;
  const nice = n >= 5 ? 5 : n >= 2 ? 2 : 1;
  const meters = nice * pow;
  return { meters, px: meters * ppm };
}

function boundsOf(items: CanvasItem[]) {
  if (items.length === 0) return null;
  let minX = Infinity;
  let maxX = -Infinity;
  let maxH = 0;
  for (const item of items) {
    const half = visualWidthM(item.object) / 2;
    minX = Math.min(minX, item.x - half);
    maxX = Math.max(maxX, item.x + half);
    maxH = Math.max(maxH, item.object.heightM);
  }
  return { minX, maxX, maxH, span: Math.max(maxX - minX, maxH * 0.05) };
}

function fitCamera(items: CanvasItem[], width: number, height: number): Camera {
  const b = boundsOf(items);
  if (!b || width < 8 || height < 8) {
    return { originX: 0, pxPerMeter: 80 };
  }
  const usableW = width * 0.86;
  const usableH = Math.max(40, height - GROUND_PAD - TOP_PAD);
  const pxPerMeter = Math.min(usableW / b.span, usableH / b.maxH) * 0.92;
  return { originX: (b.minX + b.maxX) / 2, pxPerMeter: Math.max(pxPerMeter, 1e-24) };
}

export function ComparisonCanvas({
  items,
  catalog,
  silhouette,
  labels,
  selectedId,
  onSelect,
  onMove,
  onFocusRequest,
  onToggleLabels,
  onSurprise,
  onPreset,
  className,
}: {
  items: CanvasItem[];
  catalog: CatalogObject[];
  silhouette: boolean;
  labels: boolean;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onMove: (id: string, x: number) => void;
  onFocusRequest: (handler: (id: string) => void) => void;
  onToggleLabels: () => void;
  onSurprise: () => void;
  onPreset: (slugs: string[]) => void;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 800, h: 600 });
  const [camera, setCamera] = useState<Camera>({ originX: 0, pxPerMeter: 40 });
  const userCam = useRef(false);
  const drag = useRef<{
    mode: "pan" | "item";
    id?: string;
    startX: number;
    originX: number;
    itemX: number;
  } | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect;
      if (!r) return;
      setSize({ w: r.width, h: r.height });
    });
    ro.observe(el);
    setSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  const refit = useCallback(() => {
    userCam.current = false;
    setCamera(fitCamera(items, size.w, size.h));
  }, [items, size.w, size.h]);

  useEffect(() => {
    if (!userCam.current) setCamera(fitCamera(items, size.w, size.h));
  }, [items, size.w, size.h]);

  const focusItem = useCallback(
    (id: string) => {
      const item = items.find((i) => i.instanceId === id);
      if (!item) return;
      userCam.current = true;
      const usableH = Math.max(40, size.h - GROUND_PAD - TOP_PAD);
      const pxPerMeter = (usableH * 0.78) / item.object.heightM;
      setCamera({ originX: item.x, pxPerMeter: Math.max(pxPerMeter, 1e-24) });
      onSelect(id);
    },
    [items, size.h, onSelect],
  );

  useEffect(() => {
    onFocusRequest(focusItem);
  }, [onFocusRequest, focusItem]);

  const toScreenX = useCallback(
    (worldX: number) => (worldX - camera.originX) * camera.pxPerMeter + size.w / 2,
    [camera.originX, camera.pxPerMeter, size.w],
  );

  const zoomAt = useCallback((factor: number, cx: number) => {
    setCamera((cam) => {
      const worldAtCursor = cam.originX + (cx - size.w / 2) / cam.pxPerMeter;
      const next = Math.min(Math.max(cam.pxPerMeter * factor, 1e-28), 1e10);
      const originX = worldAtCursor - (cx - size.w / 2) / next;
      return { originX, pxPerMeter: next };
    });
    userCam.current = true;
  }, [size.w]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const factor = Math.exp(-e.deltaY * 0.0015);
      zoomAt(factor, cx);
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [zoomAt]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("button, a, input") && !target.closest("[data-instance]")) return;
    const id = target.closest("[data-instance]")?.getAttribute("data-instance");
    e.currentTarget.setPointerCapture(e.pointerId);
    if (id) {
      onSelect(id);
      const item = items.find((i) => i.instanceId === id);
      drag.current = {
        mode: "item",
        id,
        startX: e.clientX,
        originX: camera.originX,
        itemX: item?.x ?? 0,
      };
    } else {
      onSelect(null);
      drag.current = {
        mode: "pan",
        startX: e.clientX,
        originX: camera.originX,
        itemX: 0,
      };
    }
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    if (d.mode === "pan") {
      userCam.current = true;
      setCamera((cam) => ({ ...cam, originX: d.originX - dx / cam.pxPerMeter }));
    } else if (d.id) {
      onMove(d.id, d.itemX + dx / camera.pxPerMeter);
    }
  };

  const onPointerUp = () => {
    drag.current = null;
  };

  const scale = niceScale(camera.pxPerMeter);
  const tiny = useMemo(() => {
    return items.filter((i) => i.object.heightM * camera.pxPerMeter < 3);
  }, [items, camera.pxPerMeter]);

  return (
    <div
      ref={rootRef}
      className={cn("relative min-h-0 flex-1 overflow-hidden bg-bg select-none touch-none", silhouette && "sil", className)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div
        className="pointer-events-none absolute inset-x-0"
        style={{
          top: 0,
          bottom: GROUND_PAD,
          background:
            "linear-gradient(180deg, #09090b 0%, #0c0c10 55%, #12141a 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 border-t border-border"
        style={{ bottom: GROUND_PAD, height: GROUND_PAD, background: "#0b0b0e" }}
      />

      {items.length === 0 ? (
        <EmptyState catalog={catalog} onSurprise={onSurprise} onPreset={onPreset} />
      ) : (
        items.map((item) => {
          const visW = visualWidthM(item.object);
          const w = visW * camera.pxPerMeter;
          const h = item.object.heightM * camera.pxPerMeter;
          const left = toScreenX(item.x) - w / 2;
          const tooSmall = h < 2 && w < 2;
          if (tooSmall) {
            const sx = toScreenX(item.x);
            if (sx < -40 || sx > size.w + 40) return null;
            return (
              <button
                key={item.instanceId}
                type="button"
                data-instance={item.instanceId}
                className="absolute z-10 flex flex-col items-center"
                style={{ left: sx, bottom: GROUND_PAD, transform: "translateX(-50%)" }}
                onClick={(e) => {
                  e.stopPropagation();
                  focusItem(item.instanceId);
                }}
              >
                <span className="mb-1 max-w-28 truncate rounded-sm bg-bg-elevated px-1.5 py-0.5 text-[10px] text-muted shadow-[var(--shadow-border)]">
                  {item.object.name}
                </span>
                <span className="block size-1.5 rounded-full bg-primary" />
              </button>
            );
          }
          if (left + w < -80 || left > size.w + 80) return null;
          const drawH = Math.min(h, 8192);
          const drawW = Math.min(w, 8192);
          const hasPhoto = Boolean(objectImageSrc(item.object));
          return (
            <div
              key={item.instanceId}
              data-instance={item.instanceId}
              className={cn(
                "absolute cursor-grab touch-none",
                selectedId === item.instanceId && "z-20",
              )}
              style={{
                left: toScreenX(item.x),
                bottom: GROUND_PAD,
                width: hasPhoto ? undefined : drawW,
                height: drawH,
                transform: "translateX(-50%)",
                zIndex: selectedId === item.instanceId ? 20 : 5,
              }}
            >
              <ObjectVisual object={item.object} silhouette={silhouette} fit={hasPhoto ? "height" : "contain"} />
              {labels && drawW > 28 ? (
                <div
                  className="pointer-events-none absolute top-full left-1/2 mt-1.5 -translate-x-1/2 text-center"
                  style={{ minWidth: 64 }}
                >
                  <div className="truncate text-[11px] font-medium text-fg">{item.object.name}</div>
                  <div className="font-mono text-[10px] text-subtle tabular-nums">
                    {formatObjectSize(item.object)}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })
      )}

      <div className="pointer-events-none absolute top-3 left-3 z-30 flex flex-wrap items-center gap-1.5">
        <div className="pointer-events-auto flex items-center gap-1 rounded-md bg-bg-elevated/90 p-1 shadow-[var(--shadow-border)] backdrop-blur-sm">
          <Button type="button" size="icon-sm" variant="ghost" onClick={() => zoomAt(1.25, size.w / 2)} aria-label="Zoom in">
            <Plus />
          </Button>
          <Button type="button" size="icon-sm" variant="ghost" onClick={() => zoomAt(1 / 1.25, size.w / 2)} aria-label="Zoom out">
            <Minus />
          </Button>
          <Button type="button" size="icon-sm" variant="ghost" onClick={refit} aria-label="Fit all">
            <Focus />
          </Button>
          <Button
            type="button"
            size="icon-sm"
            variant={labels ? "secondary" : "ghost"}
            onClick={onToggleLabels}
            aria-label="Toggle labels"
          >
            <Tag />
          </Button>
        </div>
        <Button type="button" size="sm" variant="secondary" className="pointer-events-auto" onClick={onSurprise}>
          <Dices className="size-3.5" />
          Surprise me
        </Button>
      </div>

      {items.length > 0 ? (
        <div className="pointer-events-none absolute bottom-3 left-3 z-30 flex items-end gap-2">
          <div className="rounded-sm bg-bg-elevated/90 px-2.5 py-1.5 shadow-[var(--shadow-border)]">
            <div className="flex items-end" style={{ width: Math.max(24, scale.px) }}>
              <span className="h-2.5 w-px shrink-0 bg-fg" />
              <span className="mb-px h-px min-w-0 flex-1 bg-fg" />
              <span className="h-2.5 w-px shrink-0 bg-fg" />
            </div>
            <div className="mt-1 text-center font-mono text-[11px] text-muted tabular-nums">
              {formatMeters(scale.meters)}
            </div>
          </div>
          {tiny.length > 0 ? (
            <span className="max-w-64 truncate rounded-sm bg-bg-elevated/90 px-2 py-1.5 text-[11px] text-subtle shadow-[var(--shadow-border)]">
              {tiny.length} hidden at this scale — zoom in or tap the pin
            </span>
          ) : (
            <span className="hidden pb-1 text-[11px] text-subtle sm:inline">Scroll to zoom · drag to pan</span>
          )}
        </div>
      ) : null}
    </div>
  );
}

function EmptyState({
  catalog,
  onSurprise,
  onPreset,
}: {
  catalog: CatalogObject[];
  onSurprise: () => void;
  onPreset: (slugs: string[]) => void;
}) {
  const available = new Set(catalog.map((o) => o.slug));
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center p-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-medium tracking-tight text-fg sm:text-3xl">
          Add objects to start comparing
        </h1>
        <p className="mt-2 text-sm text-muted">
          Drop planets, people, buildings — anything — onto the same ground line. Scroll to zoom.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {PRESET_SCENES.filter((s) => s.slugs.every((slug) => available.has(slug))).map((scene) => (
            <Button key={scene.id} type="button" size="sm" variant="outline" onClick={() => onPreset(scene.slugs)}>
              {scene.label}
            </Button>
          ))}
        </div>
        <Button type="button" className="mt-4" onClick={onSurprise}>
          <Dices className="size-4" />
          Surprise me
        </Button>
      </div>
    </div>
  );
}
