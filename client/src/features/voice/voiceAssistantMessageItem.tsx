import clsx from "clsx";
import React, { FC } from "react";
import { IMessage } from "@/entities/message/types/types";
import VoiceAssitantAvatar from "./voiceAssitantAvatar";
import { Check, Copy, ThumbsDown, ThumbsUp } from "lucide-react";
import { useCopied } from "@/shared/hooks/useCopy";
import { formatTime } from "@/shared/lib/formatDate";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { messageSelectors } from "@/entities/message/models/store/messageSlice";
import { useTypingEffect } from "../hooks/useTypingEffect";
import VoiceAssitantMessageQuestions from "./voiceAssitantMessageQuestions";
import { useMessageReaction } from "../hooks/useMessageReaction";
import VoiceMessagePlayer from "@/widgets/ui/voiceAudioPlayer";
import ReactMarkDown from "react-markdown";

interface IAssistantMessageItem {
  message: IMessage;
}

const AssistantMessageItem: FC<IAssistantMessageItem> = ({ message }) => {
  const { handleCopyClick, isCopied, isPending } = useCopied();
  const isTyping = useAppSelector(messageSelectors.isTyping);
  const isStreaminMessage = isTyping === message.id;
  const { handleReaction } = useMessageReaction(message);
  const streamedText = useTypingEffect(isTyping ? message.text : null);

  return (
    <>
      <div
        className={clsx(
          "flex w-full items-start gap-2 mb-3",
          message.from_user ? "justify-end" : "justify-start"
        )}
      >
        {!message.from_user && (
          <div className="flex-shrink-0 pt-1">
            <div className="relative">
              <VoiceAssitantAvatar />
            </div>
          </div>
        )}

        <div
          className={clsx(
            "max-w-[70%] min-w-[20%] px-4 py-3 rounded-2xl relative transition-all duration-200",
            "group break-words shadow-lg",
            message.from_user
              ? "bg-[#343A40] text-white"
              : "bg-[#7F868F] text-white"
          )}
        >
          <div className="whitespace-pre-wrap break-words relative">
            {message.link ? (
              <VoiceMessagePlayer audioUrl={message.link} text={message.text} />
            ) : isStreaminMessage ? (
              <ReactMarkDown>{streamedText}</ReactMarkDown>
            ) : (
              <ReactMarkDown>{message.text}</ReactMarkDown>
            )}
          </div>

          <div className="flex items-center justify-end mt-2">
            <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
              <button
                disabled={isPending}
                value={message.text}
                aria-label="Копировать сообщение"
                className={clsx(
                  "p-1 rounded-full transition-all",
                  "opacity-0 group-hover:opacity-100",
                  "hover:bg-white/10 active:scale-90",
                  isPending && "cursor-not-allowed opacity-30"
                )}
                onClick={handleCopyClick}
              >
                {isCopied ? (
                  <Check className="h-3 w-3 text-green-400 cursor-pointer" />
                ) : (
                  <Copy className="h-3 w-3 cursor-pointer" />
                )}
              </button>

              {!message.from_user && (
                <div>
                  <button
                    value={"like"}
                    aria-label="Лайк"
                    className="p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-white/10 active:scale-90"
                    onClick={handleReaction}
                  >
                    <ThumbsUp
                      className={clsx(
                        "h-3 w-3",
                        message.liked &&
                          "fill-blue-400 cursor-pointer text-zinc-300"
                      )}
                    />
                  </button>
                  <button
                    value={`dislike`}
                    aria-label="Дизлайк"
                    className="p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-white/10 active:scale-90"
                    onClick={handleReaction}
                  >
                    <ThumbsDown
                      className={clsx(
                        "h-3 w-3",
                        message.liked === false &&
                          "fill-blue-400 cursor-pointer text-zinc-300"
                      )}
                    />
                  </button>
                </div>
              )}
            </div>
            {message.created_at && (
              <span
                className={clsx(
                  "text-xs flex-shrink-0 transition-opacity ",
                  message.from_user
                    ? "text-white/80 pl-1"
                    : "text-gray-800 pl-2"
                )}
              >
                {formatTime(message.created_at)}
              </span>
            )}
          </div>
        </div>
      </div>
      {!message.from_user &&
        !!message.questions?.length &&
        streamedText.length === message.text.length && (
          <VoiceAssitantMessageQuestions message={message} />
        )}
    </>
  );
};

export default AssistantMessageItem;
