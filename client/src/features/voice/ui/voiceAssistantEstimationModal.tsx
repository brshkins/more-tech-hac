import { modalSelectors } from "@/entities/modal/model/store/modalSlice";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { EModalVariables } from "@/shared/lib/utils/modalVariables";
import { Button } from "@/shared/ui";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/shared/ui/dialog/dialog";
import { VoiceAssistantRating } from "./voiceAssistantRating";

export const VoiceAssistantEstimationModal = () => {
  const isOpen = useAppSelector(modalSelectors.isOpen);
  const type = useAppSelector(modalSelectors.selectType);

  const { toggleModal } = useActions();

  const isModalOpen = isOpen && type === EModalVariables.ESTIMATION_MODAL;

  const handleClose = () => {
    toggleModal(false);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-zinc-900 text-zinc-300 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col items-center px-1 space-y-2 mb-2">
          <DialogTitle className="text-2xl font-bold text-center text-zinc-300">
            Оценка
          </DialogTitle>
          <VoiceAssistantRating />
        </div>

        <DialogFooter>
          <div className="flex gap-3">
            <div className="w-full">
              <Button
                variant="outline"
                className="w-full border-zinc-600 text-gray-400 hover:text-white"
              >
                Отменить
              </Button>
            </div>
            <div className="w-full">
              <Button className="bg-blue-600 w-full hover:bg-blue-500">
                Сохранить
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
