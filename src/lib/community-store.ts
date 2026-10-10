import { mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { Sql } from "@/lib/db";

const SAFE_SLUG = /^[a-z0-9-]{1,80}$/;
const IMAGE_EXT = ["png", "jpg", "webp", "gif"] as const;

function rootDir() {
  return path.join(process.cwd(), "data", "community");
}
function manifestPath() {
  return path.join(rootDir(), "objects.json");
}
function imageDir() {
  return path.join(rootDir(), "images");
}
function publicDir() {
  return path.join(process.cwd(), "public", "objects", "community");
}

export type DiskObject = {
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  widthM: number;
  heightM: number;
  depthM: number;
  visualKind: string;
  color: string;
  imageFile: string | null;
  imageMime: string | null;
  imageAspect: number | null;
  sourceNote: string | null;
  createdAt: string | null;
};

function toBuffer(data: unknown): Buffer | null {
  if (!data) return null;
  if (typeof Buffer !== "undefined" && Buffer.isBuffer(data)) return data;
  if (data instanceof Uint8Array) return Buffer.from(data);
  if (typeof data === "string") {
    if (data.startsWith("\\x")) return Buffer.from(data.slice(2), "hex");
    if (data.length > 0) {
      try {
        return Buffer.from(data, "base64");
      } catch {
        return null;
      }
    }
  }
  return null;
}

function extForMime(mime: string | null): (typeof IMAGE_EXT)[number] {
  if (mime === "image/jpeg") return "jpg";
  if (mime === "image/webp") return "webp";
  if (mime === "image/gif") return "gif";
  return "png";
}

function readManifest(): DiskObject[] {
  try {
    const parsed = JSON.parse(readFileSync(manifestPath(), "utf8")) as { objects?: DiskObject[] };
    return Array.isArray(parsed?.objects) ? parsed.objects : [];
  } catch {
    return [];
  }
}

function writePublicCopy(filename: string, bytes: Buffer) {
  mkdirSync(publicDir(), { recursive: true });
  const dest = path.join(publicDir(), filename);
  if (!dest.startsWith(publicDir())) return;
  writeFileSync(dest, bytes);
}

/** Copy saved community rows back into a fresh database (preview restarts). */
export async function restoreCommunitySnapshot(sql: Sql) {
  const objects = readManifest().filter((o) => o?.slug && SAFE_SLUG.test(o.slug));
  for (const obj of objects.slice(0, 80)) {
    try {
      const existing = await sql<{ slug: string }>`
        select slug from comparison_objects where slug = ${obj.slug} limit 1
      `;
      if (existing.length) continue;
      let bytes: Buffer | null = null;
      let imageKey = "";
      if (obj.imageFile && /^[a-z0-9-]+\.(png|jpg|webp|gif)$/.test(obj.imageFile)) {
        try {
          bytes = readFileSync(path.join(imageDir(), obj.imageFile));
          writePublicCopy(obj.imageFile, bytes);
          imageKey = `community/${obj.imageFile}`;
        } catch {
          bytes = null;
        }
      }
      await sql.query(
        `insert into comparison_objects
          (slug, name, category, subcategory, width_m, height_m, depth_m,
           visual_kind, color, image_key, image_mime, image_data, image_aspect, source_note, is_seed, created_at)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,false, coalesce($15::timestamptz, now()))
         on conflict (slug) do nothing`,
        [
          obj.slug,
          obj.name,
          obj.category,
          obj.subcategory ?? "",
          obj.widthM,
          obj.heightM,
          obj.depthM,
          obj.visualKind,
          obj.color,
          imageKey,
          obj.imageMime,
          bytes,
          obj.imageAspect,
          obj.sourceNote,
          obj.createdAt,
        ],
      );
    } catch (err) {
      console.warn("[community] restore skipped", obj.slug, err);
    }
  }
}

/** Write every community object into data/community so it survives a preview restart. */
export async function persistCommunitySnapshot(sql: Sql) {
  const rows = await sql<{
    slug: string;
    name: string;
    category: string;
    subcategory: string;
    width_m: number;
    height_m: number;
    depth_m: number;
    visual_kind: string;
    color: string;
    image_mime: string | null;
    image_data: unknown;
    image_aspect: number | null;
    source_note: string | null;
    created_at: string | Date;
  }>`
    select slug, name, category, subcategory, width_m, height_m, depth_m,
           visual_kind, color, image_mime, image_data, image_aspect, source_note, created_at
    from comparison_objects
    where is_seed = false
    order by created_at
  `;

  mkdirSync(imageDir(), { recursive: true });
  mkdirSync(publicDir(), { recursive: true });
  const keep = new Set<string>();
  const objects: DiskObject[] = [];

  for (const row of rows.slice(0, 80)) {
    if (!SAFE_SLUG.test(row.slug)) continue;
    const bytes = toBuffer(row.image_data);
    let imageFile: string | null = null;
    if (bytes && bytes.length > 0) {
      imageFile = `${row.slug}.${extForMime(row.image_mime)}`;
      writeFileSync(path.join(imageDir(), imageFile), bytes);
      writePublicCopy(imageFile, bytes);
      keep.add(imageFile);
      const imageKey = `community/${imageFile}`;
      await sql`
        update comparison_objects set image_key = ${imageKey} where slug = ${row.slug} and is_seed = false
      `;
    } else {
      await sql`
        update comparison_objects set image_key = '' where slug = ${row.slug} and is_seed = false and image_key like 'community/%'
      `;
    }
    const created =
      typeof row.created_at === "string" ? row.created_at : row.created_at.toISOString();
    objects.push({
      slug: row.slug,
      name: row.name,
      category: row.category,
      subcategory: row.subcategory ?? "",
      widthM: Number(row.width_m),
      heightM: Number(row.height_m),
      depthM: Number(row.depth_m),
      visualKind: row.visual_kind,
      color: row.color,
      imageFile,
      imageMime: row.image_mime,
      imageAspect: row.image_aspect == null ? null : Number(row.image_aspect),
      sourceNote: row.source_note,
      createdAt: created,
    });
  }

  for (const dir of [imageDir(), publicDir()]) {
    let names: string[] = [];
    try {
      names = readdirSync(dir);
    } catch {
      names = [];
    }
    for (const name of names) {
      if (!keep.has(name)) {
        try {
          unlinkSync(path.join(dir, name));
        } catch {
          /* ignore */
        }
      }
    }
  }

  writeFileSync(manifestPath(), JSON.stringify({ objects }, null, 2));
}
