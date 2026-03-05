import { Frown } from "lucide-react";
import { Button } from "../ui/Button";

export function ErrorState({ title = "Something went wrong", message, onRetry }) {
  return (
    <div className="rounded-2xl border border-danger/20 bg-danger/5 p-6 text-center">
      <Frown className="mx-auto mb-3 h-6 w-6 text-danger" />
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      {message ? <p className="mt-1 text-sm text-muted">{message}</p> : null}
      {onRetry ? (
        <Button className="mt-4" variant="secondary" onClick={onRetry}>
          Retry
        </Button>
      ) : null}
    </div>
  );
}
