import { axiosAuth } from "@/shared/api/baseQueryInstance";

class VoiceService {
  private static instance: VoiceService;

  public constructor() {}

  public static getInstance() {
    if (!VoiceService.instance) {
      VoiceService.instance = new VoiceService();
    }

    return VoiceService.instance;
  }

  public async sendAudioUpload({ audioBlob }: { audioBlob: Blob }) {
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");

      const { data } = await axiosAuth.post(
        "/upload_audio",
        formData as unknown as Record<string, unknown>,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return data;
    } catch (err) {
      console.error("Backend send error:", err);
    }
  }
}

export const { sendAudioUpload } = VoiceService.getInstance();
