import { CalendarDays, Eye, FileCode2, PencilLine, Settings, Trash2 } from "lucide-react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { ToggleSwitch } from "../../../components/ui/ToggleSwitch";
import { formatDate } from "../../../utils/formatters";

export function ProjectCard({
  project,
  onOpen,
  onSettings,
  onDelete,
  onTogglePublish,
  publishLoading = false,
}) {
  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">{project.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted">{project.initial_prompt}</p>
        </div>
        <Badge tone={project.isPublished ? "success" : "default"}>
          {project.isPublished ? "Published" : "Private"}
        </Badge>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
        <span className="inline-flex items-center gap-1">
          <CalendarDays className="h-3.5 w-3.5" />
          Updated {formatDate(project.updatedAt)}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="secondary" size="sm" onClick={onOpen}>
          <FileCode2 className="h-4 w-4" />
          Open
        </Button>
        <Button variant="secondary" size="sm" onClick={onSettings}>
          <Settings className="h-4 w-4" />
          Settings
        </Button>
        <Button variant="ghost" size="sm" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </div>

      <div className="flex items-center justify-between rounded-xl bg-surface/80 px-3 py-2">
        <span className="inline-flex items-center gap-1 text-sm text-muted">
          <Eye className="h-4 w-4" />
          Community Visibility
        </span>
        <ToggleSwitch
          checked={Boolean(project.isPublished)}
          onChange={onTogglePublish}
          disabled={publishLoading}
          label={publishLoading ? "Updating" : ""}
        />
      </div>

      <div className="rounded-xl border border-dashed border-ink/15 px-3 py-2 text-xs text-muted">
        <PencilLine className="mr-1 inline h-3.5 w-3.5" />
        Project ID: {project._id}
      </div>
    </Card>
  );
}
