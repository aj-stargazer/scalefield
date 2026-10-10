import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ObjectVisual } from "@/components/object-visual";
import { contributeObject, updateObject } from "@/lib/catalog";
import { upsertLocalCommunity } from "@/lib/local-catalog";
import { objectImageSrc, UNITS, UNIT_TO_METERS, VISUAL_KINDS, type CatalogObject, type VisualKindOption } from "@/lib/types";
import { formatMeters } from "@/lib/format";

const KIND_LABEL: Record<VisualKindOption, string> = {
  sphere: "Sphere",
  box: "Box",
  building: "Building",
  person: "Person",
  animal: "Animal",
  vehicle: "Vehicle",
  device: "Device",
};

function dimInput(n: number) {
  if (!Number.isFinite(n)) return "1";
  return String(Number(n.toPrecision(8)));
}

const MAX_EDGE = 1024;

async function prepareUpload(file: File): Promise<{ dataUrl: string; aspect: number }> {
  const ok = ["image/png", "image/jpeg", "image/webp", "image/gif"];
  if (!ok.includes(file.type)) throw new Error("Use a PNG, JPEG, WebP, or GIF");
  if (file.type === "image/gif") {
    if (file.size > 1_200_000) throw new Error("GIF must be under 1.2 MB");
    const dataUrl = await readFile(file);
    const { w, h } = await measure(dataUrl);
    return { dataUrl, aspect: w / h };
  }
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not read that image");
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  const mime = file.type === "image/jpeg" ? "image/jpeg" : "image/png";
  let dataUrl = canvas.toDataURL(mime, 0.86);
  if (dataUrl.length > 1_700_000) dataUrl = canvas.toDataURL("image/jpeg", 0.8);
  if (dataUrl.length > 1_700_000) throw new Error("Image is still too large — try a smaller file");
  return { dataUrl, aspect: w / h };
}

function readFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read that image"));
    reader.readAsDataURL(file);
  });
}

function measure(src: string) {
  return new Promise<{ w: number; h: number }>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => reject(new Error("Could not read that image"));
    img.src = src;
  });
}

