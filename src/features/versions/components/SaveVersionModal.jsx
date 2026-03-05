import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "../../../components/ui/Modal";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { saveVersionSchema } from "../../../utils/validationSchemas";

export function SaveVersionModal({ open, onClose, onSubmit, loading = false }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(saveVersionSchema),
    defaultValues: {
      description: "",
    },
  });

  async function submit(values) {
    await onSubmit(values);
    reset({ description: "" });
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Save Version"
      description="Capture a snapshot before your next change."
    >
      <form className="space-y-4" onSubmit={handleSubmit(submit)}>
        <Input
          label="Version Description"
          placeholder="Homepage refinement before footer changes"
          error={errors.description?.message}
          {...register("description")}
        />
        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Save Version
          </Button>
        </div>
      </form>
    </Modal>
  );
}
