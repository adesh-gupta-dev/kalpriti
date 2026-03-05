import { Inbox } from "lucide-react";

export function EmptyState({ title, description }) {
  return (
    <div className="rounded-2xl border border-dashed border-ink/20 bg-panel/50 p-8 text-center">
      <Inbox className="mx-auto mb-3 h-6 w-6 text-muted" />
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      {description ? <p className="mt-1 text-sm text-muted">{description}</p> : null}
    </div>
  );
}
