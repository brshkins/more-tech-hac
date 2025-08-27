import { VoiceStatistic } from "@/entities/voice/types/types";
import { getPercentageColor } from "../lib/getStatisticPercent";
import clsx from "clsx";
import { ChevronDown, ChevronUp, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface StatisticCardProps {
  statistic: VoiceStatistic;
}

export const StatisticCard = ({ statistic }: StatisticCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleCollapse = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <div className="bg-neutral-900 rounded-3xl p-2">
      <div className="flex items-start space-x-3 p-4">
        <span className="text-zinc-500 text-xl">Q</span>
        <div className="flex-1 flex">
          <p>{statistic.question}</p>
          <div
            className={clsx(
              "ml-2 inline-block h-6 px-2 py-1 text-xs font-medium text-white rounded-full",
              getPercentageColor(statistic.matchPercentage)
            )}
          >
            {statistic.matchPercentage}%
          </div>
        </div>
      </div>
      <div className="flex items-start space-x-3 p-4">
        <span className="text-zinc-500 text-xl">A</span>
        <p className="text-[15px]">{statistic.answer}</p>
      </div>
      <div className="bg-neutral-800 p-4 rounded-2xl flex items-start space-x-2">
        <div className="h-full text-blue-600 mt-0.5">
          <Star className="h-5 w-5" />
        </div>
        <div
          className="flex flex-col w-full items-start space-y-2"
          onClick={handleToggleCollapse}
        >
          <div className="flex justify-between text-blue-600 items-start w-full">
            <p>Совет от ИИ:</p>
            <button className="text-zinc-500 cursor-pointer">
              {isMenuOpen ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
          <AnimatePresence initial={false}>
            {isMenuOpen && (
              <motion.div
                key="advice"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden text-zinc-300 text-[15px]"
              >
                {statistic.aiAdvice}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
