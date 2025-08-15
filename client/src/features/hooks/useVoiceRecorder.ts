import { sendAudioUpload } from "@/entities/voice/libs/voiceService";
import { useActions } from "@/shared/hooks/useActions";
import { useState, useRef, useEffect, useCallback } from "react";

interface UseVoiceRecorderReturn {
  isRecording: boolean;
  error: string | null;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
}

export const useVoiceRecorder = (): UseVoiceRecorderReturn => {
  const { setIsLoadingRepeat } = useActions();
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const setupVisualizer = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext ||
        ((window as Window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext as typeof AudioContext))();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;
      analyserRef.current.smoothingTimeConstant = 0.7;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const canvasCtx = canvas.getContext("2d");
      if (!canvasCtx) return;

      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        if (!canvasCtx || !analyserRef.current) return;
        animationFrameRef.current = requestAnimationFrame(draw);

        analyserRef.current.getByteFrequencyData(dataArray);

        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const baseRadius = 18;
        const maxRadius = 120;
        const waveCount = 3;

        let amplitude = 0;
        for (let i = 0; i < bufferLength; i++) {
          amplitude += dataArray[i];
        }
        amplitude = amplitude / bufferLength / 255;

        if (amplitude < 0.03) {
          return;
        }

        for (let i = 0; i < waveCount; i++) {
          const progress = (i / waveCount) * amplitude;
          const radius = baseRadius + (maxRadius - baseRadius) * progress;
          const opacity = 0.5 * (1 - progress);
          const lineWidth = 2 + amplitude * 6;

          canvasCtx.beginPath();
          canvasCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          canvasCtx.strokeStyle = `rgba(239, 35, 60, ${opacity})`;
          canvasCtx.lineWidth = lineWidth;
          canvasCtx.stroke();
        }
      };

      draw();
    } catch (err) {
      setError("Не удалось получить доступ к микрофону");
      console.error("Visualizer setup error:", err);
    }
  };

  const handleStartRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

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
      await setupVisualizer();
    } catch (err) {
      setError("Не удалось начать запись");
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

      if (audioContextRef.current) {
        audioContextRef.current
          .close()
          .catch((err) => console.error("AudioContext close error:", err));
        audioContextRef.current = null;
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }
  }, []);

  const sendAudio = async (blob: Blob) => {
    setIsLoadingRepeat(true);
    return await sendAudioUpload({ audioBlob: blob });
  };

  useEffect(() => {
    return () => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "recording"
      ) {
        mediaRecorderRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current
          .close()
          .catch((err) => console.error("AudioContext close error:", err));
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return {
    isRecording,
    error,
    canvasRef,
    startRecording: handleStartRecording,
    stopRecording: handleStopRecording,
  };
};
