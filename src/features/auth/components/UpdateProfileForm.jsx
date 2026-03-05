import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { updateProfileSchema } from "../../../utils/validationSchemas";

export function UpdateProfileForm({ initialValues, onSubmit, loading = false }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: initialValues?.name || "",
      email: initialValues?.email || "",
    },
  });

  useEffect(() => {
    reset({
      name: initialValues?.name || "",
      email: initialValues?.email || "",
    });
  }, [initialValues, reset]);

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input label="Name" error={errors.name?.message} {...register("name")} />
      <Input
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <Button type="submit" loading={loading}>
        Save Profile
      </Button>
    </form>
  );
}
