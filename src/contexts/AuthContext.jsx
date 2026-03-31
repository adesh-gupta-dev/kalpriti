import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import * as authApi from "../api/authApi";
import { setUnauthorizedHandler } from "../api/axiosClient";

const AuthContext = createContext(null);

const PUBLIC_AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

function isPublicAuthPath(pathname) {
  return PUBLIC_AUTH_ROUTES.some((route) => pathname.startsWith(route));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUnauthorized = useCallback(() => {
    setUser(null);
    if (typeof window === "undefined") return;
    const { pathname } = window.location;
    if (!isPublicAuthPath(pathname)) {
      window.location.assign("/login");
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    try {
      const response = await authApi.getProfile();
      setUser(response.user ?? null);
      return response.user ?? null;
    } catch (_error) {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (payload) => {
    const response = await authApi.login(payload);
    setUser(response.user ?? null);
    return response;
  }, []);

  const register = useCallback(async (payload) => {
    const response = await authApi.register(payload);
    return response;
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout();
    setUser(null);
  }, []);

  const patchUser = useCallback((patch) => {
    setUser((current) => (current ? { ...current, ...patch } : current));
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(handleUnauthorized);
    refreshProfile();
  }, [handleUnauthorized, refreshProfile]);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      refreshProfile,
      login,
      register,
      logout,
      setUser,
      patchUser,
    }),
    [user, loading, refreshProfile, login, register, logout, patchUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export function useRequireVerified() {
  const { user } = useAuth();

  return {
    isVerified: Boolean(user?.verified),
    assertVerified() {
      if (!user?.verified) {
        toast.error("Please verify your email to continue.");
        return false;
      }
      return true;
    },
  };
}
