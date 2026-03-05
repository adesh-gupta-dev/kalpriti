import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { formatDate } from "../../../utils/formatters";

export function VersionCard({
  version,
  isCurrent,
  onRestore,
  onDelete,
  restoreLoading = false,
  deleteLoading = false,
}) {
  return (
    <Card className="space-y-3 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-ink">{version.description || "Saved version"}</p>
          <p className="text-xs text-muted">{formatDate(version.timestamp || version.createdAt)}</p>
        </div>
        {isCurrent ? <Badge tone="accent">Current</Badge> : null}
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={onRestore} loading={restoreLoading}>
          Restore
        </Button>
        <Button size="sm" variant="ghost" onClick={onDelete} loading={deleteLoading}>
          Delete
        </Button>
      </div>
    </Card>
  );
}
