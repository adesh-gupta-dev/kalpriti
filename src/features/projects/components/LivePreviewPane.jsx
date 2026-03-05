import { useMemo } from "react";
import { buildPreviewDocument } from "../../../utils/preview";

export function LivePreviewPane({ code }) {
  const srcDoc = useMemo(() => buildPreviewDocument(code), [code]);

  return (
    <div className="h-[420px] overflow-hidden rounded-2xl border border-ink/10 bg-white lg:h-[calc(100vh-250px)]">
      <iframe
        title="Live preview"
        srcDoc={srcDoc}
        sandbox="allow-scripts allow-modals allow-forms"
        className="h-full w-full"
      />
    </div>
  );
}
