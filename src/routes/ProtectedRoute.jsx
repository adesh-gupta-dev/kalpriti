import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppSpinner } from "../components/common/AppSpinner";
import { useAuth } from "../contexts/AuthContext";

export function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <AppSpinner label="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
