import { IMessage } from "@/entities/message/types/types";
import React, { FC } from "react";
import { useSendMessage } from "../hooks/useSendMessage";
import VoiceAssitantMessageQuestionsItem from "./voiceAssitantMessageQuestionsItem";
import VoiceAssitantAvatar from "./voiceAssitantAvatar";

interface IVoiceAssitantMessageQuestions {
  message: IMessage;
}

const VoiceAssitantMessageQuestions: FC<IVoiceAssitantMessageQuestions> = ({
  message,
}) => {
  const { handleSendNewMessage } = useSendMessage();

  const handleSendMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
    const values = event.currentTarget.value;
    if (!values) return;
    handleSendNewMessage({ content: values });
  };

  return (
    <section className="flex space-x-2">
      <VoiceAssitantAvatar />
      <div className="bg-[#7F868F] md:max-w-[464px] rounded-xl p-3 mb-4  mt-1">
        <div className="grid grid-cols-2 gap-2 w-full">
          {message.questions?.map((question, ids) => (
            <VoiceAssitantMessageQuestionsItem
              key={ids}
              question={question}
              sendMessage={handleSendMessage}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VoiceAssitantMessageQuestions;
