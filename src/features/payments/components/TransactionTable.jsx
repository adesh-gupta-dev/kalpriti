import { Badge } from "../../../components/ui/Badge";
import { Card } from "../../../components/ui/Card";
import { EmptyState } from "../../../components/common/EmptyState";
import { formatCurrencyInr, formatDate } from "../../../utils/formatters";

function getStatusTone(status) {
  if (status === "Paid") return "success";
  if (status === "Failed") return "danger";
  return "warning";
}

export function TransactionTable({ transactions }) {
  if (!transactions?.length) {
    return (
      <EmptyState
        title="No transactions yet"
        description="Your purchase history will show up here after checkout."
      />
    );
  }

  return (
    <Card className="overflow-x-auto p-0">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead className="bg-surface/70 text-muted">
          <tr>
            <th className="px-4 py-3 font-medium">Plan</th>
            <th className="px-4 py-3 font-medium">Amount</th>
            <th className="px-4 py-3 font-medium">Credits</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Created</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id} className="border-t border-ink/10">
              <td className="px-4 py-3">{transaction.planId}</td>
              <td className="px-4 py-3">{formatCurrencyInr(transaction.amount)}</td>
              <td className="px-4 py-3">{transaction.credits}</td>
              <td className="px-4 py-3">
                <Badge tone={getStatusTone(transaction.paymentStatus)}>
                  {transaction.paymentStatus}
                </Badge>
              </td>
              <td className="px-4 py-3 text-muted">{formatDate(transaction.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
