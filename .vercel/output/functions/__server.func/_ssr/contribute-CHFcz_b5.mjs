import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as UNITS, c as formatMeters, l as formatObjectSize, o as UNIT_TO_METERS, r as STOCK_IMAGES, s as VISUAL_KINDS } from "./format-YIbaSV8N.mjs";
import { i as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as ObjectVisual, c as SelectItem, d as cn, f as contributeObject, i as Label, l as SelectTrigger, m as useCatalog, n as Button, o as Select, p as upsertLocalCommunity, r as Input, s as SelectContent, t as AppHeader, u as SelectValue } from "./use-catalog-CZp1cDa6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contribute-CHFcz_b5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-24 w-full rounded-sm bg-bg-subtle px-3 py-2 text-sm text-fg shadow-[var(--shadow-border)] placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var KIND_LABEL = {
	sphere: "Sphere",
	box: "Box",
	building: "Building",
	person: "Person",
	animal: "Animal",
	vehicle: "Vehicle",
	device: "Device"
};
function ContributeForm({ catalog }) {
	const navigate = useNavigate();
	const qc = useQueryClient();
	const categories = (0, import_react.useMemo)(() => {
		return [...new Set(catalog.map((o) => o.category))].sort();
	}, [catalog]);
	const [name, setName] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)(categories[0] ?? "Miscellaneous Objects");
	const [customCategory, setCustomCategory] = (0, import_react.useState)("");
	const [subcategory, setSubcategory] = (0, import_react.useState)("");
	const [width, setWidth] = (0, import_react.useState)("1");
	const [height, setHeight] = (0, import_react.useState)("1");
	const [depth, setDepth] = (0, import_react.useState)("1");
	const [unit, setUnit] = (0, import_react.useState)("m");
	const [visualKind, setVisualKind] = (0, import_react.useState)("sphere");
	const [color, setColor] = (0, import_react.useState)("#c8ccd4");
	const [imageKey, setImageKey] = (0, import_react.useState)("");
	const [sourceNote, setSourceNote] = (0, import_react.useState)("");
	const factor = UNIT_TO_METERS[unit] ?? 1;
	const preview = {
		name: name || "New object",
		visualKind,
		color,
		imageKey,
		widthM: Math.max(0, Number(width) || 0) * factor,
		heightM: Math.max(0, Number(height) || 0) * factor
	};
	const mutation = useMutation({
		mutationFn: () => contributeObject({ data: {
			name,
			category: category === "__new" ? customCategory : category,
			subcategory,
			width: Number(width),
			height: Number(height),
			depth: Number(depth),
			unit,
			visualKind,
			color,
			imageKey,
			sourceNote
		} }),
		onSuccess: async (obj) => {
			upsertLocalCommunity(obj);
			toast.success(`${obj.name} added to the catalog`);
			await qc.invalidateQueries({ queryKey: ["objects"] });
			await navigate({
				to: "/",
				search: {
					objects: obj.slug,
					silhouette: void 0
				}
			});
		},
		onError: (err) => {
			toast.error(err instanceof Error ? err.message : "Could not add object");
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "grid gap-8 lg:grid-cols-[1fr_280px]",
		onSubmit: (e) => {
			e.preventDefault();
			mutation.mutate();
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								required: true,
								maxLength: 80,
								value: name,
								onChange: (e) => setName(e.target.value),
								placeholder: "Blue whale"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Category",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: category,
								onValueChange: setCategory,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: c,
									children: c
								}, c)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "__new",
									children: "New category…"
								})] })]
							})
						}),
						category === "__new" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "New category",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								required: true,
								maxLength: 40,
								value: customCategory,
								onChange: (e) => setCustomCategory(e.target.value),
								placeholder: "Vehicles"
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Subcategory (optional)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								maxLength: 40,
								value: subcategory,
								onChange: (e) => setSubcategory(e.target.value),
								placeholder: "Mammals"
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs font-medium text-muted",
						children: "Dimensions"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Width",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									required: true,
									type: "number",
									min: "0",
									step: "any",
									value: width,
									onChange: (e) => setWidth(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Height",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									required: true,
									type: "number",
									min: "0",
									step: "any",
									value: height,
									onChange: (e) => setHeight(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Depth",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									required: true,
									type: "number",
									min: "0",
									step: "any",
									value: depth,
									onChange: (e) => setDepth(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Unit",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: unit,
									onValueChange: setUnit,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: UNITS.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: u.id,
										children: u.label
									}, u.id)) })]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 font-mono text-[11px] text-subtle tabular-nums",
						children: [
							"Stored as ",
							formatMeters(preview.widthM),
							" × ",
							formatMeters(preview.heightM),
							" ×",
							" ",
							formatMeters(Math.max(0, Number(depth) || 0) * factor)
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Shape",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: visualKind,
							onValueChange: (v) => setVisualKind(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: VISUAL_KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: k,
								children: KIND_LABEL[k]
							}, k)) })]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Color",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex h-10 items-center gap-2 rounded-sm bg-bg-subtle px-2 shadow-[var(--shadow-border)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "color",
								value: color,
								onChange: (e) => setColor(e.target.value),
								className: "size-7 cursor-pointer rounded-sm border-0 bg-transparent",
								"aria-label": "Object color"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-muted",
								children: color
							})]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
					label: "Image (optional)",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: imageKey || "none",
						onValueChange: (v) => setImageKey(v === "none" ? "" : v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "None — use shape" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: STOCK_IMAGES.map((img) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: img.key || "none",
							children: img.label
						}, img.key || "none")) })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-subtle",
						children: "Pick a catalog photo, or leave none and the shape + color will be used."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Measurement source (optional)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						maxLength: 160,
						value: sourceNote,
						onChange: (e) => setSourceNote(e.target.value),
						placeholder: "Wikipedia, NASA fact sheet, manufacturer spec…"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: mutation.isPending,
						children: mutation.isPending ? "Adding…" : "Add to catalog"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						onClick: () => navigate({ to: "/" }),
						children: "Cancel"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "h-fit rounded-lg bg-bg-elevated p-4 shadow-[var(--shadow-border)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-muted uppercase",
					children: "Preview"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex h-48 items-end justify-center rounded-md bg-bg p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-h-full",
						style: {
							width: 88,
							height: 88 * Math.min(2.4, Math.max(.2, preview.heightM / Math.max(preview.widthM, 1e-9)))
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ObjectVisual, { object: {
							name: preview.name,
							visualKind,
							color,
							imageKey
						} })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-fg",
					children: preview.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-xs text-subtle tabular-nums",
					children: [formatMeters(preview.heightM), " H"]
				})
			]
		})]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
