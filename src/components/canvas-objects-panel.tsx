import { Locate, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ObjectVisual } from "@/components/object-visual";
import { Button } from "@/components/ui/button";
import { formatObjectSize } from "@/lib/format";
import type { CanvasItem } from "@/lib/store";
import { cn } from "@/lib/utils";

export function CanvasObjectsPanel({
  items,
  selectedId,
  onSelect,
  onRemove,
  onFocus,
  className,
}: {
  items: CanvasItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onFocus: (id: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex min-h-0 flex-col border-t border-border", className)}>
      <div className="flex items-center justify-between px-3 py-2">
        <h2 className="text-xs font-medium tracking-wide text-muted uppercase">Canvas objects</h2>
        <span className="font-mono text-[11px] text-subtle tabular-nums">{items.length}</span>
      </div>
      {items.length === 0 ? (
        <p className="px-4 py-4 text-sm text-subtle">No objects</p>
      ) : (
        <ScrollArea className="min-h-0 flex-1">
          <ul className="flex flex-col gap-0.5 px-2 pb-2">
            {items.map((item) => (
              <li key={item.instanceId}>
                <div
                  className={cn(
                    "flex items-center gap-2 rounded-sm px-2 py-1.5",
                    selectedId === item.instanceId ? "bg-bg-subtle" : "hover:bg-bg-subtle/60",
                  )}
                >
                  <button
                    type="button"
                    className="flex min-w-0 flex-1 items-center gap-2 text-left"
                    onClick={() => onSelect(item.instanceId)}
                  >
                    <div className="flex size-8 shrink-0 items-end justify-center overflow-hidden rounded-sm bg-bg shadow-[var(--shadow-border)]">
                      <div className="h-[78%] w-[78%]">
                        <ObjectVisual object={item.object} />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm">{item.object.name}</div>
                      <div className="font-mono text-[10px] text-subtle tabular-nums">
                        {formatObjectSize(item.object)}
                      </div>
                    </div>
                  </button>
                  <div className="flex shrink-0">
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="ghost"
                      aria-label={`Zoom to ${item.object.name}`}
                      onClick={() => onFocus(item.instanceId)}
                    >
                      <Locate className="size-3.5" />
                    </Button>
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="ghost"
                      aria-label={`Remove ${item.object.name}`}
                      onClick={() => onRemove(item.instanceId)}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      )}
    </div>
  );
}
