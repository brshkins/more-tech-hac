import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle } from "lucide-react";

interface VoiceAssistantBubbleDetailProps {
  expanded: boolean;
  detail: string | undefined;
}

export const VoiceAssistantBubbleDetail = ({
  expanded,
  detail,
}: VoiceAssistantBubbleDetailProps) => {
  return (
    <AnimatePresence>
      {expanded && detail && (
        <motion.div
          key="detail"
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: "auto", marginTop: 8 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="mt-3 overflow-hidden rounded-xl bg-zinc-800 border border-zinc-700 p-4 text-sm text-zinc-200 shadow-md"
        >
          <div className="flex items-start gap-3">
            <HelpCircle className="h-5 w-5 text-[#2F5BFF] flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed flex-1">{detail}</p>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="rounded-full cursor-pointer bg-[#2F5BFF] px-4 py-2 text-xs font-medium text-white hover:bg-[#2F5BFF]/80 transition-all duration-200 hover:scale-105">
              Задать уточняющий вопрос
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
