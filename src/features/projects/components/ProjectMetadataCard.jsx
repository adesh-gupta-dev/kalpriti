import { Card } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { formatDate } from "../../../utils/formatters";

export function ProjectMetadataCard({ project }) {
  if (!project) return null;

  return (
    <Card className="space-y-3">
      <h3 className="font-display text-base font-semibold">Project Metadata</h3>
      <div className="space-y-2 text-sm text-muted">
        <p>
          <span className="font-medium text-ink">Name:</span> {project.name}
        </p>
        <p>
          <span className="font-medium text-ink">Project ID:</span> {project._id}
        </p>
        <p>
          <span className="font-medium text-ink">Created:</span> {formatDate(project.createdAt)}
        </p>
        <p>
          <span className="font-medium text-ink">Updated:</span> {formatDate(project.updatedAt)}
        </p>
        <div>
          <span className="font-medium text-ink">Status:</span>{" "}
          <Badge tone={project.isPublished ? "success" : "default"}>
            {project.isPublished ? "Published" : "Private"}
          </Badge>
        </div>
      </div>
    </Card>
  );
}
