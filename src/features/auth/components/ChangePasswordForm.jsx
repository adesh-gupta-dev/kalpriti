import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { changePasswordSchema } from "../../../utils/validationSchemas";

export function ChangePasswordForm({ onSubmit, loading = false }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function submit(values) {
    await onSubmit(values);
    reset({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(submit)}>
      <Input
        label="Current Password"
        type="password"
        error={errors.oldPassword?.message}
        {...register("oldPassword")}
      />
      <Input
        label="New Password"
        type="password"
        error={errors.newPassword?.message}
        {...register("newPassword")}
      />
      <Input
        label="Confirm Password"
        type="password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />
      <Button type="submit" loading={loading}>
        Change Password
      </Button>
    </form>
  );
}
