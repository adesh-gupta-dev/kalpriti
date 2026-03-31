import RegisterPage from "../screens/auth/RegisterPage";
import { AuthLayout } from "../layouts/AuthLayout";
import { PublicOnlyRoute } from "../routes/PublicOnlyRoute";

function Register() {
  return <RegisterPage />;
}

Register.getLayout = (page) => (
  <PublicOnlyRoute>
    <AuthLayout>{page}</AuthLayout>
  </PublicOnlyRoute>
);

export default Register;
