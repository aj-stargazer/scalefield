function trimNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  let digits = 2;
  if (abs >= 100) digits = 0;
  else if (abs >= 10) digits = 1;
  else if (abs >= 1) digits = 2;
  else if (abs >= 0.1) digits = 2;
  else digits = 3;
  const s = n.toFixed(digits);
  return s.replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1");
}

/** Format a length in meters using a human unit. */
export function formatMeters(meters: number): string {
  const m = Math.abs(meters);
  if (m === 0) return "0 m";
  if (m >= 1e12) return `${trimNumber(meters / 1e12)} billion km`;
  if (m >= 1e9) return `${trimNumber(meters / 1e9)} million km`;
  if (m >= 1_000) {
    const km = meters / 1_000;
    if (Math.abs(km) >= 10_000) {
      return `${Math.round(km).toLocaleString("en-US")} km`;
    }
    if (Math.abs(km) >= 100) return `${Math.round(km).toLocaleString("en-US")} km`;
    return `${trimNumber(km)} km`;
  }
  if (m >= 1) return `${trimNumber(meters)} m`;
  if (m >= 0.01) return `${trimNumber(meters * 100)} cm`;
  if (m >= 0.001) return `${trimNumber(meters * 1000)} mm`;
  return `${trimNumber(meters * 1e6)} µm`;
}

export function formatObjectSize(obj: {
  widthM: number;
  heightM: number;
  visualKind: string;
}): string {
  const spherical =
    obj.widthM === obj.heightM &&
    (obj.visualKind.includes("sun") ||
      obj.visualKind.includes("sirius") ||
      obj.visualKind.includes("vega") ||
      obj.visualKind.includes("pollux") ||
      obj.visualKind.includes("arcturus") ||
      ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune", "sphere"].includes(
        obj.visualKind,
      ));
  if (spherical) return `${formatMeters(obj.heightM)} Ø`;
  return `${formatMeters(obj.heightM)} H`;
}

export function slugify(name: string): string {
  const s = name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
  return s || "object";
}
