import {
  finalMessageText,
  helloMessage,
  initialMessages,
  voiceQuestions,
} from "@/entities/message/lib/mockMessage";
import { Message } from "@/entities/message/types/types";
import { getCurrentTime } from "@/features/voice/lib/formatTime";
import { VoiceAssistantBar } from "@/features/voice/ui/voiceAssistantBar";
import { VoiceAssistantHeader } from "@/features/voice/ui/voiceAssistantHeader";
import { VoiceAssistantMessageList } from "@/features/voice/ui/voiceAssistantMessageList";
import { useMemo, useState } from "react";

export const VoiceAssistantPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [finished, setFinished] = useState<boolean>(false);

  const headerProgress = useMemo(() => {
    if (finished) return 100;
    const total = voiceQuestions.length;
    const answered = Math.max(0, Math.min(total, currentQuestionIndex));
    return Math.round((answered / total) * 100);
  }, [currentQuestionIndex, finished]);

  const handleUserResponse = (transcript: string) => {
    if (!transcript.trim() || finished) return;

    const userMessage: Message = {
      id: `mess-user-${Date.now()}`,
      text: transcript,
      from_user: true,
      created_at: getCurrentTime(),
      type: "user",
    };
    setMessages((prev) => [...prev, userMessage]);

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < voiceQuestions.length) {
      const questionTemplate = voiceQuestions[nextIndex];

      const assistantQuestionMessage: Message = {
        ...questionTemplate,
        id: `mess-assist-${Date.now()}`,
        text: questionTemplate.text,
        detail: questionTemplate.detail,
        from_user: false,
        created_at: getCurrentTime(),
        type: "question",
      };

      setMessages((prev) => [...prev, assistantQuestionMessage]);
      setCurrentQuestionIndex(nextIndex);
    } else {
      const final: Message = {
        id: `mess-final-${Date.now()}`,
        text: finalMessageText,
        from_user: false,
        created_at: getCurrentTime(),
        type: "assistant",
      };
      setMessages((prev) => [...prev, final]);
      setFinished(true);
    }
  };

  return (
    <div className="w-full h-[98vh] mx-auto bg-black flex flex-col">
      <VoiceAssistantHeader title="Процесс отбора" progress={headerProgress} />
      <VoiceAssistantMessageList
        messages={messages}
        helloMessage={helloMessage}
      />
      <div className="pointer-events-none py-3">
        <VoiceAssistantBar
          onStopRecording={handleUserResponse}
          finished={finished}
        />
      </div>
    </div>
  );
};

export default VoiceAssistantPage;
