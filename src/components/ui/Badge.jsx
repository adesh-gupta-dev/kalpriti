import { cn } from "../../utils/cn";

const toneClasses = {
  default: "bg-ink/10 text-ink",
  success: "bg-success/15 text-success",
  warning: "bg-warning/20 text-warning",
  danger: "bg-danger/15 text-danger",
  accent: "bg-accent/20 text-accent",
};

export function Badge({ tone = "default", children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
