import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "../../../utils/cn";

export const MessageBubble = memo(function MessageBubble({ message }) {
  const isUser = message.role === "user";

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
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
      </div>
    </div>
  );
});
