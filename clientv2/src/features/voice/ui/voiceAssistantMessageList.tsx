import { Message } from "@/entities/message/types/types";
import { VoiceAssistantBubble } from "./voiceAssistantBubble";

interface VoiceAssistantMessageListProps {
  messages: Message[];
  helloMessage: Message;
}

export const VoiceAssistantMessageList = ({
  messages,
  helloMessage,
}: VoiceAssistantMessageListProps) => {
  return (
    <div className="flex-1 overflow-y-auto space-y-4 pb-2">
      <div className="no-scrollbar space-y-2.5">
        <p className="text-zinc-500 font-medium text-center text-sm">
          Собеседование началось
        </p>
        <VoiceAssistantBubble message={helloMessage} />
      </div>

      {messages.map((message) => (
        <VoiceAssistantBubble key={message.id} message={message} />
      ))}
    </div>
  );
};
