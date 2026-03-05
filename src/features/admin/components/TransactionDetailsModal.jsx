import { Modal } from "../../../components/ui/Modal";
import { StatusBadge } from "./StatusBadge";
import { formatCurrencyInr, formatDate } from "../../../utils/formatters";

export function TransactionDetailsModal({ open, transaction, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Transaction Details"
      description="Detailed payment metadata for audit and support."
      className="max-w-2xl"
    >
      {!transaction ? null : (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-ink/10 bg-panel/70 p-3">
            <p className="text-xs text-muted">Transaction ID</p>
            <p className="mt-1 break-all text-sm">{transaction._id}</p>
          </div>
          <div className="rounded-xl border border-ink/10 bg-panel/70 p-3">
            <p className="text-xs text-muted">Plan</p>
            <p className="mt-1 text-sm">{transaction.planId}</p>
          </div>
          <div className="rounded-xl border border-ink/10 bg-panel/70 p-3">
            <p className="text-xs text-muted">Amount</p>
            <p className="mt-1 text-sm">{formatCurrencyInr(transaction.amount)}</p>
          </div>
          <div className="rounded-xl border border-ink/10 bg-panel/70 p-3">
            <p className="text-xs text-muted">Credits</p>
            <p className="mt-1 text-sm">{transaction.credits}</p>
          </div>
          <div className="rounded-xl border border-ink/10 bg-panel/70 p-3">
            <p className="text-xs text-muted">User</p>
            <p className="mt-1 break-all text-sm">{String(transaction.userId || "-")}</p>
          </div>
          <div className="rounded-xl border border-ink/10 bg-panel/70 p-3">
            <p className="text-xs text-muted">Payment Intent</p>
            <p className="mt-1 break-all text-sm">{transaction.paymentIntentId || "-"}</p>
          </div>
          <div className="rounded-xl border border-ink/10 bg-panel/70 p-3">
            <p className="text-xs text-muted">Provider</p>
            <p className="mt-1 text-sm">{transaction.paymentProvider || "-"}</p>
          </div>
          <div className="rounded-xl border border-ink/10 bg-panel/70 p-3">
            <p className="text-xs text-muted">Status</p>
            <div className="mt-1">
              <StatusBadge status={transaction.paymentStatus} />
            </div>
          </div>
          <div className="rounded-xl border border-ink/10 bg-panel/70 p-3 sm:col-span-2">
            <p className="text-xs text-muted">Created</p>
            <p className="mt-1 text-sm">{formatDate(transaction.createdAt)}</p>
          </div>
        </div>
      )}
    </Modal>
  );
}
