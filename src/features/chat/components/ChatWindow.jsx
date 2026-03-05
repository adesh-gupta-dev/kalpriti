import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";

export function ChatWindow({ messages, loading = false, onSend }) {
  return (
    <div className="flex h-full min-h-[320px] flex-col overflow-hidden rounded-2xl border border-ink/10 bg-panel">
      <div className="border-b border-ink/10 px-3 py-2">
        <h3 className="font-display text-sm font-semibold">AI Conversation</h3>
      </div>
      <MessageList messages={messages} />
      {loading ? <TypingIndicator /> : null}
      <ChatInput onSend={onSend} loading={loading} />
    </div>
  );
}
