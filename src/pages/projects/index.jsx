import ProjectsPage from "../../screens/projects/ProjectsPage";
import { AppLayout } from "../../layouts/AppLayout";
import { ProtectedRoute } from "../../routes/ProtectedRoute";

function Projects() {
  return <ProjectsPage />;
}

Projects.getLayout = (page) => (
  <ProtectedRoute>
    <AppLayout>{page}</AppLayout>
  </ProtectedRoute>
);

export default Projects;
