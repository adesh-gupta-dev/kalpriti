import CommunityPage from "../../screens/projects/CommunityPage";
import { AppLayout } from "../../layouts/AppLayout";
import { ProtectedRoute } from "../../routes/ProtectedRoute";

function Community() {
  return <CommunityPage />;
}

Community.getLayout = (page) => (
  <ProtectedRoute>
    <AppLayout>{page}</AppLayout>
  </ProtectedRoute>
);

export default Community;
