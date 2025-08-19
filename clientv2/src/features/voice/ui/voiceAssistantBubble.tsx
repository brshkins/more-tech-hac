import { Message } from "@/entities/message/types/types";
import { cn } from "@/shared/lib/utils/twMerge";
import { useState } from "react";
import { VoiceAssistantBubbleDetail } from "./voiceAssistantBubbleDetail";

interface VoiceAssistantBubbleProps {
  message: Message;
  onSendClarification: (questionId: string, text: string) => void;
}

export const VoiceAssistantBubble = ({
  message: {
    created_at,
    from_user,
    text,
    clarificationMessages,
    questions,
    id,
  },
  onSendClarification,
}: VoiceAssistantBubbleProps) => {
  const isUser = !!from_user;
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={cn("w-full flex", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[95%] w-full rounded-t-2xl",
          isUser ? "rounded-bl-2xl bg-blue-700" : "rounded-br-2xl bg-zinc-900",
          "px-4 py-3 shadow-sm ring-1 ring-white/5"
        )}
      >
        <p
          className={cn(
            "text-sm leading-[18px]",
            isUser ? "text-white" : "text-zinc-100"
          )}
        >
          {text}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <span className={cn("text-xs text-zinc-500", isUser && "text-white")}>
            {created_at}
          </span>

          {!isUser && clarificationMessages && (
            <button
              className="text-white text-xs cursor-pointer"
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded ? "Скрыть" : "Уточнить"}
            </button>
          )}
        </div>

        {!isUser && clarificationMessages && (
          <VoiceAssistantBubbleDetail
            expanded={expanded}
            clarificationMessages={clarificationMessages}
            questions={questions || []}
            questionId={id}
            onSendClarification={onSendClarification}
          />
        )}
      </div>
    </div>
  );
};
