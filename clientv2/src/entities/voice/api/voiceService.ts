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
}

export const { sendAudioUpload } = new VoiceService();
