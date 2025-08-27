import { motion, AnimatePresence } from "framer-motion";
import {
  AudioLines,
  ChevronsRight,
  Pause,
  Play,
  SendIcon,
  X,
} from "lucide-react";
import { cn } from "@/shared/lib/utils/twMerge";
import { useComputerVoiceRecorder } from "@/features/voice/hooks/useComputerVoiceRecorder";
import { formatTime } from "../lib/formatTime";
import { useDragControl } from "../hooks/useDragVoiceControl";

/**
 * VoiceAssistantBar: реализует 2 этапа поведения
 * - idle: слайд-ручка, которую пользователь тянет вправо, чтобы активировать запись
 * - recording: отображение прогресса/таймера и кнопок Stop / Pause
 *
 * Для drag-логики используется framer-motion (drag="x") и замер ширины контейнера,
 * чтобы корректно вычислять порог срабатывания (threshold).
 */
interface VoiceAssistantBarProps {
  finished?: boolean;
  onStopRecording: (transcript: string) => void;
  onRedirect: () => void;
}
export const VoiceAssistantBar: React.FC<VoiceAssistantBarProps> = ({
  finished,
  onRedirect,
  onStopRecording,
}) => {
  const {
    isRecording,
    isPaused,
    elapsedSec,
    startRecording,
    stopRecording,
    togglePause,
  } = useComputerVoiceRecorder({ maxDurationSec: 60 * 10 });

  const {
    isDragging,
    trackRef,
    handleRef,
    x,
    xProgress,
    maxDragPx,
    dragStep,
    handleDragStart,
    handleDragEnd,
  } = useDragControl({ isRecording, finished, startRecording });

  const handleStopRecording = () => {
    stopRecording();
    onStopRecording(
      "Да, меня зовут Егор, я Frontend-разработчик с хорошим опытом в области Web."
    );
  };

  return (
    <div className="pointer-events-auto">
      <AnimatePresence mode="popLayout" initial={false}>
        {dragStep === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.18 }}
            className="rounded-full bg-neutral-900 relative shadow-2xl pl-1 ring-1 ring-white/5"
          >
            <div
              ref={trackRef}
              style={{ touchAction: isDragging ? "none" : "pan-y" }}
              className="relative flex items-center gap-3 justify-between rounded-full bg-transparent py-2 px-3"
              aria-hidden={false}
            >
              <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-full rounded-full bg-[#2F5BFF]"
                style={{ width: xProgress }}
              />
              <div className="w-11 h-11" />

              <div className="text-center select-none text-[13px] text-zinc-500">
                Начать собеседование
              </div>

              <button className=" grid h-11 w-11 place-items-center rounded-full bg-zinc-800 text-zinc-400">
                <AudioLines className="h-5 w-5" />
              </button>

              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: maxDragPx }}
                dragElastic={0}
                style={{ x }}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                ref={handleRef}
                className="absolute left-2  top-1/2 -translate-y-1/2 grid h-11 w-11 translate-x-0 place-items-center rounded-full bg-[#2F5BFF] cursor-pointer text-white touch-none"
                aria-label="Ручка старта — потяни вправо"
              >
                <button className="text-lg cursor-pointer">
                  <ChevronsRight />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {dragStep === "recording" && (
          <motion.div
            key="active"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22 }}
            className="grid gap-3"
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex min-w-0 flex-1 items-center justify-between rounded-full py-2 px-3 bg-[#2F5BFF] text-white shadow",
                  isPaused && "bg-neutral-900"
                )}
              >
                <div className="flex items-center justify-center space-x-1.5">
                  <button
                    onClick={stopRecording}
                    className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-white hover:bg-blue-700 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  <span className="truncate text-[13px]">
                    {!isPaused ? "Собеседование" : "Удержание"} •{" "}
                    {formatTime(elapsedSec)}
                  </span>
                </div>

                <div className="flex items-center justify-center space-x-1.5">
                  <button
                    onClick={togglePause}
                    className="ml-3 cursor-pointer grid h-11 w-11 place-items-center rounded-full text-white hover:bg-blue-700 transition-colors"
                  >
                    {isPaused ? (
                      <Play className="h-5 w-5" />
                    ) : (
                      <Pause className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    onClick={handleStopRecording}
                    className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-blue-700 hover:bg-blue-700/40 transition-colors text-white"
                  >
                    <SendIcon className="h-5 w-5 mr-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {dragStep === "finished" && (
          <motion.div
            key="finished"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22 }}
            className="grid gap-3"
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex min-w-0 flex-1 items-center justify-center rounded-full py-2 px-3 bg-[#2F5BFF] text-white shadow"
                )}
              >
                <button
                  className="flex cursor-pointer h-11 items-center"
                  onClick={onRedirect}
                >
                  Завершить
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
