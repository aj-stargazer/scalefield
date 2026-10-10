import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime, r as Slot } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { d as objectImageSrc, i as STOCK_IMAGE_KEYS, s as VISUAL_KINDS } from "./format-YIbaSV8N.mjs";
import { a as object, i as number, n as array, o as string, r as literal, s as union, t as _enum } from "../_libs/zod.mjs";
import { h as Check, m as ChevronDown, u as Layers } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { a as SelectItemIndicator, c as SelectTrigger$1, i as SelectItem$1, l as SelectValue$1, n as SelectContent$1, o as SelectItemText, r as SelectIcon, s as SelectPortal, t as Select$1, u as SelectViewport } from "../_libs/@radix-ui/react-select+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-catalog-CZp1cDa6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function AppHeader({ right, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("flex h-12 shrink-0 items-center justify-between gap-3 border-b border-border px-3 sm:px-4", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 items-center gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex items-center gap-2 text-fg no-underline",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-7 items-center justify-center rounded-sm bg-bg-subtle shadow-[var(--shadow-border)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3.5 text-primary" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-semibold tracking-tight",
					children: "Scale Field"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "rounded-sm px-2.5 py-1.5 text-xs font-medium text-muted no-underline transition-colors hover:text-fg",
					activeProps: { className: "text-fg" },
					activeOptions: { exact: true },
					children: "Compare"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/contribute",
					className: "rounded-sm px-2.5 py-1.5 text-xs font-medium text-muted no-underline transition-colors hover:text-fg",
					activeProps: { className: "text-fg" },
					children: "Contribute"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center gap-2",
			children: right
		})]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-[opacity,background-color,transform,box-shadow] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:opacity-90",
			secondary: "bg-bg-subtle text-fg hover:bg-bg-subtle/80 shadow-[var(--shadow-border)]",
			outline: "bg-transparent text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)] hover:bg-bg-subtle/50",
			ghost: "text-muted hover:text-fg hover:bg-bg-subtle/70",
			destructive: "bg-destructive text-destructive-foreground hover:opacity-90"
		},
		size: {
			default: "h-10 px-4",
			sm: "h-8 rounded-sm px-3 text-xs",
			lg: "h-11 px-5",
			icon: "size-10",
			"icon-sm": "size-8"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-10 w-full rounded-sm bg-bg-subtle px-3 py-2 text-sm text-fg shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("text-xs font-medium text-muted", className),
	...props
}));
Label.displayName = Root.displayName;
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-10 w-full items-center justify-between gap-2 rounded-sm bg-bg-subtle px-3 text-sm text-fg shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-placeholder:text-subtle [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 text-muted" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-80 min-w-32 overflow-hidden rounded-md bg-popover text-popover-foreground shadow-[var(--shadow-border)] data-[state=open]:animate-in data-[state=closed]:animate-out", position === "popper" && "data-[side=bottom]:translate-y-1", className),
	position,
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
		className: cn("p-1", position === "popper" && "w-full min-w-[var(--radix-select-trigger-width)]"),
		children
	})
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 pr-8 pl-2 text-sm outline-none focus:bg-bg-subtle data-disabled:pointer-events-none data-disabled:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex size-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
function ColoredSphere({ color }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "obj-sphere h-full w-full",
		style: { background: `radial-gradient(circle at 32% 28%, color-mix(in oklab, ${color} 45%, white), ${color} 44%, color-mix(in oklab, ${color} 55%, black))` }
	});
}
function Sphere({ kind }) {
	const sphereClass = {
		mercury: "obj-mercury",
		venus: "obj-venus",
		earth: "obj-earth",
		mars: "obj-mars",
		jupiter: "obj-jupiter",
		saturn: "obj-saturn",
		uranus: "obj-uranus",
		neptune: "obj-neptune"
	}[kind] ?? "obj-mercury";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-full w-full",
		children: [kind === "saturn" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "obj-ring" }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("obj-sphere", sphereClass),
			children: kind === "jupiter" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "obj-spot" }) : null
		})]
	});
}
function Star({ kind }) {
	const starClass = {
		"the-sun": "obj-sun",
		sirius: "obj-sirius",
		vega: "obj-vega",
		pollux: "obj-pollux",
		arcturus: "obj-arcturus"
	}[kind] ?? "obj-sun";
	const glow = {
		"the-sun": "radial-gradient(circle, rgba(255,180,40,0.7), transparent 70%)",
		sirius: "radial-gradient(circle, rgba(180,210,255,0.7), transparent 70%)",
		vega: "radial-gradient(circle, rgba(190,210,255,0.65), transparent 70%)",
		pollux: "radial-gradient(circle, rgba(255,160,70,0.65), transparent 70%)",
		arcturus: "radial-gradient(circle, rgba(255,110,30,0.7), transparent 70%)"
	}[kind] ?? "radial-gradient(circle, rgba(255,200,80,0.6), transparent 70%)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-full w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "obj-glow",
			style: { background: glow }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("obj-star", starClass) })]
	});
}
function Human() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 46 175",
		className: "h-full w-full",
		preserveAspectRatio: "xMidYMax meet",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			fill: "currentColor",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "23",
					cy: "15",
					r: "12"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "15",
					y: "30",
					width: "16",
					height: "54",
					rx: "8"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "3",
					y: "34",
					width: "11",
					height: "46",
					rx: "5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "32",
					y: "34",
					width: "11",
					height: "46",
					rx: "5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "15",
					y: "82",
					width: "7",
					height: "93",
					rx: "3.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "24",
					y: "82",
					width: "7",
					height: "93",
					rx: "3.5"
				})
			]
		})
	});
}
function Housecat() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 460 250",
		className: "h-full w-full",
		preserveAspectRatio: "xMidYMax meet",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			fill: "currentColor",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "250",
					cy: "160",
					rx: "150",
					ry: "70"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "120",
					cy: "110",
					r: "62"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "78,70 88,18 118,78" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "162,78 150,16 198,68" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M380 150c40 10 70 40 72 70 2 22-18 24-28 8-12-18-22-30-50-38Z" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "200",
					cy: "220",
					rx: "22",
					ry: "18"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "270",
					cy: "222",
					rx: "22",
					ry: "18"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "140",
					cy: "218",
					rx: "20",
					ry: "16"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "320",
					cy: "218",
					rx: "20",
					ry: "16"
				})
			]
		})
	});
}
function SemiTruck() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 220 41",
		className: "h-full w-full",
		preserveAspectRatio: "xMidYMax meet",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			fill: "currentColor",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "48",
					y: "6",
					width: "168",
					height: "24",
					rx: "1.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 14h14l6-8h18v22H0z" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "20",
					y: "8",
					width: "10",
					height: "7",
					rx: "0.6",
					opacity: "0.35",
					className: "obj-windows"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "18",
					cy: "34",
					r: "6"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "36",
					cy: "34",
					r: "6"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "70",
					cy: "34",
					r: "6"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "88",
					cy: "34",
					r: "6"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "186",
					cy: "34",
					r: "6"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "204",
					cy: "34",
					r: "6"
				})
			]
		})
	});
}
function Atari800() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 406 114",
		className: "h-full w-full",
		preserveAspectRatio: "xMidYMax meet",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			fill: "currentColor",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 18h390c6 0 8 4 8 8v70c0 8-6 14-14 14H18C8 110 4 104 4 96V26c0-6 2-8 4-8z" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "28",
					y: "32",
					width: "350",
					height: "28",
					rx: "2",
					opacity: "0.25",
					className: "obj-windows"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "40",
					y: "72",
					width: "240",
					height: "18",
					rx: "2",
					opacity: "0.18",
					className: "obj-windows"
				})
			]
		})
	});
}
function EmpireState() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 80 443",
		className: "h-full w-full",
		preserveAspectRatio: "xMidYMax meet",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			fill: "currentColor",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "8",
					y: "390",
					width: "64",
					height: "53"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "16",
					y: "250",
					width: "48",
					height: "140"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "22",
					y: "160",
					width: "36",
					height: "90"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "28",
					y: "110",
					width: "24",
					height: "50"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "32",
					y: "78",
					width: "16",
					height: "32"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "38",
					y: "18",
					width: "4",
					height: "60"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "38,18 42,18 40,0" })
			]
		})
	});
}
function WillisTower() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 90 527",
		className: "h-full w-full",
		preserveAspectRatio: "xMidYMax meet",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			fill: "currentColor",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "10",
					y: "167",
					width: "70",
					height: "360"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "22",
					y: "97",
					width: "46",
					height: "70"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "34",
					y: "57",
					width: "22",
					height: "40"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "36",
					y: "8",
					width: "4",
					height: "49"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "50",
					y: "18",
					width: "4",
					height: "39"
				})
			]
		})
	});
}
function BurjKhalifa() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 90 828",
		className: "h-full w-full",
		preserveAspectRatio: "xMidYMax meet",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			fill: "currentColor",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "18,828 72,828 58,420 48,220 45,120 44,70 46,828" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "43",
					y: "8",
					width: "4",
					height: "70"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "43,8 47,8 45,0" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "28",
					y: "520",
					width: "34",
					height: "308",
					opacity: "0.85"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "34",
					y: "340",
					width: "22",
					height: "180",
					opacity: "0.9"
				})
			]
		})
	});
}
function Generic({ kind, color }) {
	if (kind === "sphere") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColoredSphere, { color });
	if (kind === "person") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Human, {});
	if (kind === "animal") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Housecat, {});
	if (kind === "vehicle") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SemiTruck, {});
	if (kind === "device") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atari800, {});
	if (kind === "building") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 60 160",
		className: "h-full w-full",
		preserveAspectRatio: "xMidYMax meet",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "8",
			y: "20",
			width: "44",
			height: "140",
			fill: "currentColor"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "18",
			y: "0",
			width: "24",
			height: "24",
			fill: "currentColor"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-full w-full rounded-[2px]",
		style: { background: color }
	});
}
function ShapeVisual({ kind, color }) {
	const planets = /* @__PURE__ */ new Set([
		"mercury",
		"venus",
		"earth",
		"mars",
		"jupiter",
		"saturn",
		"uranus",
		"neptune"
	]);
	const stars = /* @__PURE__ */ new Set([
		"the-sun",
		"sirius",
		"vega",
		"pollux",
		"arcturus"
	]);
	if (kind === "sphere") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColoredSphere, { color });
	if (planets.has(kind)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sphere, { kind });
	if (stars.has(kind)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { kind });
	if (kind === "average-man") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Human, {});
	if (kind === "housecat") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Housecat, {});
	if (kind === "semi-truck") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SemiTruck, {});
	if (kind === "atari-800") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atari800, {});
	if (kind === "empire-state") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmpireState, {});
	if (kind === "willis-tower") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WillisTower, {});
	if (kind === "burj-khalifa") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BurjKhalifa, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Generic, {
		kind,
		color
	});
}
function ObjectVisual({ object, className, silhouette, fit = "contain" }) {
	const src = objectImageSrc(object.imageKey);
	let body;
	if (src) body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt: "",
		draggable: false,
		className: fit === "height" ? "block h-full w-auto max-w-none" : "h-full w-full object-contain object-bottom"
	});
	else body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShapeVisual, {
		kind: object.visualKind,
		color: object.color
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("h-full w-full", fit === "height" && "w-max", silhouette && "sil", className),
		style: { color: silhouette ? "#ffffff" : object.color },
		role: "img",
		"aria-label": object.name,
		children: body
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var listObjects = createServerFn({ method: "GET" }).handler(createSsrRpc("55fe9ce06b8f146cc1bd946156de719d3378f775e54215c6554ec80ae3d8a904"));
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
var contributeObject = createServerFn({ method: "POST" }).validator((data) => contributeSchema.parse(data)).handler(createSsrRpc("dd82e28fa264ca0a6e9d07da9c5270674e2f01f9ffbb664d70e9550674a4ba9e"));
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
var restoreCommunity = createServerFn({ method: "POST" }).validator((data) => object({ objects: array(restoreItemSchema).max(40) }).parse(data)).handler(createSsrRpc("ffa08e7278935fda3bcb0bf1c96a3689e3e30ae51f272aba43cd809eac51435c"));
var KEY = "scalefield.community.v1";
function loadLocalCommunity() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter(isCatalogObject);
	} catch {
		return [];
	}
}
function saveLocalCommunity(objects) {
	if (typeof window === "undefined") return;
	const community = objects.filter((o) => !o.isSeed);
	window.localStorage.setItem(KEY, JSON.stringify(community));
}
function upsertLocalCommunity(object) {
	const next = loadLocalCommunity().filter((o) => o.slug !== object.slug);
	next.push({
		...object,
		isSeed: false
	});
	saveLocalCommunity(next);
}
function isCatalogObject(value) {
	if (!value || typeof value !== "object") return false;
	const o = value;
	return typeof o.slug === "string" && typeof o.name === "string" && typeof o.category === "string" && typeof o.widthM === "number" && typeof o.heightM === "number" && typeof o.depthM === "number" && typeof o.visualKind === "string" && typeof o.color === "string";
}
function mergeCatalog(remote, local) {
	const bySlug = /* @__PURE__ */ new Map();
	for (const obj of remote) bySlug.set(obj.slug, obj);
	for (const obj of local) if (!bySlug.has(obj.slug)) bySlug.set(obj.slug, {
		...obj,
		imageKey: obj.imageKey ?? "",
		isSeed: false
	});
	return [...bySlug.values()];
}
async function loadCatalog() {
	let remote = [];
	try {
		remote = await listObjects();
	} catch {
		remote = [];
	}
	const local = loadLocalCommunity();
	const merged = mergeCatalog(remote, local);
	saveLocalCommunity(merged);
	const missing = local.filter((o) => !o.isSeed && !remote.some((r) => r.slug === o.slug));
	if (missing.length > 0) restoreCommunity({ data: { objects: missing.map((o) => ({
		slug: o.slug,
		name: o.name,
		category: o.category,
		subcategory: o.subcategory,
		widthM: o.widthM,
		heightM: o.heightM,
		depthM: o.depthM,
		visualKind: VISUAL_KINDS.includes(o.visualKind) ? o.visualKind : "box",
		color: /^#[0-9a-fA-F]{6}$/.test(o.color) ? o.color : "#c8ccd4",
		imageKey: o.imageKey ?? "",
		sourceNote: o.sourceNote
	})) } }).catch(() => void 0);
	return merged;
}
function useCatalog() {
	return useQuery({
		queryKey: ["objects"],
		queryFn: loadCatalog,
		staleTime: 15e3
	});
}
//#endregion
export { ObjectVisual as a, SelectItem as c, cn as d, contributeObject as f, Label as i, SelectTrigger as l, useCatalog as m, Button as n, Select as o, upsertLocalCommunity as p, Input as r, SelectContent as s, AppHeader as t, SelectValue as u };
