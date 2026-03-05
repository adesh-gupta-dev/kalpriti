import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizonal } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { chatMessageSchema } from "../../../utils/validationSchemas";

export function ChatInput({ onSend, loading = false }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: {
      content: "",
    },
  });

  async function submit(values) {
    await onSend(values.content);
    reset({ content: "" });
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="border-t border-ink/10 p-3">
      <div className="flex items-end gap-2">
        <textarea
          placeholder="Tell Kalpriti what to change..."
          rows={2}
          className="min-h-14 flex-1 resize-none rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-primary dark:bg-panel"
          {...register("content")}
        />
        <Button type="submit" loading={loading} className="h-11 w-11 p-0" aria-label="Send message">
          <SendHorizonal className="h-4 w-4" />
        </Button>
      </div>
      {errors.content ? <p className="mt-1 text-xs text-danger">{errors.content.message}</p> : null}
    </form>
  );
}
