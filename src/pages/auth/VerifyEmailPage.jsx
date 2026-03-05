import { useState } from "react";
import toast from "react-hot-toast";
import { sendVerificationEmail, verifyOtp } from "../../api/authApi";
import { VerifyOtpForm } from "../../features/auth/components/VerifyOtpForm";
import { Card } from "../../components/ui/Card";
import { useAuth } from "../../contexts/AuthContext";

export default function VerifyEmailPage() {
  const [verifying, setVerifying] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const { user, refreshProfile } = useAuth();

  async function handleSendOtp() {
    setSendingOtp(true);
    try {
      const response = await sendVerificationEmail();
      toast.success(response.message || "OTP sent to your email");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  }

  async function handleVerify(values) {
    setVerifying(true);
    try {
      const response = await verifyOtp(values);
      toast.success(response.message || "Email verified");
      await refreshProfile();
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setVerifying(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold">Verify Email</h1>
        <p className="mt-1 text-sm text-muted">
          Email: <span className="font-medium text-ink">{user?.email}</span>
        </p>
      </div>

      <Card>
        {user?.verified ? (
          <p className="rounded-xl bg-success/15 p-4 text-sm text-success">
            Your email is already verified.
          </p>
        ) : (
          <VerifyOtpForm
            onVerify={handleVerify}
            onSendOtp={handleSendOtp}
            loading={verifying}
            sendingOtp={sendingOtp}
          />
        )}
      </Card>
    </div>
  );
}
