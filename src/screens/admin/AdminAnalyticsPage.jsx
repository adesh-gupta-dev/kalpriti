import { useEffect, useMemo, useState } from "react";
import { getAllTransactionsAdmin } from "../../api/paymentApi";
import { DataTableSkeleton } from "../../components/table/DataTableSkeleton";
import { ErrorState } from "../../components/common/ErrorState";
import { AnalyticsOverview } from "../../features/analytics/components/AnalyticsOverview";
import {
  buildPaymentStatusData,
  buildRevenueTrend,
  estimateAnalyticsStats,
  normalizeTransaction,
} from "../../features/admin/utils/transactionStats";

export default function AdminAnalyticsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchAnalyticsData() {
    setLoading(true);
    setError("");

    try {
      const response = await getAllTransactionsAdmin();
      setTransactions((response.transactions || []).map(normalizeTransaction));
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load analytics");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const stats = useMemo(() => estimateAnalyticsStats(transactions), [transactions]);
  const revenueTrend = useMemo(() => buildRevenueTrend(transactions), [transactions]);
  const paymentStatusData = useMemo(
    () => buildPaymentStatusData(transactions),
    [transactions],
  );

  if (loading) {
    return <DataTableSkeleton rows={8} columns={4} />;
  }

  if (error) {
    return (
      <ErrorState
        title="Analytics unavailable"
        message={error}
        onRetry={fetchAnalyticsData}
      />
    );
  }

  return (
    <AnalyticsOverview
      stats={stats}
      revenueTrend={revenueTrend}
      paymentStatusData={paymentStatusData}
    />
  );
}
