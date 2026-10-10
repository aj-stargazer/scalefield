import { useQuery } from "@tanstack/react-query";
import { listObjects } from "@/lib/catalog";
import { loadLocalCommunity, saveLocalCommunity } from "@/lib/local-catalog";
import type { CatalogObject } from "@/lib/types";

async function loadCatalog(): Promise<CatalogObject[]> {
  try {
    const remote = await listObjects();
    saveLocalCommunity(remote);
    return remote;
  } catch {
    return loadLocalCommunity().map((o) => ({ ...o, imageAspect: o.imageAspect ?? null }));
  }
}

export function useCatalog() {
  return useQuery({
    queryKey: ["objects"],
    queryFn: loadCatalog,
    staleTime: 5_000,
  });
}
