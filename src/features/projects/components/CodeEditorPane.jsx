import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "../../../components/ui/Skeleton";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full" />,
});

export function CodeEditorPane({ code, onChange, theme = "light" }) {
  const editorTheme = useMemo(() => (theme === "dark" ? "vs-dark" : "light"), [theme]);

  return (
    <div className="h-[420px] overflow-hidden rounded-2xl border border-ink/10 bg-panel lg:h-[calc(100vh-250px)]">
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
    </div>
  );
}
