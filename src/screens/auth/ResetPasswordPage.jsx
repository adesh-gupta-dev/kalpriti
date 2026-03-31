import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { resetPassword } from "../../api/authApi";
import { ResetPasswordForm } from "../../features/auth/components/ResetPasswordForm";

export default function ResetPasswordPage() {
  const router = useRouter();
  const token = Array.isArray(router.query.token)
    ? router.query.token[0]
    : router.query.token;
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values) {
    setLoading(true);
    try {
      const response = await resetPassword(token, values);
      toast.success(response.message || "Password reset complete");
      router.push("/dashboard");
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
        <Link href="/forgot-password" className="font-semibold text-primary hover:underline">
          Request reset link
        </Link>
      </p>
    </section>
  );
}
