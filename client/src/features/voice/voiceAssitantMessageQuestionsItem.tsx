import clsx from "clsx";
import React, { FC } from "react";

interface IVoiceAssitantMessageQuestionsItem {
  question: string;
  sendMessage: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const VoiceAssitantMessageQuestionsItem: FC<
  IVoiceAssitantMessageQuestionsItem
> = ({ question, sendMessage }) => {
  return (
    <button
      key={question}
      className={clsx(
        "w-full px-3 py-2.5 text-left cursor-pointer transition-all duration-200 rounded-lg text-white text-sm bg-zinc-400 hover:bg-zinc-500"
      )}
      value={question}
      onClick={sendMessage}
    >
      {question}
    </button>
  );
};

export default VoiceAssitantMessageQuestionsItem;
