export function normalizeTransaction(transaction) {
  return {
    ...transaction,
    userEmail:
      transaction.userEmail ||
      transaction.email ||
      transaction.user?.email ||
      transaction.userId?.email ||
      null,
  };
}

export function computeTransactionStats(transactions = []) {
  return transactions.reduce(
    (accumulator, transaction) => {
      accumulator.totalTransactions += 1;

      if (transaction.paymentStatus === "Paid") {
        accumulator.successfulPayments += 1;
        accumulator.totalRevenue += Number(transaction.amount || 0);
      }

      if (transaction.paymentStatus === "Pending") {
        accumulator.pendingPayments += 1;
      }

      if (transaction.paymentStatus === "Failed") {
        accumulator.failedPayments += 1;
      }

      return accumulator;
    },
    {
      totalRevenue: 0,
      totalTransactions: 0,
      successfulPayments: 0,
      pendingPayments: 0,
      failedPayments: 0,
    },
  );
}

export function buildRevenueTrend(transactions = []) {
  const monthly = new Map();

  transactions
    .filter((transaction) => transaction.paymentStatus === "Paid")
    .forEach((transaction) => {
      const date = new Date(transaction.createdAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      monthly.set(monthKey, (monthly.get(monthKey) || 0) + Number(transaction.amount || 0));
    });

  return Array.from(monthly.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, revenue]) => ({ month, revenue }));
}

export function buildPaymentStatusData(transactions = []) {
  const counts = {
    Paid: 0,
    Pending: 0,
    Failed: 0,
  };

  transactions.forEach((transaction) => {
    const status = transaction.paymentStatus;
    if (counts[status] !== undefined) {
      counts[status] += 1;
    }
  });

  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

export function estimateAnalyticsStats(transactions = []) {
  const paymentStats = computeTransactionStats(transactions);

  const totalUsers = new Set(
    transactions.map((transaction) => String(transaction.userId || transaction.userEmail || "")),
  ).size;

  const totalProjects = Math.round(paymentStats.totalTransactions * 1.8);
  const totalAiRequests = Math.round(paymentStats.totalTransactions * 5.2);
  const creditUsage = transactions.reduce(
    (accumulator, transaction) => accumulator + Number(transaction.credits || 0),
    0,
  );

  return {
    ...paymentStats,
    totalUsers,
    totalProjects,
    totalAiRequests,
    creditUsage,
  };
}
