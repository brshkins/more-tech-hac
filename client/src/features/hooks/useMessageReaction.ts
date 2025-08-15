import {
  messageReaction,
  saveMessageInHistory,
} from "@/entities/message/libs/messageService";
import { IMessage } from "@/entities/message/types/types";
import { useActions } from "@/shared/hooks/useActions";
import { useCallback } from "react";

export const useMessageReaction = (message: IMessage) => {
  const { toggleReaction } = useActions();

  const handleReaction = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const reactionType = event.currentTarget.value as "like" | "dislike";
      let likeVal: boolean | null = null;
      if (reactionType === "like") {
        likeVal = message.liked !== true;
      } else if (reactionType === "dislike") {
        likeVal = message.liked !== false ? false : null;
      }

      messageReaction({
        messageId: message.id,
        like: likeVal,
      });

      saveMessageInHistory({ message: { ...message, liked: likeVal } });

      toggleReaction({
        id: message.id,
        liked: likeVal,
      });
    },
    [message]
  );

  return {
    handleReaction,
  };
};
