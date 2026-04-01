import dynamic from "next/dynamic";
import { memo, useEffect, useMemo, useState } from "react";
import { cn } from "../../../utils/cn";

const ReactMarkdown = dynamic(() => import("react-markdown"), {
  ssr: false,
  loading: () => <span className="text-muted">Loading...</span>,
});

export const MessageBubble = memo(function MessageBubble({ message }) {
  const isUser = message.role === "user";
  const [remarkGfm, setRemarkGfm] = useState(null);

  useEffect(() => {
    let mounted = true;
    import("remark-gfm").then((module) => {
      if (mounted) setRemarkGfm(() => module.default);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const remarkPlugins = useMemo(
    () => (remarkGfm ? [remarkGfm] : []),
    [remarkGfm],
  );

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "markdown max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
          isUser
            ? "rounded-br-md bg-primary text-white"
            : "rounded-bl-md border border-ink/10 bg-panel text-ink",
        )}
      >
        <ReactMarkdown remarkPlugins={remarkPlugins}>{message.content}</ReactMarkdown>
      </div>
    </div>
  );
});
