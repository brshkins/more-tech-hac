import { Button, Image } from "@/shared/ui";
import { IconButton } from "@/shared/ui/button/iconButton";
import { useNavigate } from "react-router-dom";
import { ERouteNames } from "@/shared";
import { useVoiceStatistic } from "@/entities/voice/hooks/useVoiceStatistic";
import { StatisticCard } from "@/features/statistic/ui/statisticCard";
import { ChevronLeft } from "lucide-react";

const ResultPage = () => {
  const { data: voiceStatistic, isSuccess } = useVoiceStatistic();

  const navigate = useNavigate();

  const handleToDashboard = () => navigate(`/${ERouteNames.DASHBOARD_ROUTE}`);

  return (
    <div className="text-white flex flex-col space-y-3 pb-4">
      <div className="flex justify-start items-center">
        <IconButton ariaLabel="вернуться назад" onClick={handleToDashboard}>
          <ChevronLeft className="h-6 w-6" />
        </IconButton>
      </div>

      <div className="relative">
        <Image
          src="/images/vacancy_main (2).png"
          alt="vacancy-banner"
          className="rounded-3xl w-full"
        />
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <div className="flex justify-between items-start">
            <h1 className="text-xl text-white">Собеседование завершено!</h1>
          </div>
          <div>
            <p className="text-[15px] leading-4 font-light">
              Было принято решение
            </p>
            <p className="text-[15px]">Пригласить тебя на 2-ой этап</p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <Button
          variant="outline"
          className="w-full bg-white text-zinc-800 hover:bg-gray-100 border border-gray-300 rounded-2xl py-5 text-[15px] font-semibold"
        >
          Связаться с HR
        </Button>
      </div>

      <section className="space-y-2">
        <h2 className="text-xl">Разбор собеседования</h2>
        {isSuccess &&
          voiceStatistic.map((statistic) => (
            <StatisticCard key={statistic.id} statistic={statistic} />
          ))}
      </section>
    </div>
  );
};

export default ResultPage;
