import { memo, useEffect, useMemo } from "react";
import { buildPreviewDocumentWithBridge } from "../utils/previewBridge";
import { useDebounce } from "../../../hooks/useDebounce";

export const PreviewPanel = memo(function PreviewPanel({ code, onConsoleEvent }) {
  const debouncedCode = useDebounce(code, 500);
  const srcDoc = useMemo(() => buildPreviewDocumentWithBridge(debouncedCode), [debouncedCode]);

  useEffect(() => {
    function handleMessage(event) {
      const payload = event.data;
      if (!payload || payload.source !== "kalpriti-preview") return;
      onConsoleEvent?.(payload);
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onConsoleEvent]);

  return (
    <div className="h-full overflow-hidden rounded-2xl border border-ink/10 bg-white [overscroll-behavior:contain]">
      <iframe
        title="Live preview"
        srcDoc={srcDoc}
        sandbox="allow-scripts allow-modals allow-forms"
        className="h-full w-full"
      />
    </div>
  );
});