function ContributePage() {
	const { data: catalog = [] } = useCatalog();
	const community = catalog.filter((o) => !o.isSeed).slice(0, 12);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, { right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "rounded-sm px-3 py-1.5 text-xs font-medium text-muted no-underline hover:text-fg",
			children: "Back to compare"
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-8 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-wide text-muted uppercase",
							children: "Community catalog"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 text-3xl font-medium tracking-tight",
							children: "Contribute an object"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "Anyone can add something to Scale Field. Give it a name, real-world dimensions, and a shape — it appears in the catalog immediately, ready to stand on the same ground line as Earth or a housecat."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContributeForm, { catalog }),
				community.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium text-muted",
					children: "Recently contributed"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
					children: community.map((obj) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						search: { objects: obj.slug },
						className: "flex items-center gap-3 rounded-md bg-bg-elevated px-3 py-2 no-underline shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-10 items-end justify-center overflow-hidden rounded-sm bg-bg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-[78%] w-[78%]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ObjectVisual, { object: obj })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate text-sm text-fg",
								children: obj.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-[11px] text-subtle tabular-nums",
								children: formatObjectSize(obj)
							})]
						})]
					}) }, obj.id))
				})] }) : null
			]
		})]
	});
}
//#endregion
export { ContributePage as component };
