export function TypingIndicator() {
  return (
    <div className="mx-3 mb-2 inline-flex items-center gap-1 rounded-xl border border-ink/10 bg-panel px-3 py-2 text-xs text-muted">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted" />
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted [animation-delay:120ms]" />
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted [animation-delay:220ms]" />
      AI is generating updates
    </div>
  );
}
