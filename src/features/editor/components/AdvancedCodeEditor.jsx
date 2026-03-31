import { memo, useMemo } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "../../../components/ui/Skeleton";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full" />,
});

export const AdvancedCodeEditor = memo(function AdvancedCodeEditor({
  code,
  onChange,
  theme,
  language,
  readOnly,
  onMount,
  height = "100%",
}) {
  const editorTheme = useMemo(() => (theme === "dark" ? "vs-dark" : "light"), [theme]);

  return (
    <div className="h-full overflow-hidden rounded-2xl border border-ink/10 bg-panel">
      <MonacoEditor
        height={height}
        language={language}
        value={code}
        onChange={(value) => onChange(value || "")}
        theme={editorTheme}
        onMount={onMount}
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          scrollBeyondLastLine: false,
          wordWrap: "on",
          automaticLayout: true,
          lineNumbers: "on",
          lineNumbersMinChars: 3,
          readOnly,
          folding: true,
          renderWhitespace: "selection",
          bracketPairColorization: { enabled: true },
          guides: {
            bracketPairs: true,
            indentation: true,
          },
        }}
      />
    </div>
  );
});
