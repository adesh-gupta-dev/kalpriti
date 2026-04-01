import dynamic from "next/dynamic";
import { Card } from "../../../components/ui/Card";
import { formatCurrencyInr } from "../../../utils/formatters";

const RevenueTrendChart = dynamic(
  () =>
    import("../../../components/charts/RevenueTrendChart").then(
      (module) => module.RevenueTrendChart,
    ),
  {
    ssr: false,
    loading: () => <div className="h-[320px] rounded-2xl border border-ink/10" />,
  },
);

const PaymentStatusChart = dynamic(
  () =>
    import("../../../components/charts/PaymentStatusChart").then(
      (module) => module.PaymentStatusChart,
    ),
  {
    ssr: false,
    loading: () => <div className="h-[320px] rounded-2xl border border-ink/10" />,
  },
);

export function AnalyticsOverview({ stats, revenueTrend, paymentStatusData }) {
  return (
    <section className="space-y-4">
      <div>
        <h1 className="font-display text-3xl font-bold">Admin Analytics</h1>
        <p className="mt-1 text-sm text-muted">
          Lightweight analytics derived from transaction data.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-muted">Total Revenue</p>
          <p className="font-display text-2xl font-bold text-success">
            {formatCurrencyInr(stats.totalRevenue)}
          </p>
        </Card>
        <Card className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-muted">Total Users</p>
          <p className="font-display text-2xl font-bold text-primary">{stats.totalUsers}</p>
        </Card>
        <Card className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-muted">Total Projects</p>
          <p className="font-display text-2xl font-bold text-primary">{stats.totalProjects}</p>
        </Card>
        <Card className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-muted">AI Requests</p>
          <p className="font-display text-2xl font-bold text-primary">{stats.totalAiRequests}</p>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <RevenueTrendChart data={revenueTrend} />
        <PaymentStatusChart data={paymentStatusData} />
      </div>

      <Card>
        <p className="text-sm text-muted">
          Credit usage estimate: <span className="font-semibold text-ink">{stats.creditUsage}</span>
          {" "}credits consumed across generated transactions.
        </p>
      </Card>
    </section>
  );
}
