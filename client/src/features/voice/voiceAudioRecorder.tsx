import React from "react";
import { useVoiceRecorder } from "../hooks/useVoiceRecorder";
import { Mic } from "lucide-react";

const VoiceAudioRecorder = () => {
  const { isRecording, canvasRef, startRecording, stopRecording } =
    useVoiceRecorder();

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
          <Mic className="text-zinc-400 cursor-pointer" />
        </button>
        {isRecording && (
          <canvas
            ref={canvasRef}
            width={100}
            height={100}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          />
        )}
      </div>
    </div>
  );
};

export default VoiceAudioRecorder;
