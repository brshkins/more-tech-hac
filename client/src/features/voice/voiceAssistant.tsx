"use client";

import { memo } from "react";
import { AssistantContainer } from "./voiceAssistantContainer";
import { VoiceAssistantInput } from "./voiceAssistantInput";
import { VoiceAssistantHeader } from "./voiceAssistantHeader";
import { AssistantMessageList } from "./voiceAssistantMessageList";
import { useMessageSocket } from "../hooks/useMessageSocket";

const VoiceAssistant = memo(() => {
  const { messages } = useMessageSocket();
  return (
    <AssistantContainer>
      <VoiceAssistantHeader />
      <AssistantMessageList messages={messages} />
      <VoiceAssistantInput />
    </AssistantContainer>
  );
});

VoiceAssistant.displayName = "VoiceAssistant";

export default VoiceAssistant;
