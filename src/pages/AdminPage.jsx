import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RefreshCw, ShieldCheck } from "lucide-react";
import {
  getAllTransactionsAdmin,
  updateTransactionStatusAdmin,
} from "../api/paymentApi";
import { AppSpinner } from "../components/common/AppSpinner";
import { EmptyState } from "../components/common/EmptyState";
import { ErrorState } from "../components/common/ErrorState";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { formatCurrencyInr, formatDate } from "../utils/formatters";

const PAYMENT_STATUSES = ["Pending", "Paid", "Failed"];

function getStatusTone(status) {
  if (status === "Paid") return "success";
  if (status === "Failed") return "danger";
  return "warning";
}

export default function AdminPage() {
  const [transactions, setTransactions] = useState([]);
  const [statusDrafts, setStatusDrafts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  async function fetchTransactions() {
    setLoading(true);
    setError("");

    try {
      const response = await getAllTransactionsAdmin();
      const items = response.transactions || [];
      setTransactions(items);
      setStatusDrafts(
        items.reduce((accumulator, item) => {
          accumulator[item._id] = item.paymentStatus;
          return accumulator;
        }, {}),
      );
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load admin transactions");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function handleUpdateStatus(transactionId) {
    const selectedStatus = statusDrafts[transactionId];
    const currentTransaction = transactions.find((item) => item._id === transactionId);

    if (!selectedStatus || selectedStatus === currentTransaction?.paymentStatus) {
      toast("No status change detected");
      return;
    }

    setUpdatingId(transactionId);
    try {
      const response = await updateTransactionStatusAdmin(transactionId, selectedStatus);
      setTransactions((current) =>
        current.map((item) =>
          item._id === transactionId ? { ...item, ...response.transaction } : item,
        ),
      );
      toast.success("Transaction status updated");
    } catch (errorResponse) {
      toast.error(errorResponse.response?.data?.message || "Unable to update transaction");
    } finally {
      setUpdatingId("");
    }
  }

  if (loading) {
    return <AppSpinner label="Loading admin data..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Admin page unavailable"
        message={error}
        onRetry={fetchTransactions}
      />
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Admin Console</h1>
          <p className="mt-1 text-sm text-muted">
            Manage payment transactions and reconcile statuses.
          </p>
        </div>
        <Button variant="secondary" onClick={fetchTransactions}>
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <Card className="flex items-center gap-3 border-success/30 bg-success/10">
        <ShieldCheck className="h-5 w-5 text-success" />
        <p className="text-sm text-success">
          Admin access confirmed. You can review and update transaction states.
        </p>
      </Card>

      {!transactions.length ? (
        <EmptyState
          title="No transactions available"
          description="Transactions will appear here once users initiate payments."
        />
      ) : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full min-w-[960px] border-collapse text-left text-sm">
            <thead className="bg-surface/70 text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Transaction</th>
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Plan</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Credits</th>
                <th className="px-4 py-3 font-medium">Current Status</th>
                <th className="px-4 py-3 font-medium">Update Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id} className="border-t border-ink/10">
                  <td className="px-4 py-3 text-xs text-muted">{transaction._id}</td>
                  <td className="px-4 py-3 text-xs text-muted">{transaction.userId}</td>
                  <td className="px-4 py-3">{transaction.planId}</td>
                  <td className="px-4 py-3">{formatCurrencyInr(transaction.amount)}</td>
                  <td className="px-4 py-3">{transaction.credits}</td>
                  <td className="px-4 py-3">
                    <Badge tone={getStatusTone(transaction.paymentStatus)}>
                      {transaction.paymentStatus}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <select
                        value={statusDrafts[transaction._id] || transaction.paymentStatus}
                        onChange={(event) =>
                          setStatusDrafts((current) => ({
                            ...current,
                            [transaction._id]: event.target.value,
                          }))
                        }
                        className="h-9 rounded-lg border border-ink/15 bg-white px-2 text-xs text-ink outline-none focus:border-primary dark:bg-panel"
                      >
                        {PAYMENT_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <Button
                        size="sm"
                        variant="secondary"
                        loading={updatingId === transaction._id}
                        onClick={() => handleUpdateStatus(transaction._id)}
                      >
                        Update
                      </Button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">{formatDate(transaction.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </section>
  );
}
