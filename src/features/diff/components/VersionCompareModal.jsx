import { useEffect, useMemo, useState } from "react";
import { Button } from "../../../components/ui/Button";
import { Modal } from "../../../components/ui/Modal";
import { detectCodeLanguage } from "../../editor/utils/detectLanguage";
import { DiffViewer } from "./DiffViewer";

function resolveInitialSelection(versions, currentVersionIndex) {
  if (!versions.length) {
    return { left: "", right: "" };
  }

  const rightIndex = Number(currentVersionIndex);
  const safeRightIndex =
    Number.isFinite(rightIndex) && rightIndex >= 0
      ? Math.min(rightIndex, versions.length - 1)
      : versions.length - 1;

  const leftIndex = Math.max(0, safeRightIndex - 1);

  return {
    left: versions[leftIndex]?._id || versions[0]._id,
    right: versions[safeRightIndex]?._id || versions[versions.length - 1]._id,
  };
}

export function VersionCompareModal({
  open,
  onClose,
  versions,
  currentVersionIndex,
  onRestoreVersion,
  restoreLoading,
  theme,
}) {
  const [leftVersionId, setLeftVersionId] = useState("");
  const [rightVersionId, setRightVersionId] = useState("");
  const [sideBySide, setSideBySide] = useState(true);

  useEffect(() => {
    if (!open) return;

    const initial = resolveInitialSelection(versions, currentVersionIndex);
    setLeftVersionId(initial.left);
    setRightVersionId(initial.right);
  }, [open, versions, currentVersionIndex]);

  const leftVersion = useMemo(
    () => versions.find((version) => version._id === leftVersionId),
    [versions, leftVersionId],
  );

  const rightVersion = useMemo(
    () => versions.find((version) => version._id === rightVersionId),
    [versions, rightVersionId],
  );

  const language = useMemo(
    () => detectCodeLanguage(rightVersion?.code || leftVersion?.code || ""),
    [leftVersion?.code, rightVersion?.code],
  );

  const canRestore = Boolean(rightVersion);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Compare Versions"
      description="Inspect code differences and restore the selected version."
      className="max-w-[96dvw]"
    >
      <div className="space-y-4">
        <div className="grid gap-3 md:grid-cols-3">
          <label className="space-y-1 text-xs text-muted">
            Base Version
            <select
              value={leftVersionId}
              onChange={(event) => setLeftVersionId(event.target.value)}
              className="h-10 w-full rounded-xl border border-ink/15 bg-white px-3 text-sm text-ink outline-none focus:border-primary dark:bg-panel"
            >
              {versions.map((version) => (
                <option key={version._id} value={version._id}>
                  {version.description || "Version"}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1 text-xs text-muted">
            Compare With
            <select
              value={rightVersionId}
              onChange={(event) => setRightVersionId(event.target.value)}
              className="h-10 w-full rounded-xl border border-ink/15 bg-white px-3 text-sm text-ink outline-none focus:border-primary dark:bg-panel"
            >
              {versions.map((version) => (
                <option key={version._id} value={version._id}>
                  {version.description || "Version"}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1 text-xs text-muted">
            Diff Mode
            <select
              value={sideBySide ? "side" : "inline"}
              onChange={(event) => setSideBySide(event.target.value === "side")}
              className="h-10 w-full rounded-xl border border-ink/15 bg-white px-3 text-sm text-ink outline-none focus:border-primary dark:bg-panel"
            >
              <option value="side">Side by side</option>
              <option value="inline">Inline</option>
            </select>
          </label>
        </div>

        <DiffViewer
          original={leftVersion?.code || ""}
          modified={rightVersion?.code || ""}
          language={language}
          theme={theme}
          sideBySide={sideBySide}
        />

        <div className="flex flex-wrap justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button
            onClick={() => onRestoreVersion(rightVersion)}
            loading={restoreLoading}
            disabled={!canRestore}
          >
            Restore Selected Version
          </Button>
        </div>
      </div>
    </Modal>
  );
}
