import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/ui/Input";
import { Textarea } from "../../../components/ui/Textarea";
import { Button } from "../../../components/ui/Button";
import {
  projectCreateSchema,
  projectEditSchema,
} from "../../../utils/validationSchemas";

export function ProjectForm({
  mode = "create",
  initialValues,
  onSubmit,
  loading = false,
  submitLabel,
}) {
  const schema = mode === "create" ? projectCreateSchema : projectEditSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      websiteName: initialValues?.websiteName || "",
      initialPrompt: initialValues?.initialPrompt || "",
      prompt: "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        websiteName: initialValues.websiteName || "",
        initialPrompt: initialValues.initialPrompt || "",
        prompt: "",
      });
    }
  }, [initialValues, reset]);

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Website Name"
        placeholder="Kalpriti Landing"
        error={errors.websiteName?.message}
        {...register("websiteName")}
      />

      {mode === "create" ? (
        <Textarea
          label="Initial Prompt"
          placeholder="Build a modern SaaS landing page with hero, features, and pricing"
          error={errors.initialPrompt?.message}
          {...register("initialPrompt")}
        />
      ) : (
        <Textarea
          label="Optional AI Update Prompt"
          placeholder="Example: Make it cleaner, add testimonials and dark mode support"
          error={errors.prompt?.message}
          {...register("prompt")}
        />
      )}

      <Button type="submit" loading={loading}>
        {submitLabel || (mode === "create" ? "Create Project" : "Save Changes")}
      </Button>
    </form>
  );
}
