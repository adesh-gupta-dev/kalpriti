import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { BadgeCheck, ShieldAlert } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useAuth } from "../contexts/AuthContext";
import { changePassword, updateProfile } from "../api/authApi";
import { UpdateProfileForm } from "../features/auth/components/UpdateProfileForm";
import { ChangePasswordForm } from "../features/auth/components/ChangePasswordForm";

export default function ProfilePage() {
  const { user, refreshProfile, patchUser } = useAuth();
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  async function handleUpdateProfile(values) {
    setProfileLoading(true);
    try {
      const response = await updateProfile(values);
      patchUser(response.updatedUser);
      toast.success(response.message || "Profile updated");
      await refreshProfile();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update profile");
    } finally {
      setProfileLoading(false);
    }
  }

  async function handleChangePassword(values) {
    setPasswordLoading(true);
    try {
      const response = await changePassword(values);
      patchUser(response.user);
      toast.success(response.message || "Password updated");
      await refreshProfile();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update password");
    } finally {
      setPasswordLoading(false);
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Profile Settings</h1>
        <p className="mt-1 text-sm text-muted">Manage your account details and security settings.</p>
      </div>

      <Card className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-lg font-semibold">Email Verification</h2>
          <p className="text-sm text-muted">Verified users can access all platform features.</p>
        </div>
        <div className="flex items-center gap-3">
          {user?.verified ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">
              <BadgeCheck className="h-4 w-4" />
              Verified
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-warning/20 px-3 py-1 text-xs font-semibold text-warning">
              <ShieldAlert className="h-4 w-4" />
              Not verified
            </span>
          )}
          {!user?.verified ? (
            <Button as={Link} href="/verify-email" variant="secondary">
              Verify Now
            </Button>
          ) : null}
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 font-display text-lg font-semibold">Update Profile</h2>
          <UpdateProfileForm
            initialValues={{ name: user?.name, email: user?.email }}
            onSubmit={handleUpdateProfile}
            loading={profileLoading}
          />
        </Card>

        <Card>
          <h2 className="mb-4 font-display text-lg font-semibold">Change Password</h2>
          <ChangePasswordForm onSubmit={handleChangePassword} loading={passwordLoading} />
        </Card>
      </div>
    </section>
  );
}
