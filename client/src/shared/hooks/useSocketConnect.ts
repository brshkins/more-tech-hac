import { useEffect } from "react";
import { socketSelectors } from "@/entities/socket/model/store/socketSlice";
import { useActions } from "./useActions";
import { useAppSelector } from "./useAppSelector";

export const useSocketConnect = () => {
  const { connectionSocket } = useActions();
  const isConnected = useAppSelector(socketSelectors.isConnected);
  const socket = useAppSelector(socketSelectors.socket);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!isConnected) {
      connectionSocket({
        url: `/ws?type=1`,
      });
    }

    if (socket instanceof WebSocket) {
      socket.onclose = () => {
        connectionSocket({
          url: `/ws?type=1`,
        });
      };
    }

    return () => {
      if (socket instanceof WebSocket) {
        socket.onclose = null;
      }
    };
  }, [isConnected, socket, connectionSocket]);
};
