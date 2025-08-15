import { useState, useEffect, useRef, JSX } from "react";
import { Play, Pause, BookA } from "lucide-react";

interface VoiceMessagePlayerProps {
  audioUrl: string;
  text?: string;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const VoiceMessagePlayer: React.FC<VoiceMessagePlayerProps> = ({
  audioUrl,
  text,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [waveformBars, setWaveformBars] = useState<JSX.Element[]>([]);
  const [showTranscription, setShowTranscription] = useState<boolean>(false); // State for toggling transcription
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const bars = Array.from({ length: 50 }, (_, i) => {
      const height = Math.random() * 20 + 5;
      return (
        <div
          key={i}
          className="w-[2px] bg-gray-400 rounded-full transition-all duration-200"
          style={{ height: `${height}px` }}
        />
      );
    });
    setWaveformBars(bars);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setError(null);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(100);
      setCurrentTime(audio.duration || 0);
    };

    const handleError = () => {
      setError("Не удалось воспроизвести аудио");
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .catch(() => setError("Не удалось воспроизвести аудио"));
    }
  };

  const handleProgressChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newProgress = (clickX / width) * 100;
    const newTime = (newProgress / 100) * duration;

    audioRef.current.currentTime = newTime;
    setProgress(newProgress);
    setCurrentTime(newTime);
  };

  const toggleTranscription = () => {
    setShowTranscription(!showTranscription);
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col gap-2 bg-[#343A40] rounded-2xl max-w-sm w-full">
      <div className="flex items-center gap-2">
        <button
          onClick={handlePlayPause}
          className="p-2 rounded-full flex-shrink-0 text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
          aria-label={isPlaying ? "Пауза" : "Воспроизвести"}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </button>

        <div className="text-xs text-gray-400 flex-shrink-0">
          {formatTime(currentTime)}
        </div>

        <div
          className="flex-1 h-8 flex items-center gap-[2px] cursor-pointer relative"
          onClick={handleProgressChange}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              const newProgress = Math.min(progress + 5, 100);
              const newTime = (newProgress / 100) * duration;
              if (audioRef.current) {
                audioRef.current.currentTime = newTime;
                setProgress(newProgress);
                setCurrentTime(newTime);
              }
            } else if (e.key === "ArrowLeft") {
              const newProgress = Math.max(progress - 5, 0);
              const newTime = (newProgress / 100) * duration;
              if (audioRef.current) {
                audioRef.current.currentTime = newTime;
                setProgress(newProgress);
                setCurrentTime(newTime);
              }
            }
          }}
        >
          {waveformBars}
          <div
            className="absolute top-0 left-0 h-full flex items-center gap-[2px] overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            {waveformBars.map((bar, i) => (
              <div key={i} {...bar.props} className="w-[2px] rounded-full" />
            ))}
          </div>
        </div>

        {text && (
          <button
            onClick={toggleTranscription}
            className="p-2 rounded-full flex-shrink-0 text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
            aria-label={
              showTranscription ? "Скрыть расшифровку" : "Показать расшифровку"
            }
          >
            <BookA className="h-5 w-5 text-zinc-400" />
          </button>
        )}
      </div>

      {text && showTranscription && (
        <div className="text-sm text-gray-300 px-2 py-1 rounded-lg transition-all duration-200">
          {text}
        </div>
      )}

      <audio ref={audioRef} src={audioUrl} preload="metadata" />
    </div>
  );
};

export default VoiceMessagePlayer;
