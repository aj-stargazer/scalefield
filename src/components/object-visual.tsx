import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { objectImageSrc, type CatalogObject } from "@/lib/types";

type Props = {
  object: Pick<CatalogObject, "visualKind" | "color" | "name"> & {
    imageKey?: string;
    imageAspect?: number | null;
  };
  className?: string;
  silhouette?: boolean;
  /** `height` locks photo height to the box (accurate scale). Thumbs use contain. */
  fit?: "contain" | "height";
};

function ColoredSphere({ color }: { color: string }) {
  return (
    <div
      className="obj-sphere h-full w-full"
      style={{
        background: `radial-gradient(circle at 32% 28%, color-mix(in oklab, ${color} 45%, white), ${color} 44%, color-mix(in oklab, ${color} 55%, black))`,
      }}
    />
  );
}

function Sphere({ kind }: { kind: string }) {
  const sphereClass =
    {
      mercury: "obj-mercury",
      venus: "obj-venus",
      earth: "obj-earth",
      mars: "obj-mars",
      jupiter: "obj-jupiter",
      saturn: "obj-saturn",
      uranus: "obj-uranus",
      neptune: "obj-neptune",
    }[kind] ?? "obj-mercury";

  return (
    <div className="relative h-full w-full">
      {kind === "saturn" ? <div className="obj-ring" /> : null}
      <div className={cn("obj-sphere", sphereClass)}>
        {kind === "jupiter" ? <div className="obj-spot" /> : null}
      </div>
    </div>
  );
}

function Star({ kind }: { kind: string }) {
  const starClass =
    {
      "the-sun": "obj-sun",
      sirius: "obj-sirius",
      vega: "obj-vega",
      pollux: "obj-pollux",
      arcturus: "obj-arcturus",
    }[kind] ?? "obj-sun";
  const glow =
    {
      "the-sun": "radial-gradient(circle, rgba(255,180,40,0.7), transparent 70%)",
      sirius: "radial-gradient(circle, rgba(180,210,255,0.7), transparent 70%)",
      vega: "radial-gradient(circle, rgba(190,210,255,0.65), transparent 70%)",
      pollux: "radial-gradient(circle, rgba(255,160,70,0.65), transparent 70%)",
      arcturus: "radial-gradient(circle, rgba(255,110,30,0.7), transparent 70%)",
    }[kind] ?? "radial-gradient(circle, rgba(255,200,80,0.6), transparent 70%)";

  return (
    <div className="relative h-full w-full">
      <div className="obj-glow" style={{ background: glow }} />
      <div className={cn("obj-star", starClass)} />
    </div>
  );
}

function Human() {
  return (
    <svg viewBox="0 0 46 175" className="h-full w-full" preserveAspectRatio="xMidYMax meet" aria-hidden>
      <g fill="currentColor">
        <circle cx="23" cy="15" r="12" />
        <rect x="15" y="30" width="16" height="54" rx="8" />
        <rect x="3" y="34" width="11" height="46" rx="5" />
        <rect x="32" y="34" width="11" height="46" rx="5" />
        <rect x="15" y="82" width="7" height="93" rx="3.5" />
        <rect x="24" y="82" width="7" height="93" rx="3.5" />
      </g>
    </svg>
  );
}

function Housecat() {
  return (
    <svg viewBox="0 0 460 250" className="h-full w-full" preserveAspectRatio="xMidYMax meet" aria-hidden>
      <g fill="currentColor">
        <ellipse cx="250" cy="160" rx="150" ry="70" />
        <circle cx="120" cy="110" r="62" />
        <polygon points="78,70 88,18 118,78" />
        <polygon points="162,78 150,16 198,68" />
        <path d="M380 150c40 10 70 40 72 70 2 22-18 24-28 8-12-18-22-30-50-38Z" />
        <ellipse cx="200" cy="220" rx="22" ry="18" />
        <ellipse cx="270" cy="222" rx="22" ry="18" />
        <ellipse cx="140" cy="218" rx="20" ry="16" />
        <ellipse cx="320" cy="218" rx="20" ry="16" />
      </g>
    </svg>
  );
}

function SemiTruck() {
  return (
    <svg viewBox="0 0 220 41" className="h-full w-full" preserveAspectRatio="xMidYMax meet" aria-hidden>
      <g fill="currentColor">
        <rect x="48" y="6" width="168" height="24" rx="1.5" />
        <path d="M0 14h14l6-8h18v22H0z" />
        <rect x="20" y="8" width="10" height="7" rx="0.6" opacity="0.35" className="obj-windows" />
        <circle cx="18" cy="34" r="6" />
        <circle cx="36" cy="34" r="6" />
        <circle cx="70" cy="34" r="6" />
        <circle cx="88" cy="34" r="6" />
        <circle cx="186" cy="34" r="6" />
        <circle cx="204" cy="34" r="6" />
      </g>
    </svg>
  );
}

