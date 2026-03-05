import { forwardRef } from "react";
import { cn } from "../../utils/cn";

export const Input = forwardRef(function Input(
  { label, error, helperText, className, id, ...props },
  ref,
) {
  return (
    <div className="space-y-1.5">
      {label ? (
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
        </label>
      ) : null}
      <input
        ref={ref}
        id={id}
        className={cn(
          "h-10 w-full rounded-xl border border-ink/15 bg-white px-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-primary dark:bg-panel",
          error ? "border-danger focus:border-danger" : "",
          className,
        )}
        {...props}
      />
      {error ? <p className="text-xs text-danger">{error}</p> : null}
      {!error && helperText ? (
        <p className="text-xs text-muted">{helperText}</p>
      ) : null}
    </div>
  );
});
