import { useInterviewsHistory } from "@/entities/interviews/hooks/useInterviewsHistory";
import { InterviewCard } from "@/features/interview/ui/interviewCard";
import { Image } from "@/shared/ui";
import { IconButton } from "@/shared/ui/button/iconButton";
import { ChevronLeft, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

const InterviewsPage = () => {
  const { data: interviews, isSuccess } = useInterviewsHistory();

  const navigate = useNavigate();

  const handleToDashboard = () => navigate(-1);
  return (
    <div className="text-white flex flex-col space-y-3 pb-4">
      <div className="flex justify-start items-center">
        <IconButton ariaLabel="вернуться назад" onClick={handleToDashboard}>
          <ChevronLeft className="h-6 w-6" />
        </IconButton>
      </div>
      <div className="relative">
        <Image
          src="/images/vacancy_main (3).png"
          alt="vacancy-banner"
          className="rounded-3xl w-full"
        />

        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <div className="flex justify-between items-start">
            <h1 className="text-xl font-medium text-white">
              Сборали твои собеседования в одном месте
            </h1>
          </div>
        </div>
      </div>
      <section className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-medium">Собеседования</h2>
        </div>
        <button className="flex cursor-pointer items-center gap-2 bg-neutral-900 hover:bg-neutral-800 transition-colors px-3 py-2 rounded-xl">
          <SlidersHorizontal className="w-4 h-4 text-zinc-400" />
          <span className="text-sm">Фильтры</span>
          <span className="bg-[#3361EC] text-xs px-2 py-0.5 rounded-full ml-1">
            0
          </span>
        </button>
      </section>
      {isSuccess &&
        interviews.map((interview) => (
          <InterviewCard key={interview.id} interview={interview} />
        ))}
    </div>
  );
};

export default InterviewsPage;
