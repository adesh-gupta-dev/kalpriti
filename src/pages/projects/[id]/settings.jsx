import ProjectSettingsPage from "../../../screens/projects/ProjectSettingsPage";
import { AppLayout } from "../../../layouts/AppLayout";
import { ProtectedRoute } from "../../../routes/ProtectedRoute";

function ProjectSettings() {
  return <ProjectSettingsPage />;
}

ProjectSettings.getLayout = (page) => (
  <ProtectedRoute>
    <AppLayout>{page}</AppLayout>
  </ProtectedRoute>
);

export default ProjectSettings;
