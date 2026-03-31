import NewProjectPage from "../../screens/projects/NewProjectPage";
import { AppLayout } from "../../layouts/AppLayout";
import { ProtectedRoute } from "../../routes/ProtectedRoute";

function NewProject() {
  return <NewProjectPage />;
}

NewProject.getLayout = (page) => (
  <ProtectedRoute>
    <AppLayout>{page}</AppLayout>
  </ProtectedRoute>
);

export default NewProject;
