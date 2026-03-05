import { LoaderCircle } from "lucide-react";

export function AppSpinner({ label = "Loading..." }) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center gap-2 text-muted">
      <LoaderCircle className="h-5 w-5 animate-spin" />
      <span>{label}</span>
    </div>
  );
}
