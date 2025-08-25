import { questionAnswers } from "../lib/mockVoiceResult";
import { VoiceStatistic } from "../types/types";

class VoiceService {
  public async sendAudioUpload({ audioBlob }: { audioBlob: Blob }) {
    try {
      const url = URL.createObjectURL(audioBlob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `recording-${Date.now()}.webm`;
      document.body.appendChild(a);
      a.click();

      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Audio save error:", err);
    }
  }

  public async getVoiceDialogResult(): Promise<VoiceStatistic[]> {
    return new Promise((resolve) => resolve(questionAnswers));
  }
}

export const { sendAudioUpload, getVoiceDialogResult } = new VoiceService();
