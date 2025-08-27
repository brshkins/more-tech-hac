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
import { ERouteNames } from "@/shared";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const VoiceAssistantPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [finished, setFinished] = useState<boolean>(false);
  const navigate = useNavigate();
  const lastQuestionIndexRef = useRef<number>(-1);

  const headerProgress = useMemo(() => {
    if (finished) return 100;
    const total = voiceQuestions.length;
    const answered = Math.max(0, Math.min(total, currentQuestionIndex));
    return Math.round((answered / total) * 100);
  }, [currentQuestionIndex, finished]);

  const speakQuestion = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ru-RU";
      utterance.volume = 1;
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Speech Synthesis not supported in this browser.");
    }
  };

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
        clarificationMessages: questionTemplate.clarificationMessages,
        questions: questionTemplate.questions,
        from_user: false,
        created_at: getCurrentTime(),
        type: "question",
      };

      setMessages((prev) => {
        const newMessages = [...prev, assistantQuestionMessage];
        if (
          assistantQuestionMessage.type === "question" &&
          nextIndex !== lastQuestionIndexRef.current
        ) {
          speakQuestion(assistantQuestionMessage.text);
          lastQuestionIndexRef.current = nextIndex;
        }
        return newMessages;
      });
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

  const handleClarification = (questionId: string, text: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg): Message => {
        if (msg.id === questionId) {
          const newClarifMessages = [
            ...(msg.clarificationMessages || []),
            {
              id: `clarif-user-${Date.now()}`,
              text: text,
              from_user: true,
              created_at: getCurrentTime(),
              type: "clarification" as const,
            },
          ];

          const assistantResponse: Message = {
            id: `clarif-assist-${Date.now() + 1}`,
            text: `Спасибо за уточнение! По вашему вопросу: ${text}. Мы обработаем это и дадим ответ в ближайшее время.`,
            from_user: false,
            created_at: getCurrentTime(),
            type: "assistant" as const,
          };
          newClarifMessages.push(assistantResponse);

          return {
            ...msg,
            clarificationMessages: newClarifMessages,
          } as Message;
        }
        return msg;
      })
    );
  };

  const handleFinishRedirect = () => navigate(ERouteNames.RESULT_ROUTE);

  useEffect(() => {
    if (
      messages.length === 1 &&
      voiceQuestions.length > 0 &&
      lastQuestionIndexRef.current === -1
    ) {
      speakQuestion(messages[0].text);
      lastQuestionIndexRef.current = 0;
    }

    if (finished) {
      speakQuestion(finalMessageText);
    }
  }, [finished]);

  return (
    <div className="w-full h-full max-h-[97vh] mx-auto bg-black flex flex-col">
      <VoiceAssistantHeader title="Процесс отбора" progress={headerProgress} />
      <VoiceAssistantMessageList
        messages={messages}
        helloMessage={helloMessage}
        onSendClarification={handleClarification}
      />
      <div className="pointer-events-none">
        <VoiceAssistantBar
          finished={finished}
          onRedirect={handleFinishRedirect}
          onStopRecording={handleUserResponse}
        />
      </div>
    </div>
  );
};

export default VoiceAssistantPage;
