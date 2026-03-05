import { Link } from "react-router-dom";
import { Globe2, UserRound, CalendarDays } from "lucide-react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { formatDate } from "../../../utils/formatters";

export function CommunityProjectCard({ project }) {
  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">{project.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted">{project.initial_prompt}</p>
        </div>
        <Badge tone="success">Public</Badge>
      </div>

      <div className="space-y-1.5 text-xs text-muted">
        <p className="inline-flex items-center gap-1">
          <UserRound className="h-3.5 w-3.5" />
          By {project.ownerName || "Unknown"}
        </p>
        <p className="inline-flex items-center gap-1">
          <CalendarDays className="h-3.5 w-3.5" />
          Updated {formatDate(project.updatedAt)}
        </p>
      </div>

      <Button as={Link} to={`/community/${project._id}`} variant="secondary" size="sm">
        <Globe2 className="h-4 w-4" />
        Open Showcase
      </Button>
    </Card>
  );
}
