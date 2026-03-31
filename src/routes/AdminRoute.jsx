import { RoleBasedRoute } from "./RoleBasedRoute";

export function AdminRoute({ children }) {
  return <RoleBasedRoute allowedRoles={["ADMIN"]}>{children}</RoleBasedRoute>;
}
