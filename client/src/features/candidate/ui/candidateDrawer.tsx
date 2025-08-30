import { drawerSelectors } from "@/entities/drawer/model/store/drawerSlice";
import { EDrawerVariables } from "@/shared";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { Drawer, DrawerContent, DrawerTitle } from "@/shared/ui/drawer";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Mail,
  Star,
  Edit,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/shared/ui";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card/card";
import { Badge } from "@/shared/ui/badge/ui/badge";
import { cn } from "@/shared/lib/utils/twMerge";
import { Separator } from "@/shared/ui/separator/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion/accordion";
import { Candidate } from "@/entities/candidate/types/types";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CandidateReport from "./candidateReport";

export const CandidateDrawer = () => {
  const isOpen = useAppSelector(drawerSelectors.isOpen);
  const type = useAppSelector(drawerSelectors.selectType);
  const { candidate } = useAppSelector(drawerSelectors.data) as {
    candidate: Candidate;
  };

  const { toggleDrawer } = useActions();

  const isDrawerOpen = isOpen && type === EDrawerVariables.CANDIDATE_DRAWER;

  const handleClose = () => {
    toggleDrawer(false);
  };
  const [feedback, setFeedback] = React.useState("");
  const [communicationHistory, setCommunicationHistory] = React.useState<
    string[]
  >([]);

  const sendFeedback = () => {
    if (!candidate || !feedback.trim()) return;
    setCommunicationHistory([...communicationHistory, feedback]);
    setFeedback("");
  };

  const handleEditField = (field: keyof Candidate) => {
    console.log(field);
    // Implement actual edit logic (e.g., open a form or modal)
  };

  if (!candidate) return null;

  const getRecommendationBadge = (recommendation?: string) => {
    switch (recommendation) {
      case "На следующий этап":
        return <Badge className="bg-green-600 text-white">Продолжить</Badge>;
      case "Отказ":
        return <Badge className="bg-red-600 text-white">Отказ</Badge>;
      case "Дополнительное тестирование":
        return <Badge className="bg-yellow-600 text-white">Тестирование</Badge>;
      default:
        return <Badge className="bg-zinc-700 text-zinc-300">Не указано</Badge>;
    }
  };

  if (!candidate) return null;

  return (
    <Drawer
      direction={window.innerWidth > 640 ? "right" : "bottom"}
      open={isDrawerOpen}
      onClose={handleClose}
    >
      <AnimatePresence>
        {isDrawerOpen && (
          <DrawerContent className="border border-zinc-800 bg-neutral-900 text-zinc-300">
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="mx-auto w-full max-w-lg px-6 py-8 overflow-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <DrawerTitle className="text-lg text-zinc-300 font-semibold">
                  Детали кандидата:{" "}
                  <span className="underline">{candidate.name}</span>
                </DrawerTitle>
              </div>

              <div className="space-y-6">
                <Card className="bg-neutral-800 border-zinc-700">
                  <CardHeader>
                    <CardTitle className="text-zinc-300 text-lg">
                      Информация о кандидате
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-[13px] text-zinc-300">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                    >
                      <p>
                        <strong>Вакансия:</strong> {candidate.vacancy.post}
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      <p>
                        <strong>Статус:</strong> {candidate.status}
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                    >
                      <p>
                        <strong>Процент соответствия:</strong> {candidate.match}
                        %
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    >
                      <p>
                        <strong>Дата обработки:</strong> {candidate.date}
                      </p>
                    </motion.div>
                  </CardContent>
                </Card>

                <Card className="bg-neutral-800 border-zinc-700">
                  <CardHeader>
                    <CardTitle className="text-zinc-300 text-lg">
                      Оценка интервью
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-[14px] text-zinc-300">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start space-x-3 p-3 bg-neutral-900 rounded-xl hover:bg-neutral-700/50 transition-colors"
                    >
                      <Star className="h-5 w-5 text-yellow-400 mt-1" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <strong className="text-zinc-100">
                            Сильные стороны
                          </strong>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-xl"
                            onClick={() => handleEditField("strengths")}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        <p
                          className={cn(
                            "mt-1",
                            !candidate.strengths && "text-zinc-500 italic"
                          )}
                        >
                          {candidate.strengths || "Нет данных"}
                        </p>
                      </div>
                    </motion.div>
                    <Separator className="bg-zinc-700" />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.3 }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start space-x-3 p-3 bg-neutral-900 rounded-xl hover:bg-neutral-700/50 transition-colors"
                    >
                      <AlertCircle className="h-5 w-5 text-red-400 mt-1" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <strong className="text-zinc-100">Пробелы</strong>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-xl"
                            onClick={() => handleEditField("gaps")}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        <p
                          className={cn(
                            "mt-1",
                            !candidate.gaps && "text-zinc-500 italic"
                          )}
                        >
                          {candidate.gaps || "Нет данных"}
                        </p>
                      </div>
                    </motion.div>
                    <Separator className="bg-zinc-700" />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.3 }}
                      className="p-3 bg-neutral-900 rounded-xl"
                    >
                      <Accordion type="single" collapsible>
                        <AccordionItem value="transcript">
                          <AccordionTrigger className="text-zinc-100 hover:no-underline">
                            <div className="flex items-center space-x-3">
                              <FileText className="h-5 w-5 text-blue-400" />
                              <span>Транскрипт интервью</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="text-[13px] text-zinc-300">
                            <p
                              className={cn(
                                !candidate.transcript && "text-zinc-500 italic"
                              )}
                            >
                              {candidate.transcript || "Транскрипт отсутствует"}
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </motion.div>
                    <Separator className="bg-zinc-700" />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.3 }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start space-x-3 p-3 bg-neutral-900 rounded-xl hover:bg-neutral-700/50 transition-colors"
                    >
                      <CheckCircle className="h-5 w-5 text-green-400 mt-1" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <strong className="text-zinc-100">
                            Рекомендация
                          </strong>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-xl"
                            onClick={() => handleEditField("recommendation")}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="mt-1">
                          {getRecommendationBadge(candidate.recommendation)}
                        </div>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>

                {/* Weighted Criteria Scores */}
                <Card className="bg-neutral-800 border-zinc-700">
                  <CardHeader>
                    <CardTitle className="text-zinc-300 text-lg">
                      Веса критериев
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-[13px] text-zinc-300">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.3 }}
                    >
                      <p>
                        <strong>Технические навыки:</strong>{" "}
                        {candidate.technicalScore || "Не оценено"}
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0, duration: 0.3 }}
                    >
                      <p>
                        <strong>Коммуникация:</strong>{" "}
                        {candidate.communicationScore || "Не оценено"}
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1, duration: 0.3 }}
                    >
                      <p>
                        <strong>Кейсы:</strong>{" "}
                        {candidate.casesScore || "Не оценено"}
                      </p>
                    </motion.div>
                  </CardContent>
                </Card>

                <Card className="bg-neutral-800 border-zinc-700">
                  <CardHeader>
                    <CardTitle className="text-zinc-300 text-lg">
                      Общение с кандидатом
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 0.3 }}
                    >
                      <textarea
                        className="w-full resize-none text-xs p-3 bg-neutral-900 rounded-2xl text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#2F5BFF]"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Напишите фидбек для кандидата..."
                        rows={3}
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3, duration: 0.3 }}
                    >
                      <Button
                        className="flex items-center space-x-1 w-full sm:w-auto rounded-xl text-zinc-300 text-[13px] p-2 px-4 hover:bg-zinc-800 font-medium bg-neutral-900 border border-zinc-700 focus:ring-1 focus:ring-indigo-500"
                        onClick={sendFeedback}
                        disabled={!feedback.trim()}
                      >
                        <Mail className="w-4 h-4" />
                        <span>Отправить фидбек</span>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>

                <Card className="bg-neutral-800 border-zinc-700">
                  <CardHeader>
                    <CardTitle className="text-zinc-300 text-lg">
                      Отчеты
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col sm:flex-row gap-3">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5, duration: 0.3 }}
                    >
                      <Button className="flex items-center space-x-1 w-full sm:w-auto rounded-xl text-zinc-300 text-[13px] p-2 px-4 hover:bg-zinc-800 font-medium bg-neutral-900 border border-zinc-700 focus:ring-1 focus:ring-indigo-500">
                        <FileText className="w-4 h-4" />
                        <PDFDownloadLink
                          document={<CandidateReport candidate={candidate} />}
                          fileName={`Candidate_${candidate.name}.pdf`}
                        >
                          {({ loading }) =>
                            loading ? "Генерация..." : "Скачать отчет"
                          }
                        </PDFDownloadLink>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </DrawerContent>
        )}
      </AnimatePresence>
    </Drawer>
  );
};
