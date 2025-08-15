import { useState, useEffect } from "react";

export const useTypingEffect = (typingText: string | null, delay = 10) => {
  const [streamedText, setStreamedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(currentIndex)

  useEffect(() => {
    setStreamedText("");
    setCurrentIndex(0);

    if (!typingText) {
      return;
    }

    const chars = typingText.split("");
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        setStreamedText(chars.slice(0, nextIndex).join(""));

        if (nextIndex >= chars.length) {
          clearInterval(interval);
        }

        return nextIndex;
      });
    }, delay);

    return () => clearInterval(interval);
  }, [typingText, delay]);

  return streamedText;
};
