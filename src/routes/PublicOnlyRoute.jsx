import { useEffect } from "react";
import { useRouter } from "next/router";
import { AppSpinner } from "../components/common/AppSpinner";
import { useAuth } from "../contexts/AuthContext";

export function PublicOnlyRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <AppSpinner label="Loading..." />;
  }

  if (isAuthenticated) {
    return <AppSpinner label="Redirecting to dashboard..." />;
  }

  return children;
}
