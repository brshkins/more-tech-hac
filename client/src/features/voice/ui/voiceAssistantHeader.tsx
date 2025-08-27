import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { IconButton } from "@/shared/ui/button/iconButton";
import clsx from "clsx";

interface VoiceAssistantHeaderProps {
  title?: string;
  progress?: number;
  onBack?: () => void;
  sticky?: boolean;
}

export const VoiceAssistantHeader = ({
  title = "Процесс отбора",
  progress = 100,
  onBack,
  sticky = true,
}: VoiceAssistantHeaderProps) => {
  const navigate = useNavigate();

  const mv = useMotionValue(0);
  const pct = useTransform(mv, (v) => `${Math.round(v)}%`);

  React.useEffect(() => {
    const controls = animate(mv, progress, { duration: 0.3, ease: "easeOut" });
    return controls.stop;
  }, [progress, mv]);

  const handleBack = () => (onBack ? onBack() : navigate(-1));

  return (
    <div
      className={clsx(
        sticky && "sticky top-0 z-30",
        "backdrop-blur-md bg-black/40",
        "pt-[max(env(safe-area-inset-top),0px)]"
      )}
    >
      <div className="pb-3">
        <div className="flex items-center justify-between gap-3 w-full rounded-3xl bg-neutral-900/90 ring-1 ring-white/10 shadow-lg px-2.5 py-2">
          <IconButton
            ariaLabel="Назад"
            onClick={handleBack}
            className="h-11 w-11"
          >
            <ChevronLeft className="w-5 h-5 text-zinc-500" />
          </IconButton>
          <div className="min-w-0">
            <div className="flex items-baseline gap-2">
              <p className="truncate text-[13px] font-medium text-zinc-200">
                {title}
              </p>
              <span className="text-zinc-500">—</span>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={progress}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="text-[13px] font-semibold text-[#2F5BFF]"
                >
                  {pct}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          <div />
        </div>
      </div>
    </div>
  );
};
