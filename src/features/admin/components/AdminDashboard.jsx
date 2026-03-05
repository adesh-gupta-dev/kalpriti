import { Card } from "../../../components/ui/Card";
import { AdminStatsCards } from "./AdminStatsCards";

export function AdminDashboard({ stats }) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Transactions Management</h1>
          <p className="mt-1 text-sm text-muted">
            Monitor payment health and update transaction statuses securely.
          </p>
        </div>
      </div>

      <Card className="space-y-4">
        <h2 className="font-display text-lg font-semibold">Overview</h2>
        <AdminStatsCards stats={stats} />
      </Card>
    </section>
  );
}
