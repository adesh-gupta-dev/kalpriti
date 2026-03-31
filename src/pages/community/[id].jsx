import CommunityProjectDetailPage from "../../screens/projects/CommunityProjectDetailPage";
import { AppLayout } from "../../layouts/AppLayout";
import { ProtectedRoute } from "../../routes/ProtectedRoute";

function CommunityDetail() {
  return <CommunityProjectDetailPage />;
}

CommunityDetail.getLayout = (page) => (
  <ProtectedRoute>
    <AppLayout>{page}</AppLayout>
  </ProtectedRoute>
);

export default CommunityDetail;
