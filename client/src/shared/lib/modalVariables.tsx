import { VoiceAssistantAnalytics } from "@/features/voice/voiceAssistantAnalytics";
import { VoiceAssistantConfirmation } from "@/features/voice/voiceAssistantConfirmation";
import { JSX } from "react";

export const enum EModalVariables {
  CONFIRMATION = "CONFIRMATION",
  ANALYTICS = "ANALYTICS",
}

export const uniqueModal: Record<EModalVariables, JSX.Element> = {
  [EModalVariables.CONFIRMATION]: <VoiceAssistantConfirmation />,
  [EModalVariables.ANALYTICS]: <VoiceAssistantAnalytics />,
};
