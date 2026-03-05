import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";

export function MessageList({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
      {messages.map((message) => (
        <MessageBubble key={message._id || `${message.role}-${message.timestamp}`} message={message} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
