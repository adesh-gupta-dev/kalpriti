import { Eye, Download } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { StatusBadge } from "./StatusBadge";
import { formatCurrencyInr, formatDate } from "../../../utils/formatters";

const STATUS_OPTIONS = ["all", "Pending", "Paid", "Failed"];

export function AdminTransactionsTable({
  transactions,
  total,
  page,
  pageSize,
  onPageChange,
  search,
  onSearchChange,
  status,
  onStatusChange,
  sort,
  onSortChange,
  statusDrafts,
  onStatusDraftChange,
  onViewDetails,
  onUpdateStatus,
  updatingId,
  onExportCsv,
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <Card className="space-y-4 p-0 w-[78dvw]">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-ink/10 p-4 ">
        <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 ">
          <label className="space-y-1 text-xs text-muted">
            Search (email/user)
            <input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search by email, user ID, plan"
              className="h-10 w-full rounded-xl border border-ink/15 bg-white px-3 text-sm text-ink outline-none transition-colors focus:border-primary dark:bg-panel"
            />
          </label>

          <label className="space-y-1 text-xs text-muted">
            Status
            <select
              value={status}
              onChange={(event) => onStatusChange(event.target.value)}
              className="h-10 w-full rounded-xl border border-ink/15 bg-white px-3 text-sm text-ink outline-none transition-colors focus:border-primary dark:bg-panel"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option === "all" ? "All statuses" : option}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1 text-xs text-muted">
            Sort by Date
            <select
              value={sort}
              onChange={(event) => onSortChange(event.target.value)}
              className="h-10 w-full rounded-xl border border-ink/15 bg-white px-3 text-sm text-ink outline-none transition-colors focus:border-primary dark:bg-panel"
            >
              <option value="desc">Newest first</option>
              <option value="asc">Oldest first</option>
            </select>
          </label>

          <label className="space-y-1 text-xs text-muted">
            Rows per page
            <select
              value={String(pageSize)}
              onChange={(event) => onPageChange(1, Number(event.target.value))}
              className="h-10 w-full rounded-xl border border-ink/15 bg-white px-3 text-sm text-ink outline-none transition-colors focus:border-primary dark:bg-panel"
            >
              {[10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        </div>

        <Button variant="secondary" onClick={onExportCsv}>
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1120px] border-collapse text-left text-sm">
          <thead className="sticky top-0 z-10 bg-surface">
            <tr className="border-b border-ink/10 text-muted">
              <th className="px-4 py-3 font-medium">Transaction</th>
              <th className="px-4 py-3 font-medium">User</th>
              <th className="px-4 py-3 font-medium">Plan</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Credits</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Created</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction._id}
                className="border-b border-ink/10 align-top"
              >
                <td className="px-4 py-3 text-xs text-muted">
                  {transaction._id}
                </td>
                <td className="px-4 py-3 text-xs text-muted">
                  {transaction.userEmail || String(transaction.userId || "-")}
                </td>
                <td className="px-4 py-3">{transaction.planId}</td>
                <td className="px-4 py-3">
                  {formatCurrencyInr(transaction.amount)}
                </td>
                <td className="px-4 py-3">{transaction.credits}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={transaction.paymentStatus} />
                </td>
                <td className="px-4 py-3 text-muted">
                  {formatDate(transaction.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <select
                      value={
                        statusDrafts[transaction._id] ||
                        transaction.paymentStatus
                      }
                      onChange={(event) =>
                        onStatusDraftChange(transaction._id, event.target.value)
                      }
                      className="h-9 rounded-lg border border-ink/15 bg-white px-2 text-xs text-ink outline-none transition-colors focus:border-primary dark:bg-panel"
                    >
                      {STATUS_OPTIONS.slice(1).map((statusOption) => (
                        <option key={statusOption} value={statusOption}>
                          {statusOption}
                        </option>
                      ))}
                    </select>
                    <Button
                      size="sm"
                      variant="secondary"
                      loading={updatingId === transaction._id}
                      onClick={() =>
                        onUpdateStatus(
                          transaction,
                          statusDrafts[transaction._id] ||
                            transaction.paymentStatus,
                        )
                      }
                    >
                      Update
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onViewDetails(transaction)}
                    >
                      <Eye className="h-4 w-4" />
                      Details
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 p-4 text-sm text-muted">
        <p>
          Showing{" "}
          <span className="font-medium text-ink">{transactions.length}</span> of{" "}
          <span className="font-medium text-ink">{total}</span> transactions
        </p>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onPageChange(Math.max(1, page - 1), pageSize)}
            disabled={page <= 1}
          >
            Previous
          </Button>
          <span className="text-xs">
            Page {page} of {totalPages}
          </span>
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              onPageChange(Math.min(totalPages, page + 1), pageSize)
            }
            disabled={page >= totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}
