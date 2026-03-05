import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppSpinner } from "../components/common/AppSpinner";
import { useAuth } from "../contexts/AuthContext";
import { hasAnyRole } from "../utils/permissions";

export function RoleBasedRoute({ allowedRoles = [] }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <AppSpinner label="Checking permissions..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (!hasAnyRole(user, allowedRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
