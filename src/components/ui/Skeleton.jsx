import { cn } from "../../utils/cn";

export function Skeleton({ className }) {
  return <div className={cn("animate-pulse rounded-lg bg-ink/10", className)} />;
}