export function ContributeForm({
  catalog,
  editing,
  onCancelEdit,
}: {
  catalog: CatalogObject[];
  editing?: CatalogObject | null;
  onCancelEdit?: () => void;
}) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const categories = useMemo(() => {
    const set = new Set(catalog.map((o) => o.category));
    if (editing?.category) set.add(editing.category);
    return [...set].sort();
  }, [catalog, editing]);

  const [name, setName] = useState(editing?.name ?? "");
  const [category, setCategory] = useState(editing?.category ?? categories[0] ?? "Miscellaneous Objects");
  const [customCategory, setCustomCategory] = useState("");
  const [subcategory, setSubcategory] = useState(editing?.subcategory ?? "");
  const [width, setWidth] = useState(editing ? dimInput(editing.widthM) : "1");
  const [height, setHeight] = useState(editing ? dimInput(editing.heightM) : "1");
  const [depth, setDepth] = useState(editing ? dimInput(editing.depthM) : "1");
  const [unit, setUnit] = useState(editing ? "m" : "m");
  const [visualKind, setVisualKind] = useState<VisualKindOption>(
    (VISUAL_KINDS as readonly string[]).includes(editing?.visualKind ?? "")
      ? (editing!.visualKind as VisualKindOption)
      : "sphere",
  );
  const [color, setColor] = useState(editing?.color && /^#[0-9a-fA-F]{6}$/.test(editing.color) ? editing.color : "#c8ccd4");
  const [sourceNote, setSourceNote] = useState(editing?.sourceNote ?? "");
  const [upload, setUpload] = useState<{ dataUrl: string; aspect: number } | null>(null);
  const [cleared, setCleared] = useState(false);
  const [fileError, setFileError] = useState("");

  const factor = UNIT_TO_METERS[unit] ?? 1;
  const existingSrc = !cleared && !upload && editing ? objectImageSrc(editing) : null;
  const previewSrc = upload?.dataUrl ?? existingSrc;
  const previewAspect = upload?.aspect ?? editing?.imageAspect ?? null;
  const preview = {
    name: name || "New object",
    visualKind,
    color,
    imageKey: previewSrc && !upload ? editing?.imageKey : "",
    imageAspect: previewAspect,
    widthM: Math.max(0, Number(width) || 0) * factor,
    heightM: Math.max(0, Number(height) || 0) * factor,
  };

  const mutation = useMutation({
    mutationFn: () => {
      const payload = {
        name,
        category: category === "__new" ? customCategory : category,
        subcategory,
        width: Number(width),
        height: Number(height),
        depth: Number(depth),
        unit,
        visualKind,
        color,
        sourceNote,
        imageDataUrl: upload?.dataUrl ?? null,
        imageAspect: upload?.aspect ?? null,
      };
      if (editing) {
        return updateObject({
          data: { ...payload, slug: editing.slug, clearImage: cleared && !upload },
        });
      }
      return contributeObject({ data: payload });
    },
    onSuccess: async (obj) => {
      upsertLocalCommunity(obj);
      toast.success(editing ? `${obj.name} updated` : `${obj.name} added to the catalog`);
      await qc.invalidateQueries({ queryKey: ["objects"] });
      if (editing) onCancelEdit?.();
      else await navigate({ to: "/", search: { objects: obj.slug, silhouette: undefined } });
    },
    onError: (err: unknown) => {
      toast.error(err instanceof Error ? err.message : "Could not save object");
    },
  });

  return (
    <form
      className="grid gap-8 lg:grid-cols-[1fr_280px]"
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate();
      }}
    >
      <div className="flex flex-col gap-5">
        {editing ? (
          <p className="text-sm text-muted">
            Editing <span className="text-fg">{editing.name}</span>. Built-in objects stay locked — only
            community additions can be changed or removed.
          </p>
        ) : null}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name">
            <Input required maxLength={80} value={name} onChange={(e) => setName(e.target.value)} placeholder="Blue whale" />
          </Field>
          <Field label="Category">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
                <SelectItem value="__new">New category…</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          {category === "__new" ? (
            <Field label="New category">
              <Input
                required
                maxLength={40}
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Vehicles"
              />
            </Field>
          ) : null}
          <Field label="Subcategory (optional)">
            <Input
              maxLength={40}
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              placeholder="Mammals"
            />
          </Field>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-muted">Dimensions</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Field label="Width">
              <Input required type="number" min="0" step="any" value={width} onChange={(e) => setWidth(e.target.value)} />
            </Field>
            <Field label="Height">
              <Input required type="number" min="0" step="any" value={height} onChange={(e) => setHeight(e.target.value)} />
            </Field>
            <Field label="Depth">
              <Input required type="number" min="0" step="any" value={depth} onChange={(e) => setDepth(e.target.value)} />
            </Field>
            <Field label="Unit">
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {UNITS.map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      {u.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
          <p className="mt-2 font-mono text-[11px] text-subtle tabular-nums">
            Stored as {formatMeters(preview.widthM)} × {formatMeters(preview.heightM)} ×{" "}
            {formatMeters(Math.max(0, Number(depth) || 0) * factor)}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Shape">
            <Select value={visualKind} onValueChange={(v) => setVisualKind(v as VisualKindOption)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {VISUAL_KINDS.map((k) => (
                  <SelectItem key={k} value={k}>
                    {KIND_LABEL[k]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Color">
            <div className="flex h-10 items-center gap-2 rounded-sm bg-bg-subtle px-2 shadow-[var(--shadow-border)]">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="size-7 cursor-pointer rounded-sm border-0 bg-transparent"
                aria-label="Object color"
              />
              <span className="font-mono text-xs text-muted">{color}</span>
            </div>
          </Field>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Photo</Label>
          <label className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed border-border bg-bg-subtle px-4 py-6 text-center hover:bg-bg-elevated">
            <span className="text-sm text-fg">{previewSrc ? "Replace photo" : "Upload a photo"}</span>
            <span className="text-[11px] text-subtle">PNG, JPEG, WebP, or GIF. Transparent backgrounds compare cleanly.</span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="sr-only"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (!file) return;
                try {
                  setFileError("");
                  const next = await prepareUpload(file);
                  setUpload(next);
                  setCleared(false);
                } catch (err) {
                  setFileError(err instanceof Error ? err.message : "Could not use that image");
                }
              }}
            />
          </label>
          {fileError ? <p className="text-xs text-red-400">{fileError}</p> : null}
          {previewSrc ? (
            <button
              type="button"
              className="self-start text-xs text-muted underline-offset-2 hover:text-fg hover:underline"
              onClick={() => {
                setUpload(null);
                setCleared(true);
              }}
            >
              Remove photo
            </button>
          ) : (
            <p className="text-[11px] text-subtle">No photo — the shape and color are used instead.</p>
          )}
        </div>

        <Field label="Measurement source (optional)">
          <Textarea
            maxLength={160}
            value={sourceNote}
            onChange={(e) => setSourceNote(e.target.value)}
            placeholder="Wikipedia, NASA fact sheet, manufacturer spec…"
          />
        </Field>

        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving…" : editing ? "Save changes" : "Add to catalog"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => (editing ? onCancelEdit?.() : navigate({ to: "/" }))}
          >
            Cancel
          </Button>
        </div>
      </div>

      <aside className="h-fit rounded-lg bg-bg-elevated p-4 shadow-[var(--shadow-border)]">
        <p className="text-xs font-medium tracking-wide text-muted uppercase">Preview</p>
        <div className="mt-3 flex h-48 items-end justify-center overflow-hidden rounded-md bg-bg p-4">
          {upload ? (
            <img src={upload.dataUrl} alt="" className="max-h-full max-w-full object-contain object-bottom" />
          ) : (
            <div
              className="max-h-full"
              style={{
                width: 88,
                height: 88 * Math.min(2.4, Math.max(0.2, preview.heightM / Math.max(preview.widthM, 1e-9))),
              }}
            >
              <ObjectVisual object={{ name: preview.name, visualKind, color, imageKey: cleared ? "" : preview.imageKey, imageAspect: previewAspect }} />
            </div>
          )}
        </div>
        <p className="mt-3 text-sm text-fg">{preview.name}</p>
        <p className="font-mono text-xs text-subtle tabular-nums">{formatMeters(preview.heightM)} H</p>
      </aside>
    </form>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {children}
    </label>
  );
}
