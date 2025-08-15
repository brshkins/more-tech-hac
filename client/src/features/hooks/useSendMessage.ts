import { saveMessageInHistory } from "@/entities/message/libs/messageService";
import { socketSelectors } from "@/entities/socket/model/store/socketSlice";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";

export const useSendMessage = () => {
  const socket = useAppSelector(socketSelectors.socket);
  const { setNewMessage, setIsLoadingRepeat } = useActions();

  const handleSendNewMessage = async ({ content }: { content: string }) => {
    const newMessage = {
      id: crypto.randomUUID(),
      text: content,
      from_user: true,
      liked: null,
      created_at: new Date().toISOString(),
    };
    if (socket && socket.readyState === WebSocket.OPEN) {
      setIsLoadingRepeat(true);
      const id = crypto.randomUUID();
      await saveMessageInHistory({ message: { ...newMessage, id } });
      socket.send(JSON.stringify(newMessage));
      setNewMessage({ ...newMessage, id });
    }
  };

  return {
    handleSendNewMessage,
  };
};
