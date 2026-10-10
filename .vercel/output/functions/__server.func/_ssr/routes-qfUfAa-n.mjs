import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as formatMeters, l as formatObjectSize, n as SORT_OPTIONS, p as visualWidthM, t as PRESET_SCENES, u as maxDimension } from "./format-YIbaSV8N.mjs";
import { a as Search, c as Locate, d as Focus, f as Dices, h as Check, i as Tag, l as Library, o as Plus, p as ChevronRight, r as Trash2, s as Minus, t as X } from "../_libs/lucide-react.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as ObjectVisual, c as SelectItem, d as cn, i as Label, l as SelectTrigger, m as useCatalog, n as Button, o as Select, r as Input, s as SelectContent, t as AppHeader, u as SelectValue } from "./use-catalog-CZp1cDa6.mjs";
import { n as Route$1 } from "./router-CW-S1Q6Q.mjs";
import { n as nn, r as qt, t as Qt } from "../_libs/react-resizable-panels.mjs";
import { a as Viewport, i as ScrollAreaThumb, n as Root, r as ScrollAreaScrollbar, t as Corner } from "../_libs/radix-ui__react-scroll-area.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-qfUfAa-n.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ScrollArea = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root, {
	ref,
	className: cn("relative overflow-hidden", className),
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
			className: "h-full w-full rounded-[inherit]",
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Corner, {})
	]
}));
ScrollArea.displayName = Root.displayName;
var ScrollBar = import_react.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbar, {
	ref,
	orientation,
	className: cn("flex touch-none transition-colors select-none", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-px", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-px", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
}));
ScrollBar.displayName = ScrollAreaScrollbar.displayName;
var CATEGORY_ORDER = [
	"Celestial Objects",
	"Animals",
	"Humans",
	"Miscellaneous Objects",
	"Buildings"
];
function sortObjects(objects, sort) {
	const copy = [...objects];
	if (sort === "first-added") copy.sort((a, b) => a.createdAt.localeCompare(b.createdAt) || a.id - b.id);
	else if (sort === "latest-added") copy.sort((a, b) => b.createdAt.localeCompare(a.createdAt) || b.id - a.id);
	else if (sort === "largest") copy.sort((a, b) => maxDimension(b) - maxDimension(a));
	else if (sort === "smallest") copy.sort((a, b) => maxDimension(a) - maxDimension(b));
	else copy.sort((a, b) => {
		const ca = CATEGORY_ORDER.indexOf(a.category);
		const cb = CATEGORY_ORDER.indexOf(b.category);
		const ra = ca === -1 ? 99 : ca;
		const rb = cb === -1 ? 99 : cb;
		if (ra !== rb) return ra - rb;
		if (a.category !== b.category) return a.category.localeCompare(b.category);
		if (a.subcategory !== b.subcategory) return a.subcategory.localeCompare(b.subcategory);
		return a.name.localeCompare(b.name);
	});
	return copy;
}
function groupDefault(objects) {
	const map = /* @__PURE__ */ new Map();
	for (const obj of objects) {
		if (!map.has(obj.category)) map.set(obj.category, /* @__PURE__ */ new Map());
		const sub = map.get(obj.category);
		const key = obj.subcategory || "";
		if (!sub.has(key)) sub.set(key, []);
		sub.get(key).push(obj);
	}
	return [...map.keys()].sort((a, b) => {
		const ia = CATEGORY_ORDER.indexOf(a);
		const ib = CATEGORY_ORDER.indexOf(b);
		return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b);
	}).map((category) => ({
		category,
		sub: [...map.get(category).entries()].map(([name, items]) => ({
			name,
			items
		}))
	}));
}
function ObjectRow({ object, onCanvas, onAdd }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => onAdd(object),
		className: cn("flex w-full items-center gap-2.5 rounded-sm px-2 py-1.5 text-left transition-colors hover:bg-bg-subtle", onCanvas && "bg-bg-subtle/60"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative flex size-9 shrink-0 items-end justify-center overflow-hidden rounded-sm bg-bg shadow-[var(--shadow-border)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-[78%] w-[78%]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ObjectVisual, { object })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "truncate text-sm text-fg",
					children: object.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-mono text-[11px] text-subtle tabular-nums",
					children: formatObjectSize(object)
				})]
			}),
			onCanvas ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 shrink-0 text-primary" }) : null
		]
	});
}
function CatalogPanel({ objects, canvasObjectIds, onAdd, className }) {
	const [query, setQuery] = (0, import_react.useState)("");
	const [sort, setSort] = (0, import_react.useState)("default");
	const [collapsed, setCollapsed] = (0, import_react.useState)({});
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return sortObjects(q ? objects.filter((o) => o.name.toLowerCase().includes(q) || o.category.toLowerCase().includes(q) || o.subcategory.toLowerCase().includes(q)) : objects, sort);
	}, [
		objects,
		query,
		sort
	]);
	const grouped = sort === "default" && !query.trim() ? groupDefault(filtered) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex min-h-0 flex-col", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-3 pt-3 pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-medium tracking-wide text-muted uppercase",
					children: "Object catalog"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-mono text-[11px] text-subtle tabular-nums",
					children: [
						filtered.length,
						"/",
						objects.length
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 px-3 pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Search objects",
						className: "h-9 pl-8",
						"aria-label": "Search objects"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] text-subtle",
						children: "Sort by"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: sort,
						onValueChange: (v) => setSort(v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "h-8 flex-1 text-xs",
							"aria-label": "Sort catalog",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: SORT_OPTIONS.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: opt.key,
							children: opt.label
						}, opt.key)) })]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
				className: "min-h-0 flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-2 pb-3",
					children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-2 py-8 text-center text-sm text-subtle",
						children: "No results"
					}) : grouped ? grouped.map((g) => {
						const catKey = g.category;
						const catOpen = !collapsed[catKey];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "flex w-full items-center gap-1 rounded-sm px-2 py-1.5 text-left text-xs font-medium text-muted hover:bg-bg-subtle hover:text-fg",
								onClick: () => setCollapsed((c) => ({
									...c,
									[catKey]: !c[catKey]
								})),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: cn("size-3.5 transition-transform", catOpen && "rotate-90") }), g.category]
							}), catOpen ? g.sub.map((s) => {
								const subKey = `${g.category}::${s.name}`;
								const subOpen = !collapsed[subKey];
								if (!s.name) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pl-2",
									children: s.items.map((obj) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ObjectRow, {
										object: obj,
										onCanvas: canvasObjectIds.has(obj.id),
										onAdd
									}, obj.id))
								}, subKey);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pl-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "flex w-full items-center gap-1 rounded-sm px-2 py-1 text-left text-[11px] font-medium text-subtle hover:bg-bg-subtle hover:text-muted",
										onClick: () => setCollapsed((c) => ({
											...c,
											[subKey]: !c[subKey]
										})),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: cn("size-3 transition-transform", subOpen && "rotate-90") }), s.name]
									}), subOpen ? s.items.map((obj) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ObjectRow, {
										object: obj,
										onCanvas: canvasObjectIds.has(obj.id),
										onAdd
									}, obj.id)) : null]
								}, subKey);
							}) : null]
						}, g.category);
					}) : filtered.map((obj) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ObjectRow, {
						object: obj,
						onCanvas: canvasObjectIds.has(obj.id),
						onAdd
					}, obj.id))
				})
			})
		]
	});
}
function CanvasObjectsPanel({ items, selectedId, onSelect, onRemove, onFocus, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex min-h-0 flex-col border-t border-border", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xs font-medium tracking-wide text-muted uppercase",
				children: "Canvas objects"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[11px] text-subtle tabular-nums",
				children: items.length
			})]
		}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-4 py-4 text-sm text-subtle",
			children: "No objects"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
			className: "min-h-0 flex-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-0.5 px-2 pb-2",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("flex items-center gap-2 rounded-sm px-2 py-1.5", selectedId === item.instanceId ? "bg-bg-subtle" : "hover:bg-bg-subtle/60"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex min-w-0 flex-1 items-center gap-2 text-left",
						onClick: () => onSelect(item.instanceId),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-8 shrink-0 items-end justify-center overflow-hidden rounded-sm bg-bg shadow-[var(--shadow-border)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-[78%] w-[78%]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ObjectVisual, { object: item.object })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate text-sm",
								children: item.object.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-[10px] text-subtle tabular-nums",
								children: formatObjectSize(item.object)
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "icon-sm",
							variant: "ghost",
							"aria-label": `Zoom to ${item.object.name}`,
							onClick: () => onFocus(item.instanceId),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Locate, { className: "size-3.5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "icon-sm",
							variant: "ghost",
							"aria-label": `Remove ${item.object.name}`,
							onClick: () => onRemove(item.instanceId),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
						})]
					})]
				}) }, item.instanceId))
			})
		})]
	});
}
var GROUND_PAD = 56;
var TOP_PAD = 72;
function niceScale(pxPerMeter) {
	const ppm = Math.max(pxPerMeter, 1e-32);
	const rawM = 120 / ppm;
	const pow = Math.pow(10, Math.floor(Math.log10(rawM)));
	const n = rawM / pow;
	const meters = (n >= 5 ? 5 : n >= 2 ? 2 : 1) * pow;
	return {
		meters,
		px: meters * ppm
	};
}
function boundsOf(items) {
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
	return {
		minX,
		maxX,
		maxH,
		span: Math.max(maxX - minX, maxH * .05)
	};
}
function fitCamera(items, width, height) {
	const b = boundsOf(items);
	if (!b || width < 8 || height < 8) return {
		originX: 0,
		pxPerMeter: 80
	};
	const usableW = width * .86;
	const usableH = Math.max(40, height - GROUND_PAD - TOP_PAD);
	const pxPerMeter = Math.min(usableW / b.span, usableH / b.maxH) * .92;
	return {
		originX: (b.minX + b.maxX) / 2,
		pxPerMeter: Math.max(pxPerMeter, 1e-24)
	};
}
function ComparisonCanvas({ items, catalog, silhouette, labels, selectedId, onSelect, onMove, onFocusRequest, onToggleLabels, onSurprise, onPreset, className }) {
	const rootRef = (0, import_react.useRef)(null);
	const [size, setSize] = (0, import_react.useState)({
		w: 800,
		h: 600
	});
	const [camera, setCamera] = (0, import_react.useState)({
		originX: 0,
		pxPerMeter: 40
	});
	const userCam = (0, import_react.useRef)(false);
	const drag = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = rootRef.current;
		if (!el) return;
		const ro = new ResizeObserver((entries) => {
			const r = entries[0]?.contentRect;
			if (!r) return;
			setSize({
				w: r.width,
				h: r.height
			});
		});
		ro.observe(el);
		setSize({
			w: el.clientWidth,
			h: el.clientHeight
		});
		return () => ro.disconnect();
	}, []);
	const refit = (0, import_react.useCallback)(() => {
		userCam.current = false;
		setCamera(fitCamera(items, size.w, size.h));
	}, [
		items,
		size.w,
		size.h
	]);
	(0, import_react.useEffect)(() => {
		if (!userCam.current) setCamera(fitCamera(items, size.w, size.h));
	}, [
		items,
		size.w,
		size.h
	]);
	const focusItem = (0, import_react.useCallback)((id) => {
		const item = items.find((i) => i.instanceId === id);
		if (!item) return;
		userCam.current = true;
		const pxPerMeter = Math.max(40, size.h - GROUND_PAD - TOP_PAD) * .78 / item.object.heightM;
		setCamera({
			originX: item.x,
			pxPerMeter: Math.max(pxPerMeter, 1e-24)
		});
		onSelect(id);
	}, [
		items,
		size.h,
		onSelect
	]);
	(0, import_react.useEffect)(() => {
		onFocusRequest(focusItem);
	}, [onFocusRequest, focusItem]);
	const toScreenX = (0, import_react.useCallback)((worldX) => (worldX - camera.originX) * camera.pxPerMeter + size.w / 2, [
		camera.originX,
		camera.pxPerMeter,
		size.w
	]);
	const zoomAt = (0, import_react.useCallback)((factor, cx) => {
		setCamera((cam) => {
			const worldAtCursor = cam.originX + (cx - size.w / 2) / cam.pxPerMeter;
			const next = Math.min(Math.max(cam.pxPerMeter * factor, 1e-28), 1e10);
			return {
				originX: worldAtCursor - (cx - size.w / 2) / next,
				pxPerMeter: next
			};
		});
		userCam.current = true;
	}, [size.w]);
	(0, import_react.useEffect)(() => {
		const el = rootRef.current;
		if (!el) return;
		const handleWheel = (e) => {
			e.preventDefault();
			const rect = el.getBoundingClientRect();
			const cx = e.clientX - rect.left;
			const factor = Math.exp(-e.deltaY * .0015);
			zoomAt(factor, cx);
		};
		el.addEventListener("wheel", handleWheel, { passive: false });
		return () => el.removeEventListener("wheel", handleWheel);
	}, [zoomAt]);
	const onPointerDown = (e) => {
		const target = e.target;
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
				itemX: item?.x ?? 0
			};
		} else {
			onSelect(null);
			drag.current = {
				mode: "pan",
				startX: e.clientX,
				originX: camera.originX,
				itemX: 0
			};
		}
	};
	const onPointerMove = (e) => {
		const d = drag.current;
		if (!d) return;
		const dx = e.clientX - d.startX;
		if (d.mode === "pan") {
			userCam.current = true;
			setCamera((cam) => ({
				...cam,
				originX: d.originX - dx / cam.pxPerMeter
			}));
		} else if (d.id) onMove(d.id, d.itemX + dx / camera.pxPerMeter);
	};
	const onPointerUp = () => {
		drag.current = null;
	};
	const scale = niceScale(camera.pxPerMeter);
	const tiny = (0, import_react.useMemo)(() => {
		return items.filter((i) => i.object.heightM * camera.pxPerMeter < 3);
	}, [items, camera.pxPerMeter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: rootRef,
		className: cn("relative min-h-0 flex-1 overflow-hidden bg-bg select-none touch-none", silhouette && "sil", className),
		onPointerDown,
		onPointerMove,
		onPointerUp,
		onPointerCancel: onPointerUp,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-x-0",
				style: {
					top: 0,
					bottom: GROUND_PAD,
					background: "linear-gradient(180deg, #09090b 0%, #0c0c10 55%, #12141a 100%)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-x-0 border-t border-border",
				style: {
					bottom: GROUND_PAD,
					height: GROUND_PAD,
					background: "#0b0b0e"
				}
			}),
			items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				catalog,
				onSurprise,
				onPreset
			}) : items.map((item) => {
				const w = visualWidthM(item.object) * camera.pxPerMeter;
				const h = item.object.heightM * camera.pxPerMeter;
				const left = toScreenX(item.x) - w / 2;
				if (h < 2 && w < 2) {
					const sx = toScreenX(item.x);
					if (sx < -40 || sx > size.w + 40) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						"data-instance": item.instanceId,
						className: "absolute z-10 flex flex-col items-center",
						style: {
							left: sx,
							bottom: GROUND_PAD,
							transform: "translateX(-50%)"
						},
						onClick: (e) => {
							e.stopPropagation();
							focusItem(item.instanceId);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1 max-w-28 truncate rounded-sm bg-bg-elevated px-1.5 py-0.5 text-[10px] text-muted shadow-[var(--shadow-border)]",
							children: item.object.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block size-1.5 rounded-full bg-primary" })]
					}, item.instanceId);
				}
				if (left + w < -80 || left > size.w + 80) return null;
				const drawH = Math.min(h, 8192);
				const drawW = Math.min(w, 8192);
				const hasPhoto = Boolean(item.object.imageKey);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-instance": item.instanceId,
					className: cn("absolute cursor-grab touch-none", selectedId === item.instanceId && "z-20"),
					style: {
						left: toScreenX(item.x),
						bottom: GROUND_PAD,
						width: hasPhoto ? void 0 : drawW,
						height: drawH,
						transform: "translateX(-50%)",
						zIndex: selectedId === item.instanceId ? 20 : 5
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ObjectVisual, {
						object: item.object,
						silhouette,
						fit: hasPhoto ? "height" : "contain"
					}), labels && drawW > 28 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pointer-events-none absolute top-full left-1/2 mt-1.5 -translate-x-1/2 text-center",
						style: { minWidth: 64 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate text-[11px] font-medium text-fg",
							children: item.object.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-[10px] text-subtle tabular-nums",
							children: formatObjectSize(item.object)
						})]
					}) : null]
				}, item.instanceId);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute top-3 left-3 z-30 flex flex-wrap items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto flex items-center gap-1 rounded-md bg-bg-elevated/90 p-1 shadow-[var(--shadow-border)] backdrop-blur-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "icon-sm",
							variant: "ghost",
							onClick: () => zoomAt(1.25, size.w / 2),
							"aria-label": "Zoom in",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "icon-sm",
							variant: "ghost",
							onClick: () => zoomAt(1 / 1.25, size.w / 2),
							"aria-label": "Zoom out",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "icon-sm",
							variant: "ghost",
							onClick: refit,
							"aria-label": "Fit all",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Focus, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "icon-sm",
							variant: labels ? "secondary" : "ghost",
							onClick: onToggleLabels,
							"aria-label": "Toggle labels",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					size: "sm",
					variant: "secondary",
					className: "pointer-events-auto",
					onClick: onSurprise,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dices, { className: "size-3.5" }), "Surprise me"]
				})]
			}),
			items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute bottom-3 left-3 z-30 flex items-end gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-sm bg-bg-elevated/90 px-2.5 py-1.5 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end",
						style: { width: Math.max(24, scale.px) },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-px shrink-0 bg-fg" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mb-px h-px min-w-0 flex-1 bg-fg" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-px shrink-0 bg-fg" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-center font-mono text-[11px] text-muted tabular-nums",
						children: formatMeters(scale.meters)
					})]
				}), tiny.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "max-w-64 truncate rounded-sm bg-bg-elevated/90 px-2 py-1.5 text-[11px] text-subtle shadow-[var(--shadow-border)]",
					children: [tiny.length, " hidden at this scale — zoom in or tap the pin"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden pb-1 text-[11px] text-subtle sm:inline",
					children: "Scroll to zoom · drag to pan"
				})]
			}) : null
		]
	});
}
function EmptyState({ catalog, onSurprise, onPreset }) {
	const available = new Set(catalog.map((o) => o.slug));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-20 flex items-center justify-center p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-medium tracking-tight text-fg sm:text-3xl",
					children: "Add objects to start comparing"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Drop planets, people, buildings — anything — onto the same ground line. Scroll to zoom."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 flex flex-wrap justify-center gap-2",
					children: PRESET_SCENES.filter((s) => s.slugs.every((slug) => available.has(slug))).map((scene) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "outline",
						onClick: () => onPreset(scene.slugs),
						children: scene.label
					}, scene.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					className: "mt-4",
					onClick: onSurprise,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dices, { className: "size-4" }), "Surprise me"]
				})
			]
		})
	});
}
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full shadow-[var(--shadow-border)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-bg-subtle", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block size-5 rounded-full bg-fg shadow-sm transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5 data-[state=checked]:bg-primary-foreground") })
}));
Switch.displayName = Switch$1.displayName;
var Sheet = Dialog;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-bg/70 data-[state=open]:animate-in data-[state=closed]:animate-out", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var SheetContent = import_react.forwardRef(({ className, children, side = "right", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn("fixed z-50 flex flex-col bg-bg-elevated shadow-[var(--shadow-border)]", side === "right" && "inset-y-0 right-0 h-full w-[min(100%,380px)]", side === "bottom" && "inset-x-0 bottom-0 max-h-[80vh] w-full rounded-t-xl", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute top-3 right-3 rounded-sm p-1 text-muted hover:text-fg focus:ring-2 focus:ring-ring focus:outline-none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
SheetContent.displayName = DialogContent.displayName;
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("px-4 pt-4 pb-2", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		className: cn("text-sm font-medium", className),
		...props
	});
}
function uid() {
	return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
function nextX(items, widthM) {
	if (items.length === 0) return 0;
	let maxRight = -Infinity;
	for (const item of items) maxRight = Math.max(maxRight, item.x + visualWidthM(item.object) / 2);
	const gap = Math.max(widthM * .18, ...items.map((i) => visualWidthM(i.object) * .06));
	return maxRight + gap + widthM / 2;
}
var useCompareStore = create((set, get) => ({
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
			items: [...s.items, {
				instanceId,
				object,
				x: placedX
			}],
			selectedId: instanceId
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
				items.push({
					instanceId,
					object,
					x
				});
				selectedId = instanceId;
			}
			return {
				items,
				selectedId
			};
		});
	},
	removeInstance: (instanceId) => set((s) => ({
		items: s.items.filter((i) => i.instanceId !== instanceId),
		selectedId: s.selectedId === instanceId ? null : s.selectedId
	})),
	moveInstance: (instanceId, x) => set((s) => ({ items: s.items.map((i) => i.instanceId === instanceId ? {
		...i,
		x
	} : i) })),
	clear: () => set({
		items: [],
		selectedId: null
	}),
	replaceFromSlugs: (slugs, catalog) => {
		const bySlug = new Map(catalog.map((o) => [o.slug, o]));
		const items = [];
		for (const slug of slugs) {
			const object = bySlug.get(slug);
			if (!object) continue;
			const x = nextX(items, object.widthM);
			items.push({
				instanceId: uid(),
				object,
				x
			});
		}
		set({
			items,
			selectedId: items[0]?.instanceId ?? null
		});
	}
}));
function parseSlugs(value) {
	if (!value) return [];
	return value.split(",").map((s) => s.trim()).filter(Boolean);
}
function Home() {
	const search = Route$1.useSearch();
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
	const [catalogOpen, setCatalogOpen] = (0, import_react.useState)(false);
	const hydrated = (0, import_react.useRef)(false);
	const focusRef = (0, import_react.useRef)(() => {});
	(0, import_react.useEffect)(() => {
		if (hydrated.current || catalog.length === 0) return;
		hydrated.current = true;
		const slugs = parseSlugs(search.objects);
		if (slugs.length) replaceFromSlugs(slugs, catalog);
		if (search.silhouette === "1") setSilhouette(true);
	}, [
		catalog,
		replaceFromSlugs,
		search.objects,
		search.silhouette,
		setSilhouette
	]);
	(0, import_react.useEffect)(() => {
		if (!hydrated.current) return;
		const objects = items.map((i) => i.object.slug).join(",") || void 0;
		const sil = silhouette ? "1" : void 0;
		if (objects === (search.objects || void 0) && sil === search.silhouette) return;
		navigate({
			search: {
				objects,
				silhouette: sil
			},
			replace: true
		});
	}, [
		items,
		silhouette,
		navigate,
		search.objects,
		search.silhouette
	]);
	const canvasObjectIds = (0, import_react.useMemo)(() => new Set(items.map((i) => i.object.id)), [items]);
	const onAdd = (0, import_react.useCallback)((object) => {
		addObject(object);
		setCatalogOpen(false);
	}, [addObject]);
	const loadSlugs = (0, import_react.useCallback)((slugs) => {
		replaceFromSlugs(slugs, catalog);
	}, [catalog, replaceFromSlugs]);
	const surprise = (0, import_react.useCallback)(() => {
		if (catalog.length === 0) return;
		const ready = PRESET_SCENES.filter((s) => s.slugs.every((slug) => catalog.some((o) => o.slug === slug)));
		if (ready.length && Math.random() > .4) {
			const pick = ready[Math.floor(Math.random() * ready.length)];
			replaceFromSlugs(pick.slugs, catalog);
			return;
		}
		const sorted = [...catalog].sort((a, b) => maxDimension(a) - maxDimension(b));
		const window = Math.min(4, sorted.length);
		const start = Math.floor(Math.random() * Math.max(1, sorted.length - window + 1));
		replaceFromSlugs(sorted.slice(start, start + window).map((o) => o.slug), catalog);
	}, [catalog, replaceFromSlugs]);
	const onFocusRequest = (0, import_react.useCallback)((handler) => {
		focusRef.current = handler;
	}, []);
	const sidebar = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(qt, {
			orientation: "vertical",
			className: "h-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qt, {
					defaultSize: "68%",
					minSize: "30%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CatalogPanel, {
						objects: catalog,
						canvasObjectIds,
						onAdd,
						className: "h-full"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(nn, { className: "h-1.5 bg-border hover:bg-primary/40" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qt, {
					defaultSize: "32%",
					minSize: "18%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CanvasObjectsPanel, {
						items,
						selectedId,
						onSelect: select,
						onRemove: removeInstance,
						onFocus: (id) => focusRef.current(id),
						className: "h-full border-t-0"
					})
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh flex-col bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, { right: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							id: "silhouette",
							checked: silhouette,
							onCheckedChange: setSilhouette,
							"aria-label": "Silhouette mode"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "silhouette",
							className: "hidden cursor-pointer sm:inline",
							children: "Silhouette"
						})]
					}),
					items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "ghost",
						onClick: () => clear(),
						children: "Clear"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						size: "sm",
						variant: "secondary",
						className: "lg:hidden",
						onClick: () => setCatalogOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Library, { className: "size-3.5" }), "Catalog"]
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComparisonCanvas, {
					items,
					catalog,
					silhouette,
					labels,
					selectedId,
					onSelect: select,
					onMove: moveInstance,
					onFocusRequest,
					onToggleLabels: () => setLabels(!labels),
					onSurprise: surprise,
					onPreset: loadSlugs
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "hidden w-[340px] shrink-0 border-l border-border bg-bg-elevated lg:flex lg:flex-col",
					children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "p-4 text-sm text-subtle",
						children: "Loading catalog…"
					}) : sidebar
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: catalogOpen,
				onOpenChange: setCatalogOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "right",
					className: "p-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Catalog" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-h-0 flex-1",
						children: sidebar
					})]
				})
			})
		]
	});
}
//#endregion
export { Home as component };
