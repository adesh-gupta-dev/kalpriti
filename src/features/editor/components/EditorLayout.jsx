import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Modal } from "../../../components/ui/Modal";
import { useDebounce } from "../../../hooks/useDebounce";
import { detectCodeLanguage } from "../utils/detectLanguage";
import { formatCodeWithPrettier } from "../utils/formatCode";
import { AdvancedCodeEditor } from "./AdvancedCodeEditor";
import { ConsolePanel } from "./ConsolePanel";
import { EditorToolbar } from "./EditorToolbar";
import { PreviewPanel } from "./PreviewPanel";
import { ResizableDivider } from "./ResizableDivider";

function formatTimeStamp(date) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

export function EditorLayout({
  projectId,
  code,
  onCodeChange,
  theme,
  workspaceMode,
  chatPane,
  onSaveVersion,
  saveVersionLoading,
}) {
  const containerRef = useRef(null);

  const [leftPaneWidth, setLeftPaneWidth] = useState(56);
  const [dragging, setDragging] = useState(false);
  const [languagePreference, setLanguagePreference] = useState("auto");
  const [readOnly, setReadOnly] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(false);
  const [autoSavedAt, setAutoSavedAt] = useState("");
  const [formatting, setFormatting] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [fullscreenEditorOpen, setFullscreenEditorOpen] = useState(false);

  const detectedLanguage = useMemo(() => detectCodeLanguage(code), [code]);
  const activeLanguage =
    languagePreference === "auto" ? detectedLanguage : languagePreference;
  const debouncedCode = useDebounce(code, 1000);
  const isCodePreviewMode = workspaceMode === "code-preview";
  const isChatPreviewMode = workspaceMode === "chat-preview";
  const isPreviewMode = isCodePreviewMode || isChatPreviewMode;
  const containerStyle = isPreviewMode
    ? {
        "--editor-pane-width": `${leftPaneWidth}%`,
        "--preview-pane-width": `${100 - leftPaneWidth}%`,
      }
    : {};

  useEffect(() => {
    if (!dragging) return;

    function handlePointerMove(event) {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = event.clientX - rect.left;
      const percentage = (relativeX / rect.width) * 100;
      const clamped = Math.max(28, Math.min(72, percentage));
      setLeftPaneWidth(clamped);
    }

    function handlePointerUp() {
      setDragging(false);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [dragging]);

  useEffect(() => {
    function handleSaveShortcut(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        onSaveVersion?.();
      }
    }

    window.addEventListener("keydown", handleSaveShortcut);
    return () => window.removeEventListener("keydown", handleSaveShortcut);
  }, [onSaveVersion]);

  useEffect(() => {
    if (!autoSaveEnabled) return;

    const storageKey = `kalpriti-editor-draft:${projectId}`;
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        code: debouncedCode,
        languagePreference,
        updatedAt: new Date().toISOString(),
      }),
    );
    setAutoSavedAt(formatTimeStamp(new Date()));
  }, [autoSaveEnabled, debouncedCode, languagePreference, projectId]);

  async function handleFormatCode() {
    setFormatting(true);
    try {
      const formatted = await formatCodeWithPrettier(code, activeLanguage);
      onCodeChange(formatted);
      toast.success("Code formatted");
    } catch (_error) {
      toast.error("Unable to format code for this language");
    } finally {
      setFormatting(false);
    }
  }

  function handleConsoleEvent(message) {
    setConsoleLogs((current) => {
      const next = [
        ...current,
        {
          id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
          type: message.type,
          message: message.payload,
        },
      ];

      return next.slice(-120);
    });
  }

  return (
    <section className="space-y-3">
      <EditorToolbar
        languagePreference={languagePreference}
        detectedLanguage={detectedLanguage}
        onLanguagePreferenceChange={setLanguagePreference}
        readOnly={readOnly}
        onReadOnlyChange={setReadOnly}
        autoSaveEnabled={autoSaveEnabled}
        onAutoSaveEnabledChange={setAutoSaveEnabled}
        onFormat={handleFormatCode}
        onSave={onSaveVersion}
        onToggleFullscreenEditor={() => setFullscreenEditorOpen(true)}
        showConsole={showConsole}
        onShowConsoleChange={setShowConsole}
        canToggleConsole={isPreviewMode}
        codeActionsEnabled={isCodePreviewMode}
        formatting={formatting}
        saving={saveVersionLoading}
        autoSavedAt={autoSavedAt}
      />

      <div
        ref={containerRef}
        style={containerStyle}
        className="flex min-h-[560px] flex-col gap-3 overflow-hidden rounded-2xl lg:h-[calc(100vh-250px)] lg:min-h-0 lg:flex-row lg:gap-0"
      >
        <div
          className={`h-[44vh] min-h-[260px] w-full max-h-[520px] lg:h-full lg:max-h-none ${
            isPreviewMode ? "lg:w-[var(--editor-pane-width)]" : "lg:w-[55%]"
          }`}
        >
          {isCodePreviewMode ? (
            <AdvancedCodeEditor
              code={code}
              onChange={onCodeChange}
              theme={theme}
              language={activeLanguage}
              readOnly={readOnly}
            />
          ) : (
            <div className="h-full rounded-2xl border border-ink/10 bg-panel">
              {chatPane}
            </div>
          )}
        </div>

        <ResizableDivider onPointerDown={() => setDragging(true)} />

        <div
          className={`h-[44vh] min-h-[260px] w-full max-h-[520px] lg:h-full lg:max-h-none ${
            isPreviewMode ? "lg:w-[var(--preview-pane-width)]" : "lg:flex-1"
          }`}
        >
          {isPreviewMode ? (
            <div className="grid h-full grid-rows-[1fr_auto] gap-3 lg:gap-2">
              <PreviewPanel code={code} onConsoleEvent={handleConsoleEvent} />
              {showConsole ? (
                <ConsolePanel
                  logs={consoleLogs}
                  onClear={() => setConsoleLogs([])}
                />
              ) : null}
            </div>
          ) : (
            <div className="h-full rounded-2xl border border-ink/10 bg-panel">
              {chatPane}
            </div>
          )}
        </div>
      </div>

      <Modal
        open={fullscreenEditorOpen}
        onClose={() => setFullscreenEditorOpen(false)}
        title="Fullscreen Editor"
        description="Focused coding mode with keyboard save shortcut (Ctrl+S)."
        className="max-w-screen-2xl sm:max-w-screen"
      >
        <div className="h-[82vh] overflow-hidden rounded-xl border border-ink/10">
          <AdvancedCodeEditor
            code={code}
            onChange={onCodeChange}
            theme={theme}
            language={activeLanguage}
            readOnly={readOnly}
            height="82vh"
          />
        </div>
      </Modal>
    </section>
  );
}
