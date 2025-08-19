import { voiceQuestions } from "@/entities/message/lib/mockMessage";
import { ArrowLeft, CheckCircle, Trophy, XCircle } from "lucide-react";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const messages = location.state?.messages || [];

  const getFeedback = (
    questionId: string,
    userResponse: string | undefined
  ): { feedback: string; passed: boolean } => {
    const response = userResponse || "Нет ответа";
    switch (questionId) {
      case "q1":
        return {
          feedback:
            response.length > 10
              ? "Хороший обзор, выделены ключевые моменты."
              : "Ответ слишком короткий, добавьте детали.",
          passed: response.length > 10,
        };
      case "q2":
        return {
          feedback:
            response.includes("Figma") || response.includes("Sketch")
              ? "Отличный опыт с инструментами UX/UI."
              : "Укажите используемые инструменты.",
          passed: response.includes("Figma") || response.includes("Sketch"),
        };
      case "q3":
        return {
          feedback: response.includes("вызовы")
            ? "Интересный проект, хорошо описаны вызовы."
            : "Добавьте информацию о вызовах.",
          passed: response.includes("вызовы"),
        };
      case "q4":
        return {
          feedback: response.includes("продукты")
            ? "Хорошо изучена компания."
            : "Упомяните продукты компании.",
          passed: response.includes("продукты"),
        };
      case "q5":
        return {
          feedback:
            response.length > 5
              ? "Показано любопытство, хороший вопрос."
              : "Задайте вопрос для интереса.",
          passed: response.length > 5,
        };
      default:
        return { feedback: "Фидбэк отсутствует.", passed: false };
    }
  };

  const results = useMemo(() => {
    const userResponses = messages.filter(
      (msg) => msg.type === "user" || msg.type === "clarification"
    );
    return voiceQuestions.map((question, index) => {
      const userResponse = userResponses[index]?.text; // Улучшенное сопоставление по индексу
      const { feedback, passed } = getFeedback(question.id, userResponse);
      return { question: question.text, feedback, passed };
    });
  }, [messages]);

  const passedCount = useMemo(
    () => results.filter((r) => r.passed).length,
    [results]
  );
  const totalQuestions = voiceQuestions.length;
  const overallPassed = passedCount >= Math.ceil(totalQuestions * 0.6);

  const handleBackToHome = () => {
    navigate("/"); // Предполагаем, что главная - "/"
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black flex flex-col text-zinc-200 overflow-hidden">
      {/* Hero section */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-8 bg-gradient-to-r from-[#2F5BFF]/20 to-purple-600/20 backdrop-blur-lg shadow-lg border-b border-zinc-800"
      >
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Результаты собеседования
        </h1>
        <div className="mt-6 flex items-center gap-6">
          <div className="w-full bg-zinc-800/60 rounded-full h-3 overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(passedCount / totalQuestions) * 100}%` }}
              transition={{ duration: 1 }}
              className="bg-gradient-to-r from-[#2F5BFF] to-purple-500 h-3 rounded-full shadow-[0_0_15px_rgba(47,91,255,0.6)]"
            />
          </div>
          <span className="text-base font-semibold">
            {passedCount} / {totalQuestions}
          </span>
        </div>
      </motion.header>

      {/* Results list */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex-1 overflow-y-auto p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {results.map((result, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
          >
            <div className="bg-zinc-900/70 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-zinc-800 hover:border-[#2F5BFF] transition-all duration-300 hover:scale-[1.02]">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white leading-tight">
                    {result.question}
                  </h2>
                  {result.passed ? (
                    <CheckCircle className="h-7 w-7 text-green-500 drop-shadow-[0_0_6px_rgba(34,197,94,0.7)]" />
                  ) : (
                    <XCircle className="h-7 w-7 text-red-500 drop-shadow-[0_0_6px_rgba(239,68,68,0.7)]" />
                  )}
                </div>
                <p className="text-zinc-400 text-sm">{result.feedback}</p>
                <p className="text-sm font-medium text-zinc-300">
                  Результат:{" "}
                  <span
                    className={
                      result.passed
                        ? "text-green-400"
                        : "text-red-400 font-semibold"
                    }
                  >
                    {result.passed ? "Пройден" : "Не пройден"}
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.main>

      {/* Footer summary */}
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="p-8 bg-zinc-950/90 backdrop-blur-lg shadow-lg border-t border-zinc-800"
      >
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            {overallPassed ? (
              <Trophy className="h-12 w-12 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.7)]" />
            ) : (
              <XCircle className="h-12 w-12 text-red-500" />
            )}
          </div>
          <h2 className="text-3xl font-extrabold text-white">Итог</h2>
          <p className="mt-3 text-xl font-medium">
            <span className={overallPassed ? "text-green-400" : "text-red-400"}>
              {overallPassed
                ? "Поздравляем! Вы прошли собеседование."
                : "К сожалению, вы не прошли собеседование."}
            </span>
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBackToHome}
          className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#2F5BFF] to-purple-600 px-6 py-4 text-base font-semibold text-white shadow-lg hover:shadow-[0_0_20px_rgba(47,91,255,0.6)] transition-all duration-300"
        >
          <ArrowLeft className="h-5 w-5" />
          Вернуться на главную
        </motion.button>
      </motion.footer>
    </div>
  );
};

export default ResultPage;
