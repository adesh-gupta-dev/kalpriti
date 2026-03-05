import { Badge } from "../../../components/ui/Badge";

function resolveTone(status) {
  if (status === "Paid") return "success";
  if (status === "Failed") return "danger";
  return "warning";
}

export function StatusBadge({ status }) {
  return <Badge tone={resolveTone(status)}>{status}</Badge>;
}
