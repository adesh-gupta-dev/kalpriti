import { ConfirmDialog } from "../../../components/common/ConfirmDialog";

export function RestoreVersionDialog({ open, onClose, onConfirm, loading = false }) {
  return (
    <ConfirmDialog
      open={open}
      onCancel={onClose}
      onConfirm={onConfirm}
      loading={loading}
      title="Restore this version?"
      description="Current project code will be replaced with this saved version."
      confirmLabel="Restore"
      cancelLabel="Cancel"
      tone="primary"
    />
  );
}
