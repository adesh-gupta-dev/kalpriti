import { X } from "lucide-react";
import { VersionCard } from "./VersionCard";
import { EmptyState } from "../../../components/common/EmptyState";
import { Button } from "../../../components/ui/Button";

export function VersionDrawer({
  open,
  versions,
  currentVersionIndex,
  onClose,
  onRestore,
  onDelete,
  restoringVersionId,
  deletingVersionId,
  onCompare,
}) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-950/35 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-ink/10 bg-surface p-4 shadow-soft transition-transform sm:w-[420px] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-semibold">Version History</h3>
            <p className="text-sm text-muted">Restore or remove previous snapshots</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={onCompare}>
              Compare
            </Button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-muted hover:bg-ink/5 hover:text-ink"
              aria-label="Close version drawer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="space-y-3 overflow-y-auto pb-10">
          {versions.length ? (
            versions.map((version, index) => (
              <VersionCard
                key={version._id}
                version={version}
                isCurrent={String(index) === String(currentVersionIndex)}
                onRestore={() => onRestore(version)}
                onDelete={() => onDelete(version)}
                restoreLoading={restoringVersionId === version._id}
                deleteLoading={deletingVersionId === version._id}
              />
            ))
          ) : (
            <EmptyState
              title="No versions available"
              description="Save a version to track major design changes."
            />
          )}
        </div>
      </aside>
    </>
  );
}
