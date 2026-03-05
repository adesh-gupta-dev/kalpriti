import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { PlusCircle } from "lucide-react";
import { getMyProjects, deleteProject, updateProjectVisibility } from "../../api/projectApi";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/common/EmptyState";
import { ErrorState } from "../../components/common/ErrorState";
import { ProjectFilters } from "../../features/projects/components/ProjectFilters";
import { ProjectCard } from "../../features/projects/components/ProjectCard";
import { ProjectListSkeleton } from "../../features/projects/components/ProjectListSkeleton";
import { DeleteProjectModal } from "../../features/projects/components/DeleteProjectModal";

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [visibility, setVisibility] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingProject, setDeletingProject] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [publishLoadingId, setPublishLoadingId] = useState("");

  async function fetchProjects() {
    setLoading(true);
    setError("");
    try {
      const response = await getMyProjects();
      setProjects(response.projects || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load projects");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const queryMatch = project.name.toLowerCase().includes(search.toLowerCase());
      const visibilityMatch =
        visibility === "all" ||
        (visibility === "published" && project.isPublished) ||
        (visibility === "private" && !project.isPublished);

      return queryMatch && visibilityMatch;
    });
  }, [projects, search, visibility]);

  async function handleDeleteProject() {
    if (!deletingProject) return;

    setDeleteLoading(true);
    try {
      await deleteProject(deletingProject._id);
      toast.success("Project deleted");
      setProjects((prev) => prev.filter((item) => item._id !== deletingProject._id));
      setDeletingProject(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete project");
    } finally {
      setDeleteLoading(false);
    }
  }

  async function handleTogglePublish(project) {
    setPublishLoadingId(project._id);

    try {
      await updateProjectVisibility(project._id, !project.isPublished);
      setProjects((prev) =>
        prev.map((item) =>
          item._id === project._id ? { ...item, isPublished: !item.isPublished } : item,
        ),
      );
      toast.success("Project visibility updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update visibility");
    } finally {
      setPublishLoadingId("");
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Projects</h1>
          <p className="mt-1 text-sm text-muted">Browse and manage all generated websites.</p>
        </div>
        <Button as={Link} to="/projects/new">
          <PlusCircle className="h-4 w-4" />
          New Project
        </Button>
      </div>

      <ProjectFilters
        search={search}
        onSearchChange={setSearch}
        visibility={visibility}
        onVisibilityChange={setVisibility}
      />

      {loading ? <ProjectListSkeleton /> : null}

      {!loading && error ? <ErrorState title="Unable to load projects" message={error} onRetry={fetchProjects} /> : null}

      {!loading && !error && !filteredProjects.length ? (
        <EmptyState
          title="No projects found"
          description="Try a different search or create a new project."
        />
      ) : null}

      {!loading && !error && filteredProjects.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onOpen={() => navigate(`/projects/${project._id}`)}
              onSettings={() => navigate(`/projects/${project._id}/settings`)}
              onDelete={() => setDeletingProject(project)}
              onTogglePublish={() => handleTogglePublish(project)}
              publishLoading={publishLoadingId === project._id}
            />
          ))}
        </div>
      ) : null}

      <DeleteProjectModal
        open={Boolean(deletingProject)}
        onClose={() => setDeletingProject(null)}
        onConfirm={handleDeleteProject}
        loading={deleteLoading}
      />
    </section>
  );
}
