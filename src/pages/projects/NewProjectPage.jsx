import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Card } from "../../components/ui/Card";
import { ProjectForm } from "../../features/projects/components/ProjectForm";
import { createProject } from "../../api/projectApi";
import { useRequireVerified } from "../../contexts/AuthContext";

export default function NewProjectPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { assertVerified } = useRequireVerified();

  async function handleSubmit(values) {
    if (!assertVerified()) return;

    setLoading(true);
    try {
      const response = await createProject(values);
      const project = response.WebsiteProject;
      toast.success(response.message || "Project created");
      navigate(`/projects/${project._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to create project");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl space-y-5">
      <div>
        <h1 className="font-display text-3xl font-bold">Create New Project</h1>
        <p className="mt-1 text-sm text-muted">
          Give Kalpriti your prompt and generate your first website version.
        </p>
      </div>

      <Card>
        <ProjectForm mode="create" onSubmit={handleSubmit} loading={loading} />
      </Card>
    </section>
  );
}
