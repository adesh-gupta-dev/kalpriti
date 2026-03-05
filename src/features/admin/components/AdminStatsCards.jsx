import { Card } from "../../../components/ui/Card";
import { formatCurrencyInr } from "../../../utils/formatters";

export function AdminStatsCards({ stats }) {
  const cards = [
    {
      label: "Total Revenue",
      value: formatCurrencyInr(stats.totalRevenue),
      tone: "text-success",
    },
    {
      label: "Transactions",
      value: stats.totalTransactions,
      tone: "text-primary",
    },
    {
      label: "Successful",
      value: stats.successfulPayments,
      tone: "text-success",
    },
    {
      label: "Pending",
      value: stats.pendingPayments,
      tone: "text-warning",
    },
    {
      label: "Failed",
      value: stats.failedPayments,
      tone: "text-danger",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => (
        <Card key={card.label} className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-muted">{card.label}</p>
          <p className={`font-display text-2xl font-bold ${card.tone}`}>{card.value}</p>
        </Card>
      ))}
    </div>
  );
}
