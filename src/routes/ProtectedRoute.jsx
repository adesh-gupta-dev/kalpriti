import { useEffect } from "react";
import { useRouter } from "next/router";
import { AppSpinner } from "../components/common/AppSpinner";
import { useAuth } from "../contexts/AuthContext";

export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      const from = router.asPath || "/";
      router.replace({ pathname: "/login", query: { from } });
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <AppSpinner label="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return <AppSpinner label="Redirecting to login..." />;
  }

  return children;
}
