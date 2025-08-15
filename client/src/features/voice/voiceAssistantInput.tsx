"use client";

import { SendHorizontal, StopCircle } from "lucide-react";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useState,
} from "react";
import { useSendMessage } from "../hooks/useSendMessage";
import { Textarea } from "@/shared/ui/textarea";
import VoiceAudioRecorder from "./voiceAudioRecorder";
import { useActions } from "@/shared/hooks/useActions";
import { EModalVariables } from "@/shared/lib/modalVariables";

export const VoiceAssistantInput = () => {
  const { setOpen, setIsResults } = useActions();
  const { handleSendNewMessage } = useSendMessage();

  const [message, setMessages] = useState("");

  const handleOpenModalLeave = () => {
    setOpen({ type: EModalVariables.CONFIRMATION, isOpen: true });
  };

  const handleChangeMessage = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setMessages(event.target.value);
    },
    []
  );

  const handleSendMessage = useCallback(() => {
    handleSendNewMessage({ content: message });
    setMessages("");
    setIsResults(false);
  }, [message, handleSendNewMessage]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="pb-6 pt-0 px-6  mx-auto w-full">
      <div className="relative flex items-end flex-col rounded-3xl p-3 space-y-2 bg-[#343A40] shadow-sm focus-within:ring-1 focus-within:ring-zinc-500">
        <Textarea
          value={message}
          onKeyDown={handleKeyDown}
          onChange={handleChangeMessage}
          placeholder="Введите сообщение..."
          className="resize-none text-white border-none h-[85px] placeholder:text-zinc-300"
        />
        <div className="flex space-x-2">
          <VoiceAudioRecorder />
          <button onClick={handleOpenModalLeave}>
            <StopCircle className="text-zinc-400" />
          </button>
          <button
            disabled={!message.trim()}
            onClick={handleSendMessage}
            className={`flex items-center space-x-2 p-1 px-4 rounded-full ${
              message.trim()
                ? "bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                : "bg-zinc-200 dark:bg-zinc-700 text-zinc-400 dark:text-zinc-500 cursor-not-allowed"
            } transition-colors`}
            aria-label="Отправить сообщение"
          >
            <span className="text-[14px] pb-1">Отправить</span>
            <span>
              <SendHorizontal className="h-5 w-5" />
            </span>
          </button>
        </div>
      </div>
      <p className="text-xs text-center mt-2 text-zinc-500 dark:text-zinc-400"></p>
    </div>
  );
};
