import { Message } from "@/entities/message/types/types";
import { cn } from "@/shared/lib/utils/twMerge";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, PlusCircle } from "lucide-react";
import { useState } from "react";

interface VoiceAssistantBubbleDetailProps {
  expanded: boolean;
  clarificationMessages: Message[];
  questions: string[];
  questionId: string;
  onSendClarification: (questionId: string, text: string) => void;
}

export const VoiceAssistantBubbleDetail = ({
  expanded,
  clarificationMessages,
  questions,
  questionId,
  onSendClarification,
}: VoiceAssistantBubbleDetailProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [clarificationText, setClarificationText] = useState("");

  const handleClarificationSubmit = () => {
    if (clarificationText.trim()) {
      onSendClarification(questionId, clarificationText);
      setClarificationText("");
      setIsDialogOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {expanded && (
        <motion.div
          key="detail"
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: "auto", marginTop: 8 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="mt-3 overflow-hidden rounded-xl bg-zinc-800 border border-zinc-700 p-4 text-sm text-zinc-200 shadow-md"
        >
          <div className="space-y-4">
            {clarificationMessages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg",
                  msg.from_user
                    ? "bg-blue-600 text-white justify-end p-2 px-3 rounded-l-full rounded-br-full ml-auto"
                    : "bg-zinc-900 text-zinc-200 justify-start mr-auto",
                  "max-w-[80%]"
                )}
              >
                {!msg.from_user && (
                  <HelpCircle className="h-5 w-5 text-[#2F5BFF] flex-shrink-0 mt-0.5" />
                )}
                <p className="leading-relaxed flex-1 break-words">{msg.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2">
            {!isDialogOpen ? (
              <div className="flex flex-col space-y-4">
                {questions.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {questions.map((question, index) => (
                      <button
                        key={index}
                        className="w-full flex space-x-2 items-center text-left p-2 bg-zinc-700 cursor-pointer px-3 rounded-bl-full rounded-r-full text-zinc-200 hover:bg-zinc-600 transition-all duration-200"
                        onClick={() => {
                          onSendClarification(questionId, question);
                        }}
                      >
                        <span>
                          <PlusCircle className="h-4 w-4" />
                        </span>
                        <p>{question}</p>
                      </button>
                    ))}
                  </div>
                )}
                <button
                  className="rounded-full cursor-pointer bg-[#2F5BFF] px-4 py-2 text-sm font-medium text-white hover:bg-[#2F5BFF]/80 transition-all duration-200 hover:scale-105"
                  onClick={() => setIsDialogOpen(true)}
                >
                  Задать уточняющий вопрос
                </button>
              </div>
            ) : (
              <div className="flex flex-col w-full gap-2">
                <textarea
                  className="w-full resize-none p-2 bg-zinc-700 rounded-lg text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#2F5BFF]"
                  value={clarificationText}
                  onChange={(e) => setClarificationText(e.target.value)}
                  placeholder="Введите ваш вопрос..."
                  rows={3}
                />
                <div className="flex justify-end gap-2">
                  <button
                    className="rounded-full px-4 py-2 text-xs font-medium text-zinc-200 bg-zinc-600 hover:bg-zinc-500 transition-all duration-200"
                    onClick={() => {
                      setClarificationText("");
                      setIsDialogOpen(false);
                    }}
                  >
                    Отмена
                  </button>
                  <button
                    className="rounded-full bg-[#2F5BFF] px-4 py-2 text-xs font-medium text-white hover:bg-[#2F5BFF]/80 transition-all duration-200 hover:scale-105"
                    onClick={handleClarificationSubmit}
                  >
                    Отправить
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
