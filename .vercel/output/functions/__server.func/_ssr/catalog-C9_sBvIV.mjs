import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { f as slugify, i as STOCK_IMAGE_KEYS, o as UNIT_TO_METERS, s as VISUAL_KINDS } from "./format-YIbaSV8N.mjs";
import { a as object, i as number, n as array, o as string, r as literal, s as union, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-C9_sBvIV.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function toObject(row) {
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
		sourceNote: row.source_note,
		isSeed: Boolean(row.is_seed),
		createdAt: typeof row.created_at === "string" ? row.created_at : row.created_at.toISOString()
	};
}
var listObjects_createServerFn_handler = createServerRpc({
	id: "55fe9ce06b8f146cc1bd946156de719d3378f775e54215c6554ec80ae3d8a904",
	name: "listObjects",
	filename: "src/lib/catalog.ts"
}, (opts) => listObjects.__executeServer(opts));
var listObjects = createServerFn({ method: "GET" }).handler(listObjects_createServerFn_handler, async () => {
	const { getSql } = await import("./db-CCsWm0jP.mjs");
	return (await (await getSql())`
    select id, slug, name, category, subcategory, width_m, height_m, depth_m,
           visual_kind, color, image_key, source_note, is_seed, created_at
    from comparison_objects
    order by category, subcategory, name
  `).map(toObject);
});
var contributeSchema = object({
	name: string().trim().min(1).max(80),
	category: string().trim().min(1).max(40),
	subcategory: string().trim().max(40).optional().default(""),
	width: number().positive().max(0xde0b6b3a7640000),
	height: number().positive().max(0xde0b6b3a7640000),
	depth: number().positive().max(0xde0b6b3a7640000),
	unit: string(),
	visualKind: _enum(VISUAL_KINDS),
	color: string().regex(/^#[0-9a-fA-F]{6}$/),
	imageKey: union([literal(""), _enum(STOCK_IMAGE_KEYS)]).optional().default(""),
	sourceNote: string().trim().max(160).optional().default("")
});
var contributeObject_createServerFn_handler = createServerRpc({
	id: "dd82e28fa264ca0a6e9d07da9c5270674e2f01f9ffbb664d70e9550674a4ba9e",
	name: "contributeObject",
	filename: "src/lib/catalog.ts"
}, (opts) => contributeObject.__executeServer(opts));
var contributeObject = createServerFn({ method: "POST" }).validator((data) => contributeSchema.parse(data)).handler(contributeObject_createServerFn_handler, async ({ data }) => {
	const factor = UNIT_TO_METERS[data.unit];
	if (!factor) throw new Error("Unknown unit");
	const widthM = data.width * factor;
	const heightM = data.height * factor;
	const depthM = data.depth * factor;
	if (![
		widthM,
		heightM,
		depthM
	].every((n) => Number.isFinite(n) && n > 0)) throw new Error("Dimensions must be finite and positive");
	if (Math.max(widthM, heightM, depthM) > 0xde0b6b3a7640000) throw new Error("Object is too large to store");
	const { getSql } = await import("./db-CCsWm0jP.mjs");
	const sql = await getSql();
	let slug = slugify(data.name);
	const existing = await sql`
      select slug from comparison_objects where slug like ${slug + "%"}
    `;
	const taken = new Set(existing.map((r) => r.slug));
	if (taken.has(slug)) {
		let i = 2;
		while (taken.has(`${slug}-${i}`)) i += 1;
		slug = `${slug}-${i}`;
	}
	const row = (await sql`
      insert into comparison_objects
        (slug, name, category, subcategory, width_m, height_m, depth_m, visual_kind, color, image_key, source_note, is_seed)
      values
        (${slug}, ${data.name}, ${data.category}, ${data.subcategory ?? ""},
         ${widthM}, ${heightM}, ${depthM}, ${data.visualKind}, ${data.color},
         ${data.imageKey ?? ""}, ${data.sourceNote || null}, false)
      returning id, slug, name, category, subcategory, width_m, height_m, depth_m,
                visual_kind, color, image_key, source_note, is_seed, created_at
    `)[0];
	if (!row) throw new Error("Failed to save object");
	return toObject(row);
});
var restoreItemSchema = object({
	slug: string().trim().min(1).max(80),
	name: string().trim().min(1).max(80),
	category: string().trim().min(1).max(40),
	subcategory: string().trim().max(40).optional().default(""),
	widthM: number().positive().max(0xde0b6b3a7640000),
	heightM: number().positive().max(0xde0b6b3a7640000),
	depthM: number().positive().max(0xde0b6b3a7640000),
	visualKind: _enum(VISUAL_KINDS),
	color: string().regex(/^#[0-9a-fA-F]{6}$/),
	imageKey: string().max(80).optional().default(""),
	sourceNote: string().max(160).nullable().optional()
});
var restoreCommunity_createServerFn_handler = createServerRpc({
	id: "ffa08e7278935fda3bcb0bf1c96a3689e3e30ae51f272aba43cd809eac51435c",
	name: "restoreCommunity",
	filename: "src/lib/catalog.ts"
}, (opts) => restoreCommunity.__executeServer(opts));
var restoreCommunity = createServerFn({ method: "POST" }).validator((data) => object({ objects: array(restoreItemSchema).max(40) }).parse(data)).handler(restoreCommunity_createServerFn_handler, async ({ data }) => {
	const { getSql } = await import("./db-CCsWm0jP.mjs");
	const sql = await getSql();
	let restored = 0;
	for (const obj of data.objects) {
		const imageKey = STOCK_IMAGE_KEYS.includes(obj.imageKey ?? "") ? obj.imageKey ?? "" : "";
		if ((await sql`
        insert into comparison_objects
          (slug, name, category, subcategory, width_m, height_m, depth_m, visual_kind, color, image_key, source_note, is_seed)
        values
          (${obj.slug}, ${obj.name}, ${obj.category}, ${obj.subcategory ?? ""},
           ${obj.widthM}, ${obj.heightM}, ${obj.depthM}, ${obj.visualKind}, ${obj.color},
           ${imageKey}, ${obj.sourceNote || null}, false)
        on conflict (slug) do nothing
        returning slug
      `).length) restored += 1;
	}
	return { restored };
});
//#endregion
export { contributeObject_createServerFn_handler, listObjects_createServerFn_handler, restoreCommunity_createServerFn_handler };
