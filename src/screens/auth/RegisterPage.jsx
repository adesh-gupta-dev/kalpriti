import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { RegisterForm } from "../../features/auth/components/RegisterForm";
import { useAuth } from "../../contexts/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values) {
    setLoading(true);
    try {
      await register(values);
      toast.success("Registration complete. Please sign in.");
      router.push("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to register");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-5">
      <header>
        <h1 className="font-display text-2xl font-bold">Create your account</h1>
        <p className="mt-1 text-sm text-muted">Start building websites with AI workflows.</p>
      </header>

      <RegisterForm onSubmit={handleSubmit} loading={loading} />

      <p className="text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </section>
  );
}
