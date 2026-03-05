import { Navigate, Outlet } from "react-router-dom";
import { AppSpinner } from "../components/common/AppSpinner";
import { useAuth } from "../contexts/AuthContext";

export function PublicOnlyRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <AppSpinner label="Loading..." />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
