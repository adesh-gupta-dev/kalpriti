import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { getAllTransactionsAdmin, updateTransactionStatusAdmin } from "../../api/paymentApi";
import { ConfirmDialog } from "../../components/common/ConfirmDialog";
import { EmptyState } from "../../components/common/EmptyState";
import { ErrorState } from "../../components/common/ErrorState";
import { DataTableSkeleton } from "../../components/table/DataTableSkeleton";
import { AdminDashboard } from "../../features/admin/components/AdminDashboard";
import { AdminTransactionsTable } from "../../features/admin/components/AdminTransactionsTable";
import { TransactionDetailsModal } from "../../features/admin/components/TransactionDetailsModal";
import {
  computeTransactionStats,
  normalizeTransaction,
} from "../../features/admin/utils/transactionStats";

function toCsvValue(value) {
  const safe = String(value ?? "").replace(/"/g, '""');
  return `"${safe}"`;
}

function exportTransactionsCsv(transactions) {
  const headers = [
    "transaction_id",
    "user",
    "plan",
    "amount",
    "credits",
    "status",
    "created_at",
  ];

  const lines = [headers.join(",")];

  transactions.forEach((transaction) => {
    lines.push(
      [
        toCsvValue(transaction._id),
        toCsvValue(transaction.userEmail || transaction.userId),
        toCsvValue(transaction.planId),
        toCsvValue(transaction.amount),
        toCsvValue(transaction.credits),
        toCsvValue(transaction.paymentStatus),
        toCsvValue(transaction.createdAt),
      ].join(","),
    );
  });

  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `kalpriti-transactions-${Date.now()}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [statusDrafts, setStatusDrafts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [updatingId, setUpdatingId] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [statusConfirmPayload, setStatusConfirmPayload] = useState(null);

  async function fetchTransactions() {
    setLoading(true);
    setError("");

    try {
      const response = await getAllTransactionsAdmin();
      const normalized = (response.transactions || []).map(normalizeTransaction);

      setTransactions(normalized);
      setStatusDrafts(
        normalized.reduce((accumulator, transaction) => {
          accumulator[transaction._id] = transaction.paymentStatus;
          return accumulator;
        }, {}),
      );
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load transactions");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = transactions.filter((transaction) => {
      const haystack = [
        transaction.userEmail,
        transaction.email,
        transaction.userId,
        transaction.planId,
        transaction.paymentIntentId,
      ]
        .filter(Boolean)
        .map((value) => String(value).toLowerCase())
        .join(" ");

      const matchesSearch = !query || haystack.includes(query);
      const matchesStatus = status === "all" || transaction.paymentStatus === status;

      return matchesSearch && matchesStatus;
    });

    return filtered.sort((a, b) => {
      const first = new Date(a.createdAt).getTime();
      const second = new Date(b.createdAt).getTime();
      return sort === "desc" ? second - first : first - second;
    });
  }, [transactions, search, status, sort]);

  const stats = useMemo(
    () => computeTransactionStats(filteredTransactions.length ? filteredTransactions : transactions),
    [filteredTransactions, transactions],
  );

  const paginatedTransactions = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredTransactions.slice(start, start + pageSize);
  }, [filteredTransactions, page, pageSize]);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / pageSize));
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [filteredTransactions.length, page, pageSize]);

  function handlePageChange(nextPage, nextPageSize = pageSize) {
    setPage(nextPage);
    if (nextPageSize !== pageSize) {
      setPageSize(nextPageSize);
      setPage(1);
    }
  }

  function handleStatusDraftChange(transactionId, nextStatus) {
    setStatusDrafts((current) => ({
      ...current,
      [transactionId]: nextStatus,
    }));
  }

  function handleRequestStatusUpdate(transaction, nextStatus) {
    if (nextStatus === transaction.paymentStatus) {
      toast("No status change detected");
      return;
    }

    setStatusConfirmPayload({
      transaction,
      nextStatus,
    });
  }

  async function handleConfirmStatusUpdate() {
    if (!statusConfirmPayload) return;

    const { transaction, nextStatus } = statusConfirmPayload;
    setUpdatingId(transaction._id);

    try {
      const response = await updateTransactionStatusAdmin(transaction._id, nextStatus);
      const updatedTransaction = normalizeTransaction(response.transaction);

      setTransactions((current) =>
        current.map((item) => (item._id === transaction._id ? { ...item, ...updatedTransaction } : item)),
      );

      setStatusDrafts((current) => ({
        ...current,
        [transaction._id]: updatedTransaction.paymentStatus,
      }));

      toast.success("Transaction status updated");
    } catch (errorResponse) {
      toast.error(errorResponse.response?.data?.message || "Unable to update status");
    } finally {
      setUpdatingId("");
      setStatusConfirmPayload(null);
    }
  }

  if (loading) {
    return (
      <section className="space-y-4">
        <AdminDashboard stats={computeTransactionStats([])} />
        <DataTableSkeleton rows={8} columns={8} />
      </section>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load transactions"
        message={error}
        onRetry={fetchTransactions}
      />
    );
  }

  return (
    <section className="space-y-4">
      <AdminDashboard stats={stats} />

      {!filteredTransactions.length ? (
        <EmptyState
          title="No transactions matched"
          description="Adjust filters or search terms to see transactions."
        />
      ) : (
        <AdminTransactionsTable
          transactions={paginatedTransactions}
          total={filteredTransactions.length}
          page={page}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          search={search}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          status={status}
          onStatusChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
          sort={sort}
          onSortChange={setSort}
          statusDrafts={statusDrafts}
          onStatusDraftChange={handleStatusDraftChange}
          onViewDetails={setSelectedTransaction}
          onUpdateStatus={handleRequestStatusUpdate}
          updatingId={updatingId}
          onExportCsv={() => exportTransactionsCsv(filteredTransactions)}
        />
      )}

      <TransactionDetailsModal
        open={Boolean(selectedTransaction)}
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />

      <ConfirmDialog
        open={Boolean(statusConfirmPayload)}
        onCancel={() => setStatusConfirmPayload(null)}
        onConfirm={handleConfirmStatusUpdate}
        loading={Boolean(updatingId)}
        title="Update transaction status"
        description={`Change status to "${statusConfirmPayload?.nextStatus || ""}"?`}
        confirmLabel="Update Status"
        tone="primary"
      />
    </section>
  );
}
