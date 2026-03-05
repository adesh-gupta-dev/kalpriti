import { cn } from "../../utils/cn";

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-ink/10 bg-panel/80 p-5 shadow-soft backdrop-blur",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
