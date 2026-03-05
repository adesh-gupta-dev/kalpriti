export const APP_ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export function hasAnyRole(user, roles = []) {
  if (!user?.role) return false;
  return roles.includes(user.role);
}

export function canAccessAdmin(user) {
  return hasAnyRole(user, [APP_ROLES.ADMIN]);
}

export function canManageTransactions(user) {
  return hasAnyRole(user, [APP_ROLES.ADMIN]);
}

export function canViewAnalytics(user) {
  return hasAnyRole(user, [APP_ROLES.ADMIN]);
}
