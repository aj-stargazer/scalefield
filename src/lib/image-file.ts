const MAX_SIDE = 1024;
const MAX_DATA_URL = 1_800_000;

export type PreparedImage = {
  dataUrl: string;
  aspect: number;
};

export async function prepareImageFile(file: File): Promise<PreparedImage> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Choose a PNG, JPEG, WebP, or GIF");
  }
  if (file.size > 12 * 1024 * 1024) {
    throw new Error("Image is too large (max 12 MB)");
  }
  const bitmap = await createImageBitmap(file);
  let w = bitmap.width;
  let h = bitmap.height;
  if (w < 1 || h < 1) throw new Error("Could not read that image");
  const scale = Math.min(1, MAX_SIDE / Math.max(w, h));
  w = Math.max(1, Math.round(w * scale));
  h = Math.max(1, Math.round(h * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not process image");
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  let dataUrl = canvas.toDataURL("image/png");
  if (dataUrl.length > MAX_DATA_URL) {
    dataUrl = canvas.toDataURL("image/jpeg", 0.82);
  }
  if (dataUrl.length > MAX_DATA_URL) {
    throw new Error("Image is still too large after compressing — try a simpler PNG");
  }
  return { dataUrl, aspect: w / h };
}
