import { RoleBasedRoute } from "./RoleBasedRoute";

export function AdminRoute() {
  return <RoleBasedRoute allowedRoles={["ADMIN"]} />;
}
