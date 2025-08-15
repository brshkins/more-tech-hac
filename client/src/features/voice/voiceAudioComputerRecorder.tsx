import { Volume1 } from "lucide-react";
import React from "react";
import { useComputerVoiceRecorder } from "../hooks/useComputerVoiceRecorder";

const VoiceAudioComputerRecorder = () => {
  const { isRecording, startRecording, stopRecording } =
    useComputerVoiceRecorder();

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <button
          className={`flex items-center p-1.5 justify-center dark:border border-zinc-500 rounded-full text-white cursor-pointer ${
            isRecording ? "bg-red-600 hover:bg-red-700" : ""
          }`}
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onTouchStart={startRecording}
          onTouchEnd={stopRecording}
          aria-label={isRecording ? "Остановить запись" : "Начать запись"}
        >
          <Volume1 className="text-zinc-400 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default VoiceAudioComputerRecorder;
