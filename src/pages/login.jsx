import LoginPage from "../screens/auth/LoginPage";
import { AuthLayout } from "../layouts/AuthLayout";
import { PublicOnlyRoute } from "../routes/PublicOnlyRoute";

function Login() {
  return <LoginPage />;
}

Login.getLayout = (page) => (
  <PublicOnlyRoute>
    <AuthLayout>{page}</AuthLayout>
  </PublicOnlyRoute>
);

export default Login;
