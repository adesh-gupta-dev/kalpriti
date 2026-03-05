import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Code2, UserRound, CalendarDays } from "lucide-react";
import { getCommunityProjectById } from "../../api/projectApi";
import { AppSpinner } from "../../components/common/AppSpinner";
import { ErrorState } from "../../components/common/ErrorState";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { LivePreviewPane } from "../../features/projects/components/LivePreviewPane";
import { formatDate } from "../../utils/formatters";

export default function CommunityProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchProjectDetail() {
    setLoading(true);
    setError("");
    try {
      const response = await getCommunityProjectById(id);
      setProject(response.project || null);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load community project",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjectDetail();
  }, [id]);

  if (loading) {
    return <AppSpinner label="Loading community project..." />;
  }

  if (error || !project) {
    return (
      <ErrorState
        title="Community project unavailable"
        message={error || "Project not found"}
        onRetry={fetchProjectDetail}
      />
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button as={Link} to="/community" variant="secondary" size="sm">
          <ArrowLeft className="h-4 w-4" />
          Back to Community
        </Button>
      </div>

      <Card className="space-y-3">
        <h1 className="font-display text-3xl font-bold">{project.name}</h1>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <UserRound className="h-3.5 w-3.5" />
            {project.ownerName || "Unknown"}
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" />
            Updated {formatDate(project.updatedAt)}
          </span>
        </div>
        <p className="text-sm text-muted">{project.initial_prompt}</p>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <LivePreviewPane code={project.current_code || ""} />

        <Card className="space-y-3">
          <div className="inline-flex items-center gap-2 text-sm font-medium">
            <Code2 className="h-4 w-4 text-primary" />
            Generated Code Snapshot
          </div>
          <pre className="max-h-[420px] overflow-auto rounded-xl border border-ink/10 bg-surface/80 p-3 text-xs text-wrap text-muted">
            <code>
              {project.current_code || "No generated code available."}
            </code>
          </pre>
        </Card>
      </div>
    </section>
  );
}
