import { useSocketConnect } from "@/shared/hooks/useSocketConnect";
import { PropsWithChildren } from "react";

const SocketProvider = ({ children }: PropsWithChildren) => {
  useSocketConnect();

  return children;
};

export default SocketProvider;
