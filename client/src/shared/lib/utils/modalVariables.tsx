import { VoiceAssistantEstimationModal } from "@/features/voice/ui/voiceAssistantEstimationModal";
import { JSX } from "react";

export const enum EModalVariables {
  ESTIMATION_MODAL = "estimation-modal",
}

export const modalComponents: Record<EModalVariables, JSX.Element> = {
  [EModalVariables.ESTIMATION_MODAL]: <VoiceAssistantEstimationModal />,
};

export const getModalComponent = (type: EModalVariables): React.ReactNode => {
  return modalComponents[type];
};
