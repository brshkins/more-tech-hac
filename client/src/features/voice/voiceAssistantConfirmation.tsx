import { getChatHistory } from "@/entities/message/libs/messageService";
import { viewerSelectors } from "@/entities/viewer/models/store/viewerSlice";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { EModalVariables } from "@/shared/lib/modalVariables";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

export const VoiceAssistantConfirmation = () => {
  const isOpen = useAppSelector(viewerSelectors.isOpen);
  const selectType = useAppSelector(viewerSelectors.selectType);

  const { setClose, resetMessage, setIsResults } = useActions();

  const handleOnClose = (value: boolean) => {
    setClose(value);
  };

  const handleClose = () => setClose(true);

  const handleDeleteChat = async () => {
    resetMessage();
    handleClose();
    await getChatHistory();
    setIsResults(true);
  };

  return (
    <Dialog
      open={isOpen && selectType === EModalVariables.CONFIRMATION}
      onOpenChange={handleOnClose}
    >
      <DialogContent className="bg-zinc-900 text-white border border-zinc-800 rounded-2xl shadow-2xl w-[calc(100%-2rem)]  mx-auto p-0 overflow-hidden">
        <div className="py-4 px-3">
          <DialogHeader className="text-start">
            <DialogTitle className="text-2xl md:text-2xl font-bold">
              Завершить диалог?
            </DialogTitle>
            <DialogDescription className="text-zinc-500">
              Ассистент кратко изложит содержимое диалога
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 grid grid-cols-2 gap-3 w-full">
            <Button
              variant="secondary"
              size="lg"
              className="w-full max-w-full truncate"
              onClick={handleClose}
            >
              Отмена
            </Button>
            <Button
              variant="destructive"
              size="lg"
              className="w-full max-w-full truncate"
              onClick={handleDeleteChat}
            >
              Завершить
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
