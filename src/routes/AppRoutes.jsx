import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppSpinner } from "../components/common/AppSpinner";
import { AdminRoute } from "./AdminRoute";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicOnlyRoute } from "./PublicOnlyRoute";
import { AppLayout } from "../layouts/AppLayout";
import { AdminLayout } from "../layouts/AdminLayout";
import { AuthLayout } from "../layouts/AuthLayout";

const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("../pages/auth/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("../pages/auth/ResetPasswordPage"));
const LandingPage = lazy(() => import("../pages/LandingPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const ProjectsPage = lazy(() => import("../pages/projects/ProjectsPage"));
const CommunityPage = lazy(() => import("../pages/projects/CommunityPage"));
const CommunityProjectDetailPage = lazy(() =>
  import("../pages/projects/CommunityProjectDetailPage"),
);
const NewProjectPage = lazy(() => import("../pages/projects/NewProjectPage"));
const ProjectDetailPage = lazy(() => import("../pages/projects/ProjectDetailPage"));
const ProjectSettingsPage = lazy(() => import("../pages/projects/ProjectSettingsPage"));
const PricingPage = lazy(() => import("../pages/PricingPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const AdminTransactionsPage = lazy(() => import("../pages/admin/AdminTransactionsPage"));
const AdminAnalyticsPage = lazy(() => import("../pages/admin/AdminAnalyticsPage"));
const VerifyEmailPage = lazy(() => import("../pages/auth/VerifyEmailPage"));
const UnauthorizedPage = lazy(() => import("../pages/UnauthorizedPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const ServerErrorPage = lazy(() => import("../pages/ServerErrorPage"));

export function AppRoutes() {
  return (
    <Suspense fallback={<AppSpinner label="Loading page..." />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<PublicOnlyRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/community/:id" element={<CommunityProjectDetailPage />} />
            <Route path="/projects/new" element={<NewProjectPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/projects/:id/settings" element={<ProjectSettingsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Navigate to="/admin/transactions" replace />} />
              <Route path="/admin/transactions" element={<AdminTransactionsPage />} />
              <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/server-error" element={<ServerErrorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
