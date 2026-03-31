import ProfilePage from "../screens/ProfilePage";
import { AppLayout } from "../layouts/AppLayout";
import { ProtectedRoute } from "../routes/ProtectedRoute";

function Profile() {
  return <ProfilePage />;
}

Profile.getLayout = (page) => (
  <ProtectedRoute>
    <AppLayout>{page}</AppLayout>
  </ProtectedRoute>
);

export default Profile;
