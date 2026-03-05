import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LoginForm } from "../../features/auth/components/LoginForm";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const from = location.state?.from || "/dashboard";

  async function handleSubmit(values) {
    setLoading(true);
    try {
      await login(values);
      toast.success("Welcome back");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-5">
      <header>
        <h1 className="font-display text-2xl font-bold">Sign in to Kalpriti</h1>
        <p className="mt-1 text-sm text-muted">Continue building AI-generated websites.</p>
      </header>

      <LoginForm onSubmit={handleSubmit} loading={loading} />

      <div className="space-y-2 text-sm">
        <p className="text-muted">
          New to Kalpriti?{" "}
          <Link to="/register" className="font-semibold text-primary hover:underline">
            Create an account
          </Link>
        </p>
        <Link to="/forgot-password" className="font-semibold text-primary hover:underline">
          Forgot your password?
        </Link>
      </div>
    </section>
  );
}
