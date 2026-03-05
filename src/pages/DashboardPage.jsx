import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Plus, FolderKanban, UserRoundCog, Sparkles, Coins } from "lucide-react";
import { getMyProjects } from "../api/projectApi";
import { Card } from "../components/ui/Card";
import { Skeleton } from "../components/ui/Skeleton";
import { Button } from "../components/ui/Button";
import { useAuth } from "../contexts/AuthContext";
import { formatDate } from "../utils/formatters";

function StatCard({ title, value, icon: Icon, tone = "primary" }) {
  const toneStyles = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/15 text-success",
    accent: "bg-accent/15 text-accent",
  };

  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">{title}</p>
        <span className={`rounded-xl p-2 ${toneStyles[tone]}`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="font-display text-2xl font-bold">{value}</p>
    </Card>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchProjects() {
      setLoading(true);
      try {
        const response = await getMyProjects();
        if (mounted) {
          setProjects(response.projects || []);
        }
      } catch (_error) {
        if (mounted) {
          setProjects([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchProjects();

    return () => {
      mounted = false;
    };
  }, []);

  const recentProjects = projects.slice(0, 3);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Welcome back, {user?.name}</h1>
        <p className="mt-1 text-sm text-muted">
          Manage AI website builds, versions, and credits from your dashboard.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Available Credits" value={user?.credits ?? 0} icon={Coins} tone="accent" />
        <StatCard title="Total Projects" value={projects.length} icon={FolderKanban} tone="primary" />
        <StatCard title="Total Creations" value={user?.totalCreation ?? 0} icon={Sparkles} tone="success" />
      </div>

      <Card>
        <h2 className="font-display text-lg font-semibold">Quick Actions</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Button as={Link} to="/projects/new" className="justify-start">
            <Plus className="h-4 w-4" />
            Create Project
          </Button>
          <Button as={Link} to="/projects" variant="secondary" className="justify-start">
            <FolderKanban className="h-4 w-4" />
            View Projects
          </Button>
          <Button as={Link} to="/profile" variant="secondary" className="justify-start">
            <UserRoundCog className="h-4 w-4" />
            Manage Profile
          </Button>
        </div>
      </Card>

      <Card>
        <h2 className="font-display text-lg font-semibold">Recent Projects</h2>
        <div className="mt-4 space-y-3">
          {loading ? (
            <>
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </>
          ) : recentProjects.length ? (
            recentProjects.map((project) => (
              <Link
                key={project._id}
                to={`/projects/${project._id}`}
                className="flex items-center justify-between rounded-xl border border-ink/10 bg-surface/60 px-4 py-3 transition-colors hover:border-primary/40"
              >
                <div>
                  <p className="font-medium text-ink">{project.name}</p>
                  <p className="text-xs text-muted">Updated {formatDate(project.updatedAt)}</p>
                </div>
                <span className="text-xs text-muted">
                  {project.isPublished ? "Published" : "Private"}
                </span>
              </Link>
            ))
          ) : (
            <p className="text-sm text-muted">No projects yet. Create your first one.</p>
          )}
        </div>
      </Card>
    </section>
  );
}
