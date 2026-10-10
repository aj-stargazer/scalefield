import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { UNIT_TO_METERS, VISUAL_KINDS } from "@/lib/types";
import { slugify } from "@/lib/format";
import type { CatalogObject } from "@/lib/types";

type ObjectRow = {
  id: number;
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  width_m: number;
  height_m: number;
  depth_m: number;
  visual_kind: string;
  color: string;
  image_key: string | null;
  image_aspect: number | null;
  source_note: string | null;
  is_seed: boolean;
  created_at: string | Date;
};

function toObject(row: ObjectRow): CatalogObject {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    subcategory: row.subcategory ?? "",
    widthM: Number(row.width_m),
    heightM: Number(row.height_m),
    depthM: Number(row.depth_m),
    visualKind: row.visual_kind,
    color: row.color,
    imageKey: row.image_key ?? "",
    imageAspect: row.image_aspect == null ? null : Number(row.image_aspect),
    sourceNote: row.source_note,
    isSeed: Boolean(row.is_seed),
    createdAt:
      typeof row.created_at === "string"
        ? row.created_at
        : row.created_at.toISOString(),
  };
}

const SELECT = `
  id, slug, name, category, subcategory, width_m, height_m, depth_m,
  visual_kind, color, image_key, image_aspect, source_note, is_seed, created_at
`;

async function withSql() {
  const { getSql } = await import("@/lib/db");
  const { restoreCommunitySnapshot, persistCommunitySnapshot } = await import("@/lib/community-store");
  const sql = await getSql();
  return { sql, restoreCommunitySnapshot, persistCommunitySnapshot };
}

function decodeImage(dataUrl: string | null | undefined): {
  bytes: Buffer | null;
  mime: string | null;
} {
  if (!dataUrl) return { bytes: null, mime: null };
  const match = dataUrl.match(/^data:image\/(png|jpeg|jpg|webp|gif);base64,([A-Za-z0-9+/=\s]+)$/);
  if (!match) throw new Error("Use a PNG, JPEG, WebP, or GIF");
  const bytes = Buffer.from(match[2].replace(/\s/g, ""), "base64");
  if (bytes.length < 32 || bytes.length > 1_400_000) throw new Error("Image is too large");
  const kind = match[1] === "jpg" ? "jpeg" : match[1];
  return { bytes, mime: `image/${kind}` };
}

function metersFrom(data: { width: number; height: number; depth: number; unit: string }) {
  const factor = UNIT_TO_METERS[data.unit];
  if (!factor) throw new Error("Unknown unit");
  const widthM = data.width * factor;
  const heightM = data.height * factor;
  const depthM = data.depth * factor;
  if (![widthM, heightM, depthM].every((n) => Number.isFinite(n) && n > 0)) {
    throw new Error("Dimensions must be finite and positive");
  }
  if (Math.max(widthM, heightM, depthM) > 1e18) throw new Error("Object is too large to store");
  return { widthM, heightM, depthM };
}

export const listObjects = createServerFn({ method: "GET" }).handler(async () => {
  const { sql, restoreCommunitySnapshot } = await withSql();
  await restoreCommunitySnapshot(sql);
  const rows = await sql.query<ObjectRow>(
    `select ${SELECT} from comparison_objects order by category, subcategory, name`,
  );
  return rows.map(toObject);
});

const imageField = z
  .string()
  .max(1_800_000)
  .optional()
  .nullable();

const contributeSchema = z.object({
  name: z.string().trim().min(1).max(80),
  category: z.string().trim().min(1).max(40),
  subcategory: z.string().trim().max(40).optional().default(""),
  width: z.number().positive().max(1e18),
  height: z.number().positive().max(1e18),
  depth: z.number().positive().max(1e18),
  unit: z.string(),
  visualKind: z.enum(VISUAL_KINDS),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  imageDataUrl: imageField,
  imageAspect: z.number().positive().max(100).optional().nullable(),
  sourceNote: z.string().trim().max(160).optional().default(""),
});

