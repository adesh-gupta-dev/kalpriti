import { AlertTriangle } from "lucide-react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
  tone = "danger",
}) {
  return (
    <Modal open={open} onClose={onCancel} title={title} description={description}>
      <div className="mt-2 flex items-center gap-2 rounded-xl bg-warning/10 p-3 text-sm text-ink">
        <AlertTriangle className="h-4 w-4 text-warning" />
        This action can impact existing project data.
      </div>
      <div className="mt-5 flex justify-end gap-3">
        <Button variant="secondary" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button variant={tone === "danger" ? "danger" : "primary"} onClick={onConfirm} loading={loading}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
