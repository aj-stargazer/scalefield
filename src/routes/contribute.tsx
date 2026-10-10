import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AppHeader } from "@/components/app-header";
import { ContributeForm } from "@/components/contribute-form";
import { useCatalog } from "@/lib/use-catalog";
import { formatObjectSize } from "@/lib/format";
import { ObjectVisual } from "@/components/object-visual";
import { deleteObject } from "@/lib/catalog";
import type { CatalogObject } from "@/lib/types";

export const Route = createFileRoute("/contribute")({
  component: ContributePage,
});

function ContributePage() {
  const { data: catalog = [] } = useCatalog();
  const community = catalog.filter((o) => !o.isSeed);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const editing = community.find((o) => o.slug === editingSlug) ?? null;
  const qc = useQueryClient();

  const remove = useMutation({
    mutationFn: (slug: string) => deleteObject({ data: { slug } }),
    onSuccess: async (_res, slug) => {
      if (editingSlug === slug) setEditingSlug(null);
      toast.success("Removed from the catalog");
      await qc.invalidateQueries({ queryKey: ["objects"] });
    },
    onError: (err: unknown) => {
      toast.error(err instanceof Error ? err.message : "Could not delete");
    },
  });

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      <AppHeader
        right={
          <Link
            to="/"
            className="rounded-sm px-3 py-1.5 text-xs font-medium text-muted no-underline hover:text-fg"
          >
            Back to compare
          </Link>
        }
      />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-8 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-wide text-muted uppercase">Community catalog</p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight">
            {editing ? "Edit item" : "Add / edit items"}
          </h1>
          <p className="mt-2 text-sm text-muted">
            Add anything with a real size, or fix a community object that has the wrong numbers or
            shouldn’t be here. Photos should be cut out on a transparent background when you can —
            silhouette mode turns them white.
          </p>
        </div>

        <ContributeForm
          key={editing?.slug ?? "new"}
          catalog={catalog}
          editing={editing}
          onCancelEdit={() => setEditingSlug(null)}
        />

        <EditorList
          objects={community}
          editingSlug={editingSlug}
          pendingSlug={remove.isPending ? remove.variables : null}
          onEdit={(obj) => {
            setEditingSlug(obj.slug);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onDelete={(obj) => {
            if (window.confirm(`Remove “${obj.name}” from the catalog? This cannot be undone.`)) {
              remove.mutate(obj.slug);
            }
          }}
        />
      </main>
    </div>
  );
}

function EditorList({
  objects,
  editingSlug,
  pendingSlug,
  onEdit,
  onDelete,
}: {
  objects: CatalogObject[];
  editingSlug: string | null;
  pendingSlug: string | null | undefined;
  onEdit: (obj: CatalogObject) => void;
  onDelete: (obj: CatalogObject) => void;
}) {
  const sorted = [...objects].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return (
    <section>
      <h2 className="text-sm font-medium text-fg">Community objects</h2>
      <p className="mt-1 text-xs text-muted">
        {sorted.length === 0
          ? "Nothing contributed yet. Built-in planets and buildings stay as they are."
          : "Anyone can correct or remove these. They are saved with the project, so they stay after a preview restart."}
      </p>
      {sorted.length > 0 ? (
        <ul className="mt-3 divide-y divide-border rounded-md bg-bg-elevated shadow-[var(--shadow-border)]">
          {sorted.map((obj) => (
            <li key={obj.slug} className="flex items-center gap-3 px-3 py-2">
              <div className="flex size-10 shrink-0 items-end justify-center overflow-hidden rounded-sm bg-bg">
                <div className="h-[78%] w-[78%]">
                  <ObjectVisual object={obj} />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm text-fg">{obj.name}</div>
                <div className="truncate font-mono text-[11px] text-subtle tabular-nums">
                  {obj.category}
                  {obj.subcategory ? ` · ${obj.subcategory}` : ""} · {formatObjectSize(obj)}
                </div>
              </div>
              <button
                type="button"
                className="rounded-sm px-2 py-1 text-xs text-muted hover:text-fg"
                onClick={() => onEdit(obj)}
              >
                {editingSlug === obj.slug ? "Editing" : "Edit"}
              </button>
              <button
                type="button"
                className="rounded-sm px-2 py-1 text-xs text-red-400 hover:text-red-300 disabled:opacity-50"
                disabled={pendingSlug === obj.slug}
                onClick={() => onDelete(obj)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
