import { Suspense, lazy, useMemo } from "react";
import { Skeleton } from "../../../components/ui/Skeleton";

const MonacoEditor = lazy(() => import("@monaco-editor/react"));

export function CodeEditorPane({ code, onChange, theme = "light" }) {
  const editorTheme = useMemo(() => (theme === "dark" ? "vs-dark" : "light"), [theme]);

  return (
    <div className="h-[420px] overflow-hidden rounded-2xl border border-ink/10 bg-panel lg:h-[calc(100vh-250px)]">
      <Suspense fallback={<Skeleton className="h-full w-full" />}>
        <MonacoEditor
          height="100%"
          defaultLanguage="html"
          value={code}
          onChange={(value) => onChange(value || "")}
          theme={editorTheme}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            scrollBeyondLastLine: false,
            wordWrap: "on",
            automaticLayout: true,
            lineNumbersMinChars: 3,
          }}
        />
      </Suspense>
    </div>
  );
}
