import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

export const AssistantContainer: FC<PropsWithChildren> = ({ children }) => (
  <div
    className={clsx(
      "w-full h-screen max-w-[1000px] mx-auto md:h-screen bg-neutral-900 flex flex-col"
    )}
  >
    {children}
  </div>
);
