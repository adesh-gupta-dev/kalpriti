import { cn } from "../../utils/cn";

const variantClasses = {
  primary:
    "bg-primary text-white hover:bg-primary/90 focus-visible:ring-primary/40 disabled:bg-primary/60",
  secondary:
    "bg-panel text-ink ring-1 ring-ink/10 hover:bg-panel/80 focus-visible:ring-primary/40",
  ghost:
    "bg-transparent text-ink hover:bg-ink/5 focus-visible:ring-primary/40",
  danger:
    "bg-danger text-white hover:bg-danger/90 focus-visible:ring-danger/40 disabled:bg-danger/60",
  success:
    "bg-success text-white hover:bg-success/90 focus-visible:ring-success/40 disabled:bg-success/60",
};

const sizeClasses = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
};

export function Button({
  as: Component = "button",
  className,
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  type = "button",
  onClick,
  ...props
}) {
  const isButton = Component === "button";

  function handleClick(event) {
    if (!isButton && (disabled || loading)) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  }

  return (
    <Component
      type={isButton ? type : undefined}
      disabled={isButton ? disabled || loading : undefined}
      aria-disabled={!isButton && (disabled || loading) ? true : undefined}
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-4",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </Component>
  );
}
