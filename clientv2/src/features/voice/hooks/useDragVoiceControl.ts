import { useState, useRef, useEffect, useCallback } from "react";
import { useMotionValue, useTransform, PanInfo } from "framer-motion";

interface UseDragControlProps {
  isRecording: boolean;
  startRecording: () => void;
  finished?: boolean;
}
type DragStepState = "idle" | "recording" | "finished";

export const useDragControl = ({
  isRecording,
  finished,
  startRecording,
}: UseDragControlProps) => {
  const [dragStep, setDragStep] = useState<DragStepState>("idle");
  const trackRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  const [maxDragPx, setMaxDragPx] = useState(0);
  const [dragThresholdPx, setDragThresholdPx] = useState(0);

  const xProgress = useTransform(x, (val) => {
    const m =
      maxDragPx > 0 ? Math.max(0, Math.min(val, maxDragPx)) / maxDragPx : 0;
    return `${m * 100}%`;
  });

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const handle = handleRef.current;
      if (!track || !handle) return;

      const trackRect = track.getBoundingClientRect();
      const handleRect = handle.getBoundingClientRect();
      const available = Math.max(0, trackRect.width - handleRect.width - 8);

      setMaxDragPx(available);
      setDragThresholdPx(available * 0.65);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (finished) {
      setDragStep("finished");
      x.set(maxDragPx);
    } else if (!isRecording) {
      setDragStep("idle");
      x.set(0);
    } else {
      setDragStep("recording");
      x.set(maxDragPx);
    }
  }, [isRecording, finished, x, maxDragPx]);

  const handleDragStart = () => setIsDragging(true);

  const handleDragEnd = useCallback(
    async (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setIsDragging(false);
      const track = trackRef.current;
      if (!track) {
        x.set(0);
        return;
      }
      const trackRect = track.getBoundingClientRect();
      const handleCenterX = info.point.x - trackRect.left;

      if (handleCenterX >= dragThresholdPx) {
        try {
          await startRecording();
        } catch {
          x.set(0);
        }
      } else {
        x.set(0);
      }
    },
    [dragThresholdPx, startRecording, x]
  );

  return {
    trackRef,
    handleRef,
    x,
    dragStep,
    xProgress,
    maxDragPx,
    isDragging,
    handleDragStart,
    handleDragEnd,
  };
};
