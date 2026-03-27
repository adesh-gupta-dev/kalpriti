import { DiffEditor } from "@monaco-editor/react";
import { useMemo } from "react";

export function DiffViewer({
  original,
  modified,
  language,
  theme,
  sideBySide,
}) {
  const editorTheme = useMemo(
    () => (theme === "dark" ? "vs-dark" : "light"),
    [theme],
  );

  return (
    <div className="h-[58vh] overflow-hidden rounded-xl border border-ink/10 ">
      <DiffEditor
        height="58vh"
        width="100dvw"
        original={original || ""}
        modified={modified || ""}
        language={language}
        theme={editorTheme}
        options={{
          readOnly: true,
          renderSideBySide: sideBySide,
          minimap: { enabled: false },
          wordWrap: "on",
          folding: true,
          automaticLayout: true,
          scrollBeyondLastLine: false,
          lineNumbers: "on",
        }}
      />
    </div>
  );
}
