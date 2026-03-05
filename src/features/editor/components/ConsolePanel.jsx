import { Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/Button";

function resolveTone(type) {
  if (type === "error" || type === "runtime-error" || type === "promise-error") {
    return "text-danger";
  }
  if (type === "warn") {
    return "text-warning";
  }
  return "text-muted";
}

export function ConsolePanel({ logs, onClear }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-panel/90 p-3">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold">Preview Console</h3>
        <Button size="sm" variant="ghost" onClick={onClear}>
          <Trash2 className="h-4 w-4" />
          Clear
        </Button>
      </div>

      <div className="max-h-36 space-y-2 overflow-auto rounded-xl bg-surface/70 p-2 text-xs">
        {logs.length ? (
          logs.map((entry) => (
            <div key={entry.id} className={`font-mono ${resolveTone(entry.type)}`}>
              [{entry.type}] {entry.message}
            </div>
          ))
        ) : (
          <p className="text-muted">Console output from iframe will appear here.</p>
        )}
      </div>
    </div>
  );
}
