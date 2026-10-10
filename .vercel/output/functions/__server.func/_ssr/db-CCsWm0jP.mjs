//#region node_modules/.nitro/vite/services/ssr/assets/db-CCsWm0jP.js
var _0002_comparison_objects_default = "-- Catalog of comparable objects. Unowned / world-writable (auth off).\ncreate table if not exists comparison_objects (\n  id            serial primary key,\n  slug          text not null unique,\n  name          text not null,\n  category      text not null,\n  subcategory   text not null default '',\n  width_m       double precision not null,\n  height_m      double precision not null,\n  depth_m       double precision not null,\n  visual_kind   text not null default 'box',\n  color         text not null default '#c8ccd4',\n  source_note   text,\n  is_seed       boolean not null default false,\n  created_at    timestamptz not null default now()\n);\n\ncreate index if not exists comparison_objects_category_idx\n  on comparison_objects (category, subcategory, name);\ncreate index if not exists comparison_objects_created_at_idx\n  on comparison_objects (created_at);\ncreate index if not exists comparison_objects_height_idx\n  on comparison_objects (height_m);\n\ninsert into comparison_objects\n  (slug, name, category, subcategory, width_m, height_m, depth_m, visual_kind, color, source_note, is_seed, created_at)\nvalues\n  ('average-man', 'Average Man', 'Humans', '', 0.46, 1.75, 0.28, 'average-man', '#c4b8a8', 'Mean adult male stature ~175 cm', true, '2024-01-02T12:00:00Z'),\n  ('housecat', 'Housecat', 'Animals', 'Mammals', 0.46, 0.25, 0.12, 'housecat', '#c9b39a', 'Domestic cat, standing shoulder height', true, '2024-01-03T12:00:00Z'),\n  ('earth', 'Earth', 'Celestial Objects', 'Planets', 12742000, 12742000, 12742000, 'earth', '#3d7cc9', 'Equatorial diameter', true, '2024-01-04T12:00:00Z'),\n  ('average-semi-truck', 'Average Semi Truck', 'Miscellaneous Objects', '', 22.0, 4.1, 2.6, 'semi-truck', '#c9ced6', 'Class 8 tractor + 53 ft trailer', true, '2024-01-05T12:00:00Z'),\n  ('atari-800', 'Atari 800', 'Miscellaneous Objects', '', 0.406, 0.114, 0.305, 'atari-800', '#6e6458', 'Original 1979 8-bit home computer', true, '2024-01-06T12:00:00Z'),\n  ('mercury', 'Mercury', 'Celestial Objects', 'Planets', 4879400, 4879400, 4879400, 'mercury', '#9a9088', 'Equatorial diameter', true, '2024-01-07T12:00:00Z'),\n  ('venus', 'Venus', 'Celestial Objects', 'Planets', 12103600, 12103600, 12103600, 'venus', '#d9c08a', 'Equatorial diameter', true, '2024-01-08T12:00:00Z'),\n  ('mars', 'Mars', 'Celestial Objects', 'Planets', 6779000, 6779000, 6779000, 'mars', '#c46a4a', 'Equatorial diameter', true, '2024-01-09T12:00:00Z'),\n  ('jupiter', 'Jupiter', 'Celestial Objects', 'Planets', 139822000, 139822000, 139822000, 'jupiter', '#d7b48a', 'Equatorial diameter', true, '2024-01-10T12:00:00Z'),\n  ('saturn', 'Saturn', 'Celestial Objects', 'Planets', 116464000, 116464000, 116464000, 'saturn', '#e6d3a8', 'Equatorial diameter (body; rings drawn to scale around it)', true, '2024-01-11T12:00:00Z'),\n  ('uranus', 'Uranus', 'Celestial Objects', 'Planets', 50724000, 50724000, 50724000, 'uranus', '#9fd0d6', 'Equatorial diameter', true, '2024-01-12T12:00:00Z'),\n  ('neptune', 'Neptune', 'Celestial Objects', 'Planets', 49244000, 49244000, 49244000, 'neptune', '#3b6ccc', 'Equatorial diameter', true, '2024-01-13T12:00:00Z'),\n  ('the-sun', 'The Sun', 'Celestial Objects', 'Stars', 1392700000, 1392700000, 1392700000, 'the-sun', '#ffcc66', 'Photospheric diameter', true, '2024-01-14T12:00:00Z'),\n  ('empire-state-building', 'Empire State Building', 'Buildings', 'Skyscrapers', 57.6, 443.2, 50.0, 'empire-state', '#b9bcc4', 'Height to antenna tip', true, '2024-01-15T12:00:00Z'),\n  ('willis-tower', 'Willis Tower', 'Buildings', 'Skyscrapers', 68.9, 442.1, 68.9, 'willis-tower', '#9aa0aa', 'Height to roof (antennas drawn above)', true, '2024-01-16T12:00:00Z'),\n  ('burj-khalifa', 'Burj Khalifa', 'Buildings', 'Skyscrapers', 90.0, 828.0, 90.0, 'burj-khalifa', '#c5c9d2', 'Architectural height to spire tip', true, '2024-01-17T12:00:00Z'),\n  ('sirius', 'Sirius', 'Celestial Objects', 'Stars', 2382909700, 2382909700, 2382909700, 'sirius', '#e8f2ff', 'Sirius A diameter (~1.71 R☉)', true, '2024-01-18T12:00:00Z'),\n  ('vega', 'Vega', 'Celestial Objects', 'Stars', 3289557400, 3289557400, 3289557400, 'vega', '#dce9ff', 'Diameter (~2.36 R☉)', true, '2024-01-19T12:00:00Z'),\n  ('pollux', 'Pollux', 'Celestial Objects', 'Stars', 12500000000, 12500000000, 12500000000, 'pollux', '#ffc07a', 'Orange giant, ~12.5 million km diameter', true, '2024-01-20T12:00:00Z'),\n  ('arcturus', 'Arcturus', 'Celestial Objects', 'Stars', 35000000000, 35000000000, 35000000000, 'arcturus', '#ff8a3d', 'K-giant, ~35 million km diameter', true, '2024-01-21T12:00:00Z')\non conflict (slug) do nothing;\n";
var _0003_images_and_heights_default = "alter table comparison_objects\n  add column if not exists image_key text not null default '';\n\n-- Tail-up housecat photo: overall height ~38 cm\nupdate comparison_objects\nset height_m = 0.38,\n    width_m = 0.50,\n    source_note = 'Domestic cat, walking with tail raised (~38 cm)'\nwhere slug = 'housecat';\n\n-- Match Empire State: height to tip (antennas), not roof\nupdate comparison_objects\nset height_m = 527,\n    source_note = 'Height to antenna tip'\nwhere slug = 'willis-tower';\n\n-- Photo includes the ring system\nupdate comparison_objects\nset width_m = 273550000,\n    source_note = 'Body diameter 116,464 km; width spans the rings'\nwhere slug = 'saturn';\n\nupdate comparison_objects set image_key = slug\nwhere slug in (\n  'atari-800',\n  'burj-khalifa',\n  'housecat',\n  'earth',\n  'empire-state-building',\n  'jupiter',\n  'average-man',\n  'mars',\n  'mercury',\n  'neptune',\n  'saturn',\n  'the-sun',\n  'average-semi-truck',\n  'venus',\n  'willis-tower'\n);\n";
/**
* Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
* (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
*
* Applied files are keyed by BASENAME, so the same file applies once no matter
* which directory it is globbed from. That is what makes the auth schema safe to
* copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
* a database that already has `0001_auth.sql` will not re-run it.
*
* Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
* out of scope for both until it is copied up.
*/
/**
* The `_migrations` key for a migration path (or bare filename).
* @param {string} path
* @returns {string}
*/
function migrationName(path) {
	return path.split("/").pop() ?? path;
}
/**
* @param {string} path
* @returns {boolean}
*/
function isMigrationFile(path) {
	return path.endsWith(".sql");
}
/**
* Migrations in `paths` that are not yet in `applied`, in apply order.
* Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
* @param {Iterable<string>} paths
* @param {Iterable<string>} applied
* @returns {Array<{ name: string, path: string }>}
*/
function pendingMigrations(paths, applied) {
	const done = new Set(applied);
	return [...paths].filter(isMigrationFile).map((path) => ({
		name: migrationName(path),
		path
	})).sort((a, b) => a.name.localeCompare(b.name)).filter(({ name }) => !done.has(name));
}
var rawDatabaseUrl = typeof process !== "undefined" ? process.env.DATABASE_URL : void 0;
var databaseUrl = rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : void 0;
/**
* Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
* sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
* the app has a working database even with nothing configured — the live preview
* included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
*/
var dbSource = databaseUrl ? "neon" : "pglite";
/**
* Init state lives on globalThis as promises: dev HMR creates new instances of
* this module, and two instances racing module-level state would open a second
* pool or run two concurrent PGLite migration passes (whose duplicate
* `_migrations` insert rejects — and would get memoized, poisoning every later
* `getSql()`). A failed init clears its slot so the next call retries.
*/
var globalRef = globalThis;
/**
* Result-type parity: Postgres sends every value as text plus a type OID — the
* JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
* int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
* JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
* production return identical, JSON-safe shapes:
*   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
*                                   `::text` if you ever need huge integers)
*   date                         -> 'YYYY-MM-DD' string
*   interval                     -> Postgres interval text
* numeric already comes back as a string on both (arbitrary precision).
*/
var OID_INT8 = 20;
var OID_DATE = 1082;
var OID_INTERVAL = 1186;
var identity = (v) => v;
/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
function createNeonSql() {
	globalRef.__pgSqlPromise__ ??= (async () => {
		const { Pool, types } = await import("../_libs/pg.mjs").then((n) => n.t);
		types.setTypeParser(OID_INT8, Number);
		types.setTypeParser(OID_DATE, identity);
		types.setTypeParser(OID_INTERVAL, identity);
		const pool = new Pool({ connectionString: databaseUrl });
		return toSql(async (text, params) => {
			return (await pool.query(text, params)).rows;
		});
	})().catch((err) => {
		globalRef.__pgSqlPromise__ = void 0;
		throw err;
	});
	return globalRef.__pgSqlPromise__;
}
async function createPgliteSql() {
	globalRef.__pgliteInstance__ ??= (async () => {
		const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
		const pg = new PGlite({ parsers: {
			[OID_INT8]: Number,
			[OID_DATE]: identity,
			[OID_INTERVAL]: identity
		} });
		await pg.waitReady;
		await pg.exec("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
		return pg;
	})().catch((err) => {
		globalRef.__pgliteInstance__ = void 0;
		throw err;
	});
	const pg = await globalRef.__pgliteInstance__;
	const migrate = async () => {
		const migrations = /* #__PURE__ */ Object.assign({
			"/migrations/0002_comparison_objects.sql": _0002_comparison_objects_default,
			"/migrations/0003_images_and_heights.sql": _0003_images_and_heights_default
		});
		const done = (await pg.query("select name from _migrations")).rows.map((r) => r.name);
		for (const { name, path } of pendingMigrations(Object.keys(migrations), done)) await pg.transaction(async (tx) => {
			await tx.exec(migrations[path]);
			await tx.query("insert into _migrations (name) values ($1)", [name]);
		});
	};
	const pass = (globalRef.__pgliteMigrateChain__ ?? Promise.resolve()).catch(() => void 0).then(migrate);
	globalRef.__pgliteMigrateChain__ = pass;
	await pass;
	return toSql(async (text, params) => {
		return (await pg.query(text, params)).rows;
	});
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}
/**
* Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
* otherwise the local PGLite fallback. Memoized — safe to call per request.
*
* Schema comes from `migrations/*.sql`, auto-applied before the first query on
* both backends — define tables there, never inline in server functions.
*/
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/**
* Finish DB bootstrap before the server handles traffic.
*
* - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
*   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
* - **Neon**: no-op (pool is created lazily on first query).
*
* Vite `configureServer` awaits this at dev startup; production imports of this
* module kick it off immediately (see bottom of file).
*/
function ensureDbReady() {
	if (dbSource !== "pglite") return Promise.resolve();
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined" && dbSource === "pglite") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] PGLite bootstrap failed:", err);
	throw err;
});
//#endregion
export { getSql };
