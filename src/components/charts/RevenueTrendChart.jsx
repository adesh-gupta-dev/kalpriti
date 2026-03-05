import {
  CartesianGrid,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "../ui/Card";
import { formatCurrencyInr } from "../../utils/formatters";

export function RevenueTrendChart({ data = [] }) {
  return (
    <Card className="h-[320px]">
      <h3 className="font-display text-lg font-semibold">Revenue Trend</h3>
      <p className="mb-3 text-xs text-muted">Monthly paid transaction totals</p>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => formatCurrencyInr(Number(value) || 0)} />
            <Bar dataKey="revenue" fill="rgb(14 165 233)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
