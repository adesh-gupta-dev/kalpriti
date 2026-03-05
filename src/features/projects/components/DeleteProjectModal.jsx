import { ConfirmDialog } from "../../../components/common/ConfirmDialog";

export function DeleteProjectModal({ open, onClose, onConfirm, loading }) {
  return (
    <ConfirmDialog
      open={open}
      onCancel={onClose}
      onConfirm={onConfirm}
      loading={loading}
      title="Delete project"
      description="This project and related history will be permanently removed."
      confirmLabel="Delete"
      cancelLabel="Cancel"
      tone="danger"
    />
  );
}
