import { Vacancy } from "@/entities/vacancy/types/types";
import { ERouteNames } from "@/shared";
import { Image } from "@/shared/ui";
import { TagGroup } from "@/shared/ui/badge/ui/badgeGroup";
import { IconButton } from "@/shared/ui/button/iconButton";
import { SelectionWidget } from "@/widgets/selectionWidget/ui/selectionWidget";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

const VacancyPage = () => {
  const vacancy = useLoaderData<Vacancy>();
  const navigate = useNavigate();

  const handleBackNavigate = () => navigate(-1);
  const handleNavigateToVoice = () =>
    navigate(`/${ERouteNames.DASHBOARD_ROUTE}/${ERouteNames.VOICE_ROUTE}`);

  return (
    <div className="text-white space-y-4 min-h-[calc(100vh-4rem)] pb-36 overflow-hidden">
      <div className="flex items-center">
        <IconButton ariaLabel="Назад" onClick={handleBackNavigate}>
          <ChevronLeft className="w-5 h-5 text-zinc-500" />
        </IconButton>
      </div>

      <section className="space-y-3">
        <div className="relative">
          <Image
            src="/images/vacancy_main.png"
            alt="vacancy-banner"
            className="rounded-3xl w-full"
          />

          <div className="absolute inset-0 flex flex-col justify-between p-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl font-medium text-white">
                  {vacancy.post}
                </h1>
                <p className="text-sm text-white/90">{vacancy.salary}</p>
              </div>

              <IconButton
                ariaLabel="В избранное"
                variant="ghost"
                className="bg-white/20"
              >
                <Heart className="w-5 h-5 text-white" />
              </IconButton>
            </div>

            <TagGroup tags={vacancy.tags} variant="glassLight" size="sm" />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-3xl bg-neutral-900">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <Image
                src={vacancy.company.iconUrl}
                alt={vacancy.company.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-sm text-zinc-100">
                  {vacancy.company.name}
                </p>
                <p className="text-xs text-gray-400">
                  {vacancy.company.industry}
                </p>
              </div>
            </div>
          </div>
          <Link to={vacancy.company.siteUrl} target="_blank">
            <IconButton
              ariaLabel="Открыть сайт"
              className="bg-zinc-800 hover:bg-neutral-700"
            >
              <ChevronRight className="w-5 h-5 text-zinc-500" />
            </IconButton>
          </Link>
        </div>

        <div className="space-y-6 mt-4">
          {[vacancy.responsibilities, vacancy.requirements].map(
            (section, idx) => (
              <div key={idx}>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {section.title}
                </h3>
                <ul className="list-disc px-2 list-inside space-y-2 text-gray-300">
                  {section.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </section>
      <SelectionWidget onClick={handleNavigateToVoice} />
    </div>
  );
};

export default VacancyPage;
