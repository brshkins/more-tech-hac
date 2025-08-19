import { mockInterviews } from "@/entities/interviews/lib/mockInterviews";
import { Image } from "@/shared/ui";
import { IconButton } from "@/shared/ui/button/iconButton";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const InterviewsPage = () => {
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
      {mockInterviews.map((interview) => (
        <div
          key={interview.id}
          className="bg-neutral-900 text-white rounded-3xl p-4 flex flex-col gap-2 shadow-md"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Image
                src={interview.company.iconUrl}
                alt={interview.company.name}
                width={20}
                height={20}
                className="rounded-md object-cover"
              />
              <p className="font-semibold text-sm text-zinc-500">
                {interview.company.name}
              </p>
            </div>
            <button className="p-1">
              {interview.status === "cancelled" ? (
                <X className="text-red-600" />
              ) : (
                <Check className="text-blue-600" />
              )}
            </button>
          </div>

          <section className="flex justify-between items-center">
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">{interview.post}</h3>
              <p className="text-zinc-600">{interview.date}</p>
            </div>

            <div className="flex">
              <IconButton
                value={interview.id}
                ariaLabel="Перейти к вакансии"
                className="bg-zinc-800 hover:bg-neutral-700"
              >
                <ChevronRight className="w-5 h-5 text-zinc-500" />
              </IconButton>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
};

export default InterviewsPage;
