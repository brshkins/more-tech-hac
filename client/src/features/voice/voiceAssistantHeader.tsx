import { useActions } from "@/shared/hooks/useActions";
import { EModalVariables } from "@/shared/lib/modalVariables";
import { ChartArea } from "lucide-react";
import Image from "next/image";
import React from "react";

export const VoiceAssistantHeader = () => {
  const { setOpen } = useActions();

  const handleOpen = () =>
    setOpen({ type: EModalVariables.ANALYTICS, isOpen: true });

  return (
    <section className="flex w-full justify-between items-center border-b px-6 border-neutral-500 p-3">
      <div>
        <Image
          alt="logo-ai"
          src={"/image/logo-ai.png"}
          width={132}
          height={82}
        />
      </div>
      <button onClick={handleOpen}>
        <ChartArea className="text-white text-zinc-300 cursor-pointer" />
      </button>
    </section>
  );
};
