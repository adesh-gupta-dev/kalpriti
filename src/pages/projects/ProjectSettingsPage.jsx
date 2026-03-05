import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { getProjectById, editProject, deleteProject, updateProjectVisibility } from "../../api/projectApi";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { AppSpinner } from "../../components/common/AppSpinner";
import { ErrorState } from "../../components/common/ErrorState";
import { ProjectForm } from "../../features/projects/components/ProjectForm";
import { ProjectMetadataCard } from "../../features/projects/components/ProjectMetadataCard";
import { PublishToggle } from "../../features/projects/components/PublishToggle";
import { DeleteProjectModal } from "../../features/projects/components/DeleteProjectModal";

export default function ProjectSettingsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function fetchProject() {
    setLoading(true);
    setError("");

    try {
      const response = await getProjectById(id);
      setProject(response.project);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load project");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProject();
  }, [id]);

  async function handleSave(values) {
    setSaving(true);
    try {
      const payload = {
        websiteName: values.websiteName,
        prompt: values.prompt || undefined,
      };
      const response = await editProject(id, payload);
      setProject(response.project);
      toast.success(response.message || "Project updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update project");
    } finally {
      setSaving(false);
    }
  }

  async function handleTogglePublish() {
    setPublishLoading(true);
    try {
      await updateProjectVisibility(id, !project.isPublished);
      setProject((current) => ({ ...current, isPublished: !current.isPublished }));
      toast.success("Project visibility updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update visibility");
    } finally {
      setPublishLoading(false);
    }
  }

  async function handleDelete() {
    setDeleteLoading(true);
    try {
      await deleteProject(id);
      toast.success("Project deleted");
      navigate("/projects");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete project");
    } finally {
      setDeleteLoading(false);
      setDeleteOpen(false);
    }
  }

  if (loading) return <AppSpinner label="Loading project settings..." />;

  if (error) {
    return <ErrorState title="Failed to load settings" message={error} onRetry={fetchProject} />;
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Project Settings</h1>
          <p className="mt-1 text-sm text-muted">Update metadata and publish controls.</p>
        </div>
        <Button as={Link} to={`/projects/${project._id}`} variant="secondary">
          Open Editor
        </Button>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Card>
          <h2 className="mb-4 font-display text-lg font-semibold">Edit Project</h2>
          <ProjectForm
            mode="edit"
            initialValues={{
              websiteName: project.name,
              initialPrompt: project.initial_prompt,
            }}
            onSubmit={handleSave}
            loading={saving}
            submitLabel="Update Project"
          />

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ink/10 bg-surface/70 p-3">
            <div>
              <p className="text-sm font-medium">Publish visibility</p>
              <p className="text-xs text-muted">Enable to make this project public to community users.</p>
            </div>
            <PublishToggle
              checked={Boolean(project.isPublished)}
              onToggle={handleTogglePublish}
              disabled={publishLoading}
            />
          </div>

          <div className="mt-4 rounded-xl border border-danger/20 bg-danger/5 p-3">
            <p className="text-sm font-medium text-danger">Danger Zone</p>
            <p className="mt-1 text-xs text-danger/90">
              Deleting this project permanently removes its conversation and version history.
            </p>
            <Button variant="danger" className="mt-3" onClick={() => setDeleteOpen(true)}>
              <Trash2 className="h-4 w-4" />
              Delete Project
            </Button>
          </div>
        </Card>

        <ProjectMetadataCard project={project} />
      </div>

      <DeleteProjectModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        loading={deleteLoading}
      />
    </section>
  );
}
