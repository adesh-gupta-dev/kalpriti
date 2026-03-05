import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { verifyOtpSchema } from "../../../utils/validationSchemas";

export function VerifyOtpForm({ onVerify, onSendOtp, loading = false, sendingOtp = false }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onVerify)}>
      <div className="rounded-xl bg-primary/10 p-3 text-sm text-primary">
        We will verify your email using a one-time password.
      </div>
      <Input
        label="OTP"
        error={errors.otp?.message}
        placeholder="Enter OTP"
        {...register("otp")}
      />
      <div className="flex flex-wrap gap-2">
        <Button type="submit" loading={loading}>
          Verify Email
        </Button>
        <Button type="button" variant="secondary" onClick={onSendOtp} loading={sendingOtp}>
          Send OTP
        </Button>
      </div>
    </form>
  );
}
