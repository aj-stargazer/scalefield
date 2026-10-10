//#region node_modules/.nitro/vite/services/ssr/assets/format-YIbaSV8N.js
var SORT_OPTIONS = [
	{
		key: "default",
		label: "Default"
	},
	{
		key: "first-added",
		label: "First Added"
	},
	{
		key: "latest-added",
		label: "Latest Added"
	},
	{
		key: "largest",
		label: "Largest"
	},
	{
		key: "smallest",
		label: "Smallest"
	}
];
var VISUAL_KINDS = [
	"sphere",
	"box",
	"building",
	"person",
	"animal",
	"vehicle",
	"device"
];
var STOCK_IMAGES = [
	{
		key: "",
		label: "None — use shape"
	},
	{
		key: "mercury",
		label: "Mercury"
	},
	{
		key: "venus",
		label: "Venus"
	},
	{
		key: "earth",
		label: "Earth"
	},
	{
		key: "mars",
		label: "Mars"
	},
	{
		key: "jupiter",
		label: "Jupiter"
	},
	{
		key: "saturn",
		label: "Saturn"
	},
	{
		key: "neptune",
		label: "Neptune"
	},
	{
		key: "the-sun",
		label: "The Sun"
	},
	{
		key: "housecat",
		label: "Housecat"
	},
	{
		key: "average-man",
		label: "Person"
	},
	{
		key: "average-semi-truck",
		label: "Semi truck"
	},
	{
		key: "atari-800",
		label: "Atari 800"
	},
	{
		key: "empire-state-building",
		label: "Empire State Building"
	},
	{
		key: "willis-tower",
		label: "Willis Tower"
	},
	{
		key: "burj-khalifa",
		label: "Burj Khalifa"
	}
];
var STOCK_IMAGE_KEYS = STOCK_IMAGES.map((s) => s.key).filter(Boolean);
function objectImageSrc(imageKey) {
	if (!imageKey) return null;
	if (!STOCK_IMAGE_KEYS.includes(imageKey)) return null;
	return `/objects/${imageKey}.png`;
}
var STOCK_IMAGE_PX = {
	"atari-800": {
		w: 1109,
		h: 374
	},
	"average-man": {
		w: 256,
		h: 717
	},
	"average-semi-truck": {
		w: 759,
		h: 151
	},
	"burj-khalifa": {
		w: 272,
		h: 828
	},
	earth: {
		w: 636,
		h: 634
	},
	"empire-state-building": {
		w: 142,
		h: 443
	},
	housecat: {
		w: 608,
		h: 540
	},
	jupiter: {
		w: 677,
		h: 643
	},
	mars: {
		w: 591,
		h: 602
	},
	mercury: {
		w: 579,
		h: 660
	},
	neptune: {
		w: 602,
		h: 609
	},
	saturn: {
		w: 1024,
		h: 401
	},
	"the-sun": {
		w: 487,
		h: 487
	},
	venus: {
		w: 261,
		h: 270
	},
	"willis-tower": {
		w: 132,
		h: 527
	}
};
/** On-canvas width so photo height maps 1:1 to real-world height. */
function visualWidthM(obj) {
	const px = obj.imageKey ? STOCK_IMAGE_PX[obj.imageKey] : void 0;
	if (px && px.h > 0) return obj.heightM * (px.w / px.h);
	return obj.widthM;
}
var UNIT_TO_METERS = {
	mm: .001,
	cm: .01,
	m: 1,
	km: 1e3,
	in: .0254,
	ft: .3048,
	yd: .9144,
	mi: 1609.344,
	au: 149597870700
};
var UNITS = [
	{
		id: "mm",
		label: "mm"
	},
	{
		id: "cm",
		label: "cm"
	},
	{
		id: "m",
		label: "m"
	},
	{
		id: "km",
		label: "km"
	},
	{
		id: "in",
		label: "in"
	},
	{
		id: "ft",
		label: "ft"
	},
	{
		id: "yd",
		label: "yd"
	},
	{
		id: "mi",
		label: "mi"
	},
	{
		id: "au",
		label: "AU"
	}
];
function maxDimension(obj) {
	return Math.max(obj.widthM, obj.heightM, obj.depthM);
}
var PRESET_SCENES = [
	{
		id: "inner-planets",
		label: "Inner planets",
		slugs: [
			"mercury",
			"venus",
			"earth",
			"mars"
		]
	},
	{
		id: "gas-giants",
		label: "Gas giants",
		slugs: [
			"jupiter",
			"saturn",
			"uranus",
			"neptune"
		]
	},
	{
		id: "stars",
		label: "Stars",
		slugs: [
			"the-sun",
			"sirius",
			"vega",
			"pollux",
			"arcturus"
		]
	},
	{
		id: "skyscrapers",
		label: "Skyscrapers",
		slugs: [
			"empire-state-building",
			"willis-tower",
			"burj-khalifa"
		]
	},
	{
		id: "everyday",
		label: "Everyday",
		slugs: [
			"housecat",
			"average-man",
			"average-semi-truck",
			"atari-800"
		]
	}
];
function trimNumber(n) {
	if (!Number.isFinite(n)) return "—";
	const abs = Math.abs(n);
	let digits = 2;
	if (abs >= 100) digits = 0;
	else if (abs >= 10) digits = 1;
	else if (abs >= 1) digits = 2;
	else if (abs >= .1) digits = 2;
	else digits = 3;
	return n.toFixed(digits).replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1");
}
/** Format a length in meters using a human unit. */
function formatMeters(meters) {
	const m = Math.abs(meters);
	if (m === 0) return "0 m";
	if (m >= 0xe8d4a51000) return `${trimNumber(meters / 0xe8d4a51000)} billion km`;
	if (m >= 1e9) return `${trimNumber(meters / 1e9)} million km`;
	if (m >= 1e3) {
		const km = meters / 1e3;
		if (Math.abs(km) >= 1e4) return `${Math.round(km).toLocaleString("en-US")} km`;
		if (Math.abs(km) >= 100) return `${Math.round(km).toLocaleString("en-US")} km`;
		return `${trimNumber(km)} km`;
	}
	if (m >= 1) return `${trimNumber(meters)} m`;
	if (m >= .01) return `${trimNumber(meters * 100)} cm`;
	if (m >= .001) return `${trimNumber(meters * 1e3)} mm`;
	return `${trimNumber(meters * 1e6)} µm`;
}
function formatObjectSize(obj) {
	if (obj.widthM === obj.heightM && (obj.visualKind.includes("sun") || obj.visualKind.includes("sirius") || obj.visualKind.includes("vega") || obj.visualKind.includes("pollux") || obj.visualKind.includes("arcturus") || [
		"mercury",
		"venus",
		"earth",
		"mars",
		"jupiter",
		"saturn",
		"uranus",
		"neptune",
		"sphere"
	].includes(obj.visualKind))) return `${formatMeters(obj.heightM)} Ø`;
	return `${formatMeters(obj.heightM)} H`;
}
function slugify(name) {
	return name.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").replace(/-+/g, "-").slice(0, 60) || "object";
}
//#endregion
export { UNITS as a, formatMeters as c, objectImageSrc as d, slugify as f, STOCK_IMAGE_KEYS as i, formatObjectSize as l, SORT_OPTIONS as n, UNIT_TO_METERS as o, visualWidthM as p, STOCK_IMAGES as r, VISUAL_KINDS as s, PRESET_SCENES as t, maxDimension as u };
