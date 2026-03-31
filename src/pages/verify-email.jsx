import VerifyEmailPage from "../screens/auth/VerifyEmailPage";
import { AppLayout } from "../layouts/AppLayout";
import { ProtectedRoute } from "../routes/ProtectedRoute";

function VerifyEmail() {
  return <VerifyEmailPage />;
}

VerifyEmail.getLayout = (page) => (
  <ProtectedRoute>
    <AppLayout>{page}</AppLayout>
  </ProtectedRoute>
);

export default VerifyEmail;