export const contributeObject = createServerFn({ method: "POST" })
  .validator((data: unknown) => contributeSchema.parse(data))
  .handler(async ({ data }) => {
    const { widthM, heightM, depthM } = metersFrom(data);
    const image = decodeImage(data.imageDataUrl);
    const { sql, persistCommunitySnapshot } = await withSql();
    let slug = slugify(data.name);
    const existing = await sql<{ slug: string }>`
      select slug from comparison_objects where slug like ${slug + "%"}
    `;
    const taken = new Set(existing.map((r) => r.slug));
    if (taken.has(slug)) {
      let i = 2;
      while (taken.has(`${slug}-${i}`)) i += 1;
      slug = `${slug}-${i}`;
    }

    await sql.query(
      `insert into comparison_objects
        (slug, name, category, subcategory, width_m, height_m, depth_m, visual_kind, color,
         image_key, image_mime, image_data, image_aspect, source_note, is_seed)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,'',$10,$11,$12,$13,false)`,
      [
        slug,
        data.name,
        data.category,
        data.subcategory ?? "",
        widthM,
        heightM,
        depthM,
        data.visualKind,
        data.color,
        image.mime,
        image.bytes,
        image.bytes ? (data.imageAspect ?? null) : null,
        data.sourceNote || null,
      ],
    );
    await persistCommunitySnapshot(sql);
    const rows = await sql.query<ObjectRow>(
      `select ${SELECT} from comparison_objects where slug = $1`,
      [slug],
    );
    const row = rows[0];
    if (!row) throw new Error("Failed to save object");
    return toObject(row);
  });

const updateSchema = contributeSchema.extend({
  slug: z.string().trim().min(1).max(80),
  clearImage: z.boolean().optional().default(false),
});

export const updateObject = createServerFn({ method: "POST" })
  .validator((data: unknown) => updateSchema.parse(data))
  .handler(async ({ data }) => {
    const { widthM, heightM, depthM } = metersFrom(data);
    const { sql, persistCommunitySnapshot } = await withSql();
    const current = await sql<{ is_seed: boolean }>`
      select is_seed from comparison_objects where slug = ${data.slug} limit 1
    `;
    if (!current[0]) throw new Error("Object not found");
    if (current[0].is_seed) throw new Error("Built-in objects can't be edited");

    await sql.query(
      `update comparison_objects set
         name = $2, category = $3, subcategory = $4,
         width_m = $5, height_m = $6, depth_m = $7,
         visual_kind = $8, color = $9, source_note = $10
       where slug = $1 and is_seed = false`,
      [
        data.slug,
        data.name,
        data.category,
        data.subcategory ?? "",
        widthM,
        heightM,
        depthM,
        data.visualKind,
        data.color,
        data.sourceNote || null,
      ],
    );

    if (data.imageDataUrl) {
      const image = decodeImage(data.imageDataUrl);
      await sql.query(
        `update comparison_objects
         set image_mime = $2, image_data = $3, image_aspect = $4, image_key = ''
         where slug = $1 and is_seed = false`,
        [data.slug, image.mime, image.bytes, data.imageAspect ?? null],
      );
    } else if (data.clearImage) {
      await sql.query(
        `update comparison_objects
         set image_mime = null, image_data = null, image_aspect = null, image_key = ''
         where slug = $1 and is_seed = false`,
        [data.slug],
      );
    }

    await persistCommunitySnapshot(sql);
    const rows = await sql.query<ObjectRow>(
      `select ${SELECT} from comparison_objects where slug = $1`,
      [data.slug],
    );
    const row = rows[0];
    if (!row) throw new Error("Failed to save object");
    return toObject(row);
  });

export const deleteObject = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ slug: z.string().trim().min(1).max(80) }).parse(data))
  .handler(async ({ data }) => {
    const { sql, persistCommunitySnapshot } = await withSql();
    const rows = await sql<{ slug: string }>`
      delete from comparison_objects
      where slug = ${data.slug} and is_seed = false
      returning slug
    `;
    if (!rows.length) throw new Error("That object can't be deleted");
    await persistCommunitySnapshot(sql);
    return { slug: data.slug };
  });
