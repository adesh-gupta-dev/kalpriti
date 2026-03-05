import { Skeleton } from "../ui/Skeleton";

export function DataTableSkeleton({ rows = 8, columns = 7 }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-panel p-4">
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid gap-3" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
            {Array.from({ length: columns }).map((__, colIndex) => (
              <Skeleton key={colIndex} className="h-8 w-full" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
