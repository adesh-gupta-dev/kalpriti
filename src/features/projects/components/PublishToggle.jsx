import { ToggleSwitch } from "../../../components/ui/ToggleSwitch";

export function PublishToggle({ checked, onToggle, disabled = false }) {
  return (
    <div className="inline-flex w-full items-center justify-between gap-2 rounded-xl border border-ink/10 bg-panel px-3 py-2 sm:w-auto sm:justify-start">
      <ToggleSwitch checked={checked} onChange={onToggle} disabled={disabled} />
      <span className="text-sm text-muted">{checked ? "Published" : "Private"}</span>
    </div>
  );
}
