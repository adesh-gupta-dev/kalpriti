import {
  Code2,
  Eye,
  Save,
  Wand2,
  MonitorUp,
  TerminalSquare,
} from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { ToggleSwitch } from "../../../components/ui/ToggleSwitch";

export function EditorToolbar({
  languagePreference,
  detectedLanguage,
  onLanguagePreferenceChange,
  readOnly,
  onReadOnlyChange,
  autoSaveEnabled,
  onAutoSaveEnabledChange,
  onFormat,
  onSave,
  onToggleFullscreenEditor,
  showConsole,
  onShowConsoleChange,
  canToggleConsole,
  codeActionsEnabled = true,
  formatting,
  saving,
  autoSavedAt,
}) {
  return (
    <div className="space-y-3 rounded-2xl border border-ink/10 bg-panel/80 p-3">
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-[minmax(180px,220px)_repeat(3,minmax(0,1fr))]">
        <label className="w-full">
          <span className="sr-only">Language</span>
          <select
            value={languagePreference}
            onChange={(event) => onLanguagePreferenceChange(event.target.value)}
            disabled={!codeActionsEnabled}
            className="h-10 w-full rounded-xl border border-ink/15 bg-white px-3 text-sm text-ink outline-none transition-colors focus:border-primary disabled:cursor-not-allowed disabled:opacity-60 dark:bg-panel"
          >
            <option value="auto">Auto ({detectedLanguage})</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">JavaScript</option>
          </select>
        </label>

        <Button
          size="md"
          variant="secondary"
          className="w-full"
          onClick={onFormat}
          loading={formatting}
          disabled={!codeActionsEnabled}
        >
          <Wand2 className="h-4 w-4" />
          Format Code
        </Button>

        <Button size="md" className="w-full" onClick={onSave} loading={saving}>
          <Save className="h-4 w-4" />
          Save Version
        </Button>

        <Button
          size="md"
          variant="secondary"
          className="w-full"
          onClick={onToggleFullscreenEditor}
          disabled={!codeActionsEnabled}
        >
          <MonitorUp className="h-4 w-4" />
          Fullscreen Editor
        </Button>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-[auto_auto_auto_auto] lg:items-center">
        <ToggleSwitch
          checked={readOnly}
          onChange={onReadOnlyChange}
          label="Read-only"
          disabled={!codeActionsEnabled}
          className="w-full justify-between rounded-xl border border-ink/10 bg-surface/70 px-3 py-2 sm:w-auto sm:justify-start sm:border-0 sm:bg-transparent sm:px-0 sm:py-0"
        />

        <ToggleSwitch
          checked={autoSaveEnabled}
          onChange={onAutoSaveEnabledChange}
          label="Auto-save draft"
          className="w-full justify-between rounded-xl border border-ink/10 bg-surface/70 px-3 py-2 sm:w-auto sm:justify-start sm:border-0 sm:bg-transparent sm:px-0 sm:py-0"
        />

        {canToggleConsole ? (
          <Button
            size="md"
            className="w-full sm:w-auto"
            variant={showConsole ? "primary" : "secondary"}
            onClick={() => onShowConsoleChange(!showConsole)}
          >
            <TerminalSquare className="h-4 w-4" />
            Console
          </Button>
        ) : (
          <Button
            size="md"
            className="w-full sm:w-auto"
            variant="ghost"
            disabled
          >
            <Code2 className="h-4 w-4" />
            Chat Mode
          </Button>
        )}
      </div>

      {autoSavedAt ? (
        <p className="text-xs text-muted lg:text-right">
          Draft auto-saved at {autoSavedAt}
        </p>
      ) : null}
    </div>
  );
}
