import { Eye, History, Save } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { PublishToggle } from "./PublishToggle";

export function ProjectTopBar({
  project,
  onOpenVersions,
  onSaveVersion,
  onTogglePublish,
  publishLoading,
  saveVersionLoading,
  workspaceMode,
  onWorkspaceModeChange,
  onOpenFullscreenPreview,
}) {
  return (
    <div className="space-y-3 rounded-2xl border border-ink/10 bg-panel/80 p-3">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:items-center">
        <div>
          <h2 className="font-display text-lg font-semibold">
            {project?.name || "Project Editor"}
          </h2>
          <p className="text-sm text-muted">
            Collaborate with AI and preview updates instantly.
          </p>
        </div>

        <div className="grid w-full gap-2 sm:flex sm:w-auto sm:flex-wrap sm:items-center">
          <Button variant="secondary" className="w-full sm:w-auto" onClick={onOpenVersions}>
            <History className="h-4 w-4" />
            Versions
          </Button>
          <Button className="w-full sm:w-auto" onClick={onSaveVersion} loading={saveVersionLoading}>
            <Save className="h-4 w-4" />
            Save Version
          </Button>
          <PublishToggle
            checked={Boolean(project?.isPublished)}
            onToggle={onTogglePublish}
            disabled={publishLoading}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ink/10 bg-surface/60 p-2">
        <div className="inline-flex w-full overflow-x-auto rounded-xl border border-ink/15 bg-panel p-1 sm:w-auto">
          <button
            type="button"
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              workspaceMode === "code-preview"
                ? "bg-primary text-white"
                : "text-muted hover:bg-ink/5 hover:text-ink"
            }`}
            onClick={() => onWorkspaceModeChange("code-preview")}
          >
            Code + Preview
          </button>
          <button
            type="button"
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              workspaceMode === "chat-preview"
                ? "bg-primary text-white"
                : "text-muted hover:bg-ink/5 hover:text-ink"
            }`}
            onClick={() => onWorkspaceModeChange("chat-preview")}
          >
            Chat + Preview
          </button>
        </div>

        <Button variant="secondary" size="sm" className="w-full sm:w-auto" onClick={onOpenFullscreenPreview}>
          <Eye className="h-4 w-4" />
          Fullscreen Preview
        </Button>
      </div>
    </div>
  );
}
