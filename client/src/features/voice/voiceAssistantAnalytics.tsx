import { viewerSelectors } from "@/entities/viewer/models/store/viewerSlice";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { EModalVariables } from "@/shared/lib/modalVariables";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { VoiceReactionAssistantAnalytics } from "./voiceReactionsAssistantAnalytics";

export const VoiceAssistantAnalytics = () => {
  const isOpen = useAppSelector(viewerSelectors.isOpen);
  const selectType = useAppSelector(viewerSelectors.selectType);

  const { setClose } = useActions();

  const handleOnClose = (value: boolean) => {
    setClose(value);
  };

  return (
    <Dialog
      open={isOpen && selectType === EModalVariables.ANALYTICS}
      onOpenChange={handleOnClose}
    >
      <DialogContent className="bg-zinc-900 text-white border border-zinc-800 rounded-2xl shadow-2xl w-[calc(100%-2rem)] mx-auto p-0 overflow-hidden">
        <div className="p-4">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl text-center md:text-2xl font-bold">
              Статистика
            </DialogTitle>
            <DialogDescription className="text-zinc-500 text-center">
              Отражает фидбэк пользователей на ответы ассистента
            </DialogDescription>
          </DialogHeader>
          <VoiceReactionAssistantAnalytics />
        </div>
      </DialogContent>
    </Dialog>
  );
};
