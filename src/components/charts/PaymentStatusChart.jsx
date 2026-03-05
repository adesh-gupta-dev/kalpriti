import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card } from "../ui/Card";

const COLORS = {
  Paid: "#16a34a",
  Pending: "#ca8a04",
  Failed: "#dc2626",
};

export function PaymentStatusChart({ data = [] }) {
  return (
    <Card className="h-[320px]">
      <h3 className="font-display text-lg font-semibold">Payment Status Mix</h3>
      <p className="mb-3 text-xs text-muted">Distribution across all transaction states</p>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={86}
              label
            >
              {data.map((item) => (
                <Cell key={item.name} fill={COLORS[item.name] || "#0ea5e9"} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