function Atari800() {
  return (
    <svg viewBox="0 0 406 114" className="h-full w-full" preserveAspectRatio="xMidYMax meet" aria-hidden>
      <g fill="currentColor">
        <path d="M8 18h390c6 0 8 4 8 8v70c0 8-6 14-14 14H18C8 110 4 104 4 96V26c0-6 2-8 4-8z" />
        <rect x="28" y="32" width="350" height="28" rx="2" opacity="0.25" className="obj-windows" />
        <rect x="40" y="72" width="240" height="18" rx="2" opacity="0.18" className="obj-windows" />
      </g>
    </svg>
  );
}

function EmpireState() {
  return (
    <svg viewBox="0 0 80 443" className="h-full w-full" preserveAspectRatio="xMidYMax meet" aria-hidden>
      <g fill="currentColor">
        <rect x="8" y="390" width="64" height="53" />
        <rect x="16" y="250" width="48" height="140" />
        <rect x="22" y="160" width="36" height="90" />
        <rect x="28" y="110" width="24" height="50" />
        <rect x="32" y="78" width="16" height="32" />
        <rect x="38" y="18" width="4" height="60" />
        <polygon points="38,18 42,18 40,0" />
      </g>
    </svg>
  );
}

function WillisTower() {
  return (
    <svg viewBox="0 0 90 527" className="h-full w-full" preserveAspectRatio="xMidYMax meet" aria-hidden>
      <g fill="currentColor">
        <rect x="10" y="167" width="70" height="360" />
        <rect x="22" y="97" width="46" height="70" />
        <rect x="34" y="57" width="22" height="40" />
        <rect x="36" y="8" width="4" height="49" />
        <rect x="50" y="18" width="4" height="39" />
      </g>
    </svg>
  );
}

function BurjKhalifa() {
  return (
    <svg viewBox="0 0 90 828" className="h-full w-full" preserveAspectRatio="xMidYMax meet" aria-hidden>
      <g fill="currentColor">
        <polygon points="18,828 72,828 58,420 48,220 45,120 44,70 46,828" />
        <rect x="43" y="8" width="4" height="70" />
        <polygon points="43,8 47,8 45,0" />
        <rect x="28" y="520" width="34" height="308" opacity="0.85" />
        <rect x="34" y="340" width="22" height="180" opacity="0.9" />
      </g>
    </svg>
  );
}

function Generic({ kind, color }: { kind: string; color: string }) {
  if (kind === "sphere") return <ColoredSphere color={color} />;
  if (kind === "person") return <Human />;
  if (kind === "animal") return <Housecat />;
  if (kind === "vehicle") return <SemiTruck />;
  if (kind === "device") return <Atari800 />;
  if (kind === "building") {
    return (
      <svg viewBox="0 0 60 160" className="h-full w-full" preserveAspectRatio="xMidYMax meet" aria-hidden>
        <rect x="8" y="20" width="44" height="140" fill="currentColor" />
        <rect x="18" y="0" width="24" height="24" fill="currentColor" />
      </svg>
    );
  }
  return <div className="h-full w-full rounded-[2px]" style={{ background: color }} />;
}

function ShapeVisual({ kind, color }: { kind: string; color: string }) {
  const planets = new Set([
    "mercury",
    "venus",
    "earth",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
    "neptune",
  ]);
  const stars = new Set(["the-sun", "sirius", "vega", "pollux", "arcturus"]);
  if (kind === "sphere") return <ColoredSphere color={color} />;
  if (planets.has(kind)) return <Sphere kind={kind} />;
  if (stars.has(kind)) return <Star kind={kind} />;
  if (kind === "average-man") return <Human />;
  if (kind === "housecat") return <Housecat />;
  if (kind === "semi-truck") return <SemiTruck />;
  if (kind === "atari-800") return <Atari800 />;
  if (kind === "empire-state") return <EmpireState />;
  if (kind === "willis-tower") return <WillisTower />;
  if (kind === "burj-khalifa") return <BurjKhalifa />;
  return <Generic kind={kind} color={color} />;
}

export function ObjectVisual({ object, className, silhouette, fit = "contain" }: Props) {
  const src = objectImageSrc(object);
  let body: ReactNode;
  if (src) {
    body = (
      <img
        src={src}
        alt=""
        draggable={false}
        className={
          fit === "height"
            ? "block h-full w-auto max-w-none"
            : "h-full w-full object-contain object-bottom"
        }
      />
    );
  } else {
    body = <ShapeVisual kind={object.visualKind} color={object.color} />;
  }

  return (
    <div
      className={cn("h-full w-full", fit === "height" && "w-max", silhouette && "sil", className)}
      style={{ color: silhouette ? "#ffffff" : object.color }}
      role="img"
      aria-label={object.name}
    >
      {body}
    </div>
  );
}
