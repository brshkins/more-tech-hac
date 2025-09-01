import { vacancySelectors } from "@/entities/vacancy/model/store/vacancySlice";
import { EDrawerVariables } from "@/shared";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { cn } from "@/shared/lib/utils/twMerge";
import { Image } from "@/shared/ui";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, Star } from "lucide-react";
import { useMemo } from "react";

export const VacancyFIlter = () => {
  const vacancyFilters = useAppSelector(vacancySelectors.vacancyFIlters);
  const { setOpenDrawer, setVacancyFilters } = useActions();

  const handleOpenFilterDrawer = () =>
    setOpenDrawer({ isOpen: true, type: EDrawerVariables.VACANCY_DRAWER });

  const handleSetVacancyFilter = () =>
    setVacancyFilters({ is_suitable: !vacancyFilters?.is_suitable });

  const filterLength = useMemo(() => {
    if (vacancyFilters) {
      const { is_suitable, ...moreFilter } = vacancyFilters;

      return Object.values(moreFilter).length;
    }

    return 0;
  }, [vacancyFilters]);

  return (
    <div className="flex items-center justify-between flex-col w-full space-y-3">
      <section className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <button
            className={cn(
              "bg-neutral-900 hover:bg-neutral-800 transition-colors cursor-pointer px-2 py-2 rounded-xl",
              vacancyFilters?.is_suitable && "bg-[#3361EC] hover:bg-blue-700"
            )}
            onClick={handleSetVacancyFilter}
          >
            <Star className="w-5 h-5 text-zinc-400" />
          </button>
          <h2 className="text-2xl font-medium">Вакансии</h2>
        </div>
        <button
          className="flex cursor-pointer items-center gap-2 bg-neutral-900 hover:bg-neutral-800 transition-colors px-3 py-2 rounded-xl"
          onClick={handleOpenFilterDrawer}
        >
          <SlidersHorizontal className="w-4 h-4 text-zinc-400" />
          <span className="text-sm">Фильтры</span>
          <span className="bg-[#3361EC] text-xs px-2 py-0.5 rounded-full ml-1">
            {filterLength}
          </span>
        </button>
      </section>

      <AnimatePresence initial={false}>
        {vacancyFilters?.is_suitable && (
          <motion.div
            key="magic-banner"
            initial={{ opacity: 0, y: 8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 8, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full overflow-hidden"
          >
            <Image
              className="w-full"
              alt="searcb-banner"
              src="/images/magic_search_banner.png"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
