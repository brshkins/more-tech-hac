import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";

export const VoiceAssistantRating = () => {
  const [rating, setRating] = useState<number | null>(null);

  const handleRating = (value: number) => {
    setRating(value);
  };

  const stars = Array(5)
    .fill(0)
    .map((_, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="cursor-pointer"
        onClick={() => handleRating(index + 1)}
      >
        <Star
          className={`h-8 w-8 ${
            rating && index < rating ? "text-blue-600" : "text-zinc-600"
          }`}
        />
      </motion.div>
    ));
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-sm text-zinc-300 text-center">
          Ваше собеседование прошло успешно! Просим оценить проведение
          собеседования от нашего AI-ассистента
        </p>
      </motion.div>

      <div className="flex space-x-2 mb-4">{stars}</div>
      <AnimatePresence>
        {rating && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm text-zinc-400"
          >
            Спасибо! Ваша оценка: {rating} из 5
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
