import { useQuery } from "@tanstack/react-query";
import { getVoiceDialogResult } from "../api/voiceService";

export const VOICE_STATISTIC_QUERY = "voice-statistic";

export const useVoiceStatistic = () => {
  return useQuery({
    queryKey: [VOICE_STATISTIC_QUERY],
    queryFn: getVoiceDialogResult,
  });
};
