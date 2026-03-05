import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { forgotPassword } from "../../api/authApi";
import { ForgotPasswordForm } from "../../features/auth/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values) {
    setLoading(true);
    try {
      const response = await forgotPassword(values);
      toast.success(response.message || "Reset link sent");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to send reset link");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-5">
      <header>
        <h1 className="font-display text-2xl font-bold">Forgot Password</h1>
        <p className="mt-1 text-sm text-muted">We will email your reset link.</p>
      </header>

      <ForgotPasswordForm onSubmit={handleSubmit} loading={loading} />

      <p className="text-sm text-muted">
        Remembered your password?{" "}
        <Link to="/login" className="font-semibold text-primary hover:underline">
          Go back to login
        </Link>
      </p>
    </section>
  );
}
