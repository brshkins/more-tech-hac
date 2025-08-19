import { useState } from "react";
import { Star, ChevronUp, ChevronDown } from "lucide-react";
import { Button, Image } from "@/shared/ui";
import { motion, AnimatePresence } from "framer-motion";

const ResultPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleCollapse = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const questionAnswers = [
    {
      question: "Что ты знаешь о нашей компании и вакансии?",
      answer:
        "Ваша компания очень известная по реализации банковских систем и является ведущей финтех компанией",
      matchPercentage: 85,
    },
    {
      question: "Что ты знаешь о нашей компании и вакансии?",
      answer:
        "Ваша компания очень известная по реализации банковских систем и является ведущей финтех компанией",
      matchPercentage: 60,
    },
  ];

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="text-white flex flex-col space-y-3 pb-4">
      <div className="relative">
        <Image
          src="/images/vacancy_main (2).png"
          alt="vacancy-banner"
          className="rounded-3xl w-full"
        />
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <div className="flex justify-between items-start">
            <h1 className="text-xl font-medium text-white">
              Собеседование завершено!
            </h1>
          </div>
          <div>
            <p className="text-sm">Было принято решение</p>
            <p className="text-base">Пригласить тебя на 2-ой этап</p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <Button
          variant="outline"
          className="w-full bg-white text-zinc-800 hover:bg-gray-100 border border-gray-300 rounded-2xl py-5 text-base font-semibold"
        >
          Связаться с HR
        </Button>
      </div>

      <section className="space-y-2">
        <h2 className="text-xl">Разбор собеседования</h2>
        {questionAnswers.map((qa, index) => (
          <div key={index} className="bg-neutral-900 rounded-3xl p-2">
            <div className="flex items-start space-x-3 p-4">
              <span className="text-zinc-500 text-xl">Q</span>
              <div className="flex-1 flex">
                <p>{qa.question}</p>
                <div
                  className={`ml-2 inline-block h-6 px-2 py-1 text-xs font-medium text-white rounded-full ${getPercentageColor(
                    qa.matchPercentage
                  )}`}
                >
                  {qa.matchPercentage}%
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4">
              <span className="text-zinc-500 text-xl">A</span>
              <p>{qa.answer}</p>
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
                  <button className="text-zinc-500">
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
                      className="overflow-hidden text-zinc-300"
                    >
                      В целом ответ очень неплохой, но стоило больше почитать
                      про ценности компании, про проекты, которые она реализует
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ResultPage;
