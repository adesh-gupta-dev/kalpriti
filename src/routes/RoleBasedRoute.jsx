import { useEffect } from "react";
import { useRouter } from "next/router";
import { AppSpinner } from "../components/common/AppSpinner";
import { useAuth } from "../contexts/AuthContext";
import { hasAnyRole } from "../utils/permissions";

export function RoleBasedRoute({ allowedRoles = [], children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      const from = router.asPath || "/";
      router.replace({ pathname: "/login", query: { from } });
      return;
    }

    if (!hasAnyRole(user, allowedRoles)) {
      router.replace("/unauthorized");
    }
  }, [loading, user, allowedRoles, router]);

  if (loading) {
    return <AppSpinner label="Checking permissions..." />;
  }

  if (!user) {
    return <AppSpinner label="Redirecting to login..." />;
  }

  if (!hasAnyRole(user, allowedRoles)) {
    return <AppSpinner label="Redirecting..." />;
  }

  return children;
}
