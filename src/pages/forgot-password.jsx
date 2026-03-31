import ForgotPasswordPage from "../screens/auth/ForgotPasswordPage";
import { AuthLayout } from "../layouts/AuthLayout";
import { PublicOnlyRoute } from "../routes/PublicOnlyRoute";

function ForgotPassword() {
  return <ForgotPasswordPage />;
}

ForgotPassword.getLayout = (page) => (
  <PublicOnlyRoute>
    <AuthLayout>{page}</AuthLayout>
  </PublicOnlyRoute>
);

export default ForgotPassword;
