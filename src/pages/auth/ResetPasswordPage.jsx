import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { resetPassword } from "../../api/authApi";
import { ResetPasswordForm } from "../../features/auth/components/ResetPasswordForm";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values) {
    setLoading(true);
    try {
      const response = await resetPassword(token, values);
      toast.success(response.message || "Password reset complete");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to reset password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-5">
      <header>
        <h1 className="font-display text-2xl font-bold">Reset Password</h1>
        <p className="mt-1 text-sm text-muted">Choose a secure new password.</p>
      </header>

      <ResetPasswordForm onSubmit={handleSubmit} loading={loading} />

      <p className="text-sm text-muted">
        Need a new link?{" "}
        <Link to="/forgot-password" className="font-semibold text-primary hover:underline">
          Request reset link
        </Link>
      </p>
    </section>
  );
}
