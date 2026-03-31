import ProjectDetailPage from "../../screens/projects/ProjectDetailPage";
import { AppLayout } from "../../layouts/AppLayout";
import { ProtectedRoute } from "../../routes/ProtectedRoute";

function ProjectDetail() {
  return <ProjectDetailPage />;
}

ProjectDetail.getLayout = (page) => (
  <ProtectedRoute>
    <AppLayout>{page}</AppLayout>
  </ProtectedRoute>
);

export default ProjectDetail;
