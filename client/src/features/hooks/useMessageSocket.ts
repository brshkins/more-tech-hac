import {
  getChatAnalytics,
  getMessageHistory,
  saveMessageInHistory,
} from "@/entities/message/libs/messageService";
import { messageSelectors } from "@/entities/message/models/store/messageSlice";
import { IMessage } from "@/entities/message/types/types";
import { viewerSelectors } from "@/entities/viewer/models/store/viewerSlice";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { useWebSocketEvents } from "@/shared/hooks/useSocketEvents";
import { useEffect } from "react";

export const useMessageSocket = () => {
  const messages = useAppSelector(messageSelectors.messages);
  const {
    setChatMessages,
    setNewMessage,
    setIsTyping,
    setIsLoadingRepeat,
    setIsResults,
    setAnalytics,
  } = useActions();
  const isResults = useAppSelector(viewerSelectors.isResults);
  const handleGetMessageHistory = async () => {
    const message = await getMessageHistory();
    setChatMessages(message ?? []);
  };

  const handleGetAnalytics = async () => {
    const analytics = await getChatAnalytics();
    setAnalytics(analytics);
  };

  useWebSocketEvents("textMessage", async (data: IMessage) => {
    if (!data) return null;

    setNewMessage(data);
    await saveMessageInHistory({ message: data });
    if (!data.from_user) {
      setIsLoadingRepeat(false);
    }

    if (isResults) {
      setIsResults(false);
    }

    setIsTyping(data.id);
  });

  useEffect(() => {
    handleGetMessageHistory();
    handleGetAnalytics();
  }, []);

  return {
    messages,
  };
};
