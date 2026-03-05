import { CheckCircle2 } from "lucide-react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { formatCurrencyInr } from "../../../utils/formatters";

export function PricingCard({ plan, onSelect, loading = false }) {
  return (
    <Card className="flex h-full flex-col justify-between gap-4">
      <div>
        <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
        <p className="mt-1 text-sm text-muted">{plan.description}</p>
        <p className="mt-4 font-display text-3xl font-bold text-ink">
          {formatCurrencyInr(plan.price)}
        </p>
        <p className="text-sm text-muted">{plan.credits} credits included</p>
      </div>

      <ul className="space-y-2 text-sm text-muted">
        <li className="inline-flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-success" />
          AI generation workflow
        </li>
        <li className="inline-flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-success" />
          Version history support
        </li>
        <li className="inline-flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-success" />
          Publish-ready output
        </li>
      </ul>

      <Button className="w-full" onClick={() => onSelect(plan)} loading={loading}>
        Choose {plan.name}
      </Button>
    </Card>
  );
}
