import { useEffect } from "react";
import { useAppSelector } from "./useAppSelector";
import { socketSelectors } from "@/entities/socket/model/store/socketSlice";

export const useWebSocketEvents = <T>(
  eventType: string,
  callback: (data: T) => void
) => {
  const socket = useAppSelector(socketSelectors.socket);

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (event: MessageEvent) => {
      console.log(event.data, "socket events");

      try {
        const parsedData = JSON.parse(event.data);
        if (parsedData.type === eventType) {
          callback(parsedData.data);
        }
        return parsedData;
      } catch (error) {
        console.error("Ошибка при парсинге сообщения:", error);
      }
    };

    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [socket, eventType, callback]);
};
