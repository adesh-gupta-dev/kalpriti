import ResetPasswordPage from "../../screens/auth/ResetPasswordPage";
import { AuthLayout } from "../../layouts/AuthLayout";
import { PublicOnlyRoute } from "../../routes/PublicOnlyRoute";

function ResetPassword() {
  return <ResetPasswordPage />;
}

ResetPassword.getLayout = (page) => (
  <PublicOnlyRoute>
    <AuthLayout>{page}</AuthLayout>
  </PublicOnlyRoute>
);

export default ResetPassword;
