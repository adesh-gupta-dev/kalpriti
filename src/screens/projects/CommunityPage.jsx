import { useEffect, useMemo, useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { getCommunityProjects } from "../../api/projectApi";
import { EmptyState } from "../../components/common/EmptyState";
import { ErrorState } from "../../components/common/ErrorState";
import { Input } from "../../components/ui/Input";
import { ProjectListSkeleton } from "../../features/projects/components/ProjectListSkeleton";
import { CommunityProjectCard } from "../../features/projects/components/CommunityProjectCard";

export default function CommunityPage() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchCommunityProjects() {
    setLoading(true);
    setError("");

    try {
      const response = await getCommunityProjects();
      setProjects(response.projects || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load community projects");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCommunityProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return projects;

    return projects.filter((project) => {
      const nameMatch = project.name?.toLowerCase().includes(query);
      const ownerMatch = project.ownerName?.toLowerCase().includes(query);
      const promptMatch = project.initial_prompt?.toLowerCase().includes(query);
      return nameMatch || ownerMatch || promptMatch;
    });
  }, [projects, search]);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Community Showcase</h1>
        <p className="mt-1 text-sm text-muted">
          Explore published projects from other creators and inspect their output.
        </p>
      </div>

      <div className="rounded-2xl border border-ink/10 bg-panel/60 p-4">
        <div className="relative max-w-xl">
          <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="pl-9"
            placeholder="Search by project, owner, or prompt"
            aria-label="Search community projects"
          />
        </div>
      </div>

      {loading ? <ProjectListSkeleton /> : null}

      {!loading && error ? (
        <ErrorState
          title="Unable to load community"
          message={error}
          onRetry={fetchCommunityProjects}
        />
      ) : null}

      {!loading && !error && !filteredProjects.length ? (
        <EmptyState
          title="No community projects found"
          description="Try a different search term or check back later."
        />
      ) : null}

      {!loading && !error && filteredProjects.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <CommunityProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : null}

      <div className="inline-flex items-center gap-2 rounded-xl border border-ink/10 bg-panel/70 px-3 py-2 text-xs text-muted">
        <Sparkles className="h-3.5 w-3.5 text-primary" />
        Only published projects are shown here.
      </div>
    </section>
  );
}
