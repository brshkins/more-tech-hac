import { sendAudioUpload } from "@/entities/voice/libs/voiceService";
import { useState, useRef, useCallback, useEffect } from "react";

interface UseComputerVoiceRecorderReturn {
  isRecording: boolean;
  error: string | null;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
}

export const useComputerVoiceRecorder = (): UseComputerVoiceRecorderReturn => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const sendAudio = async (blob: Blob) => {
    try {
      await sendAudioUpload({ audioBlob: blob });
    } catch (err) {
      setError("Ошибка при отправке аудио");
      console.error("Audio upload error:", err);
    }
  };

  const handleStartRecording = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const systemAudioDevice = devices.find(
        (device) =>
          device.kind === "audioinput" &&
          (device.label.toLowerCase().includes("stereo mix") ||
            device.label.toLowerCase().includes("cable input") ||
            device.label.toLowerCase().includes("blackhole"))
      );

      const constraints = {
        audio: systemAudioDevice
          ? { deviceId: systemAudioDevice.deviceId }
          : true,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        await sendAudio(blob);
        chunksRef.current = [];
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      setError(
        "Не удалось начать запись. Проверьте наличие устройства для записи системного звука (например, Stereo Mix или виртуальный кабель)."
      );
      console.error("Recording start error:", err);
    }
  }, []);

  const handleStopRecording = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "recording"
      ) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  return {
    isRecording,
    error,
    startRecording: handleStartRecording,
    stopRecording: handleStopRecording,
  };
};
