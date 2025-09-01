import { useQuery } from "@tanstack/react-query";
import { getAllVacancy } from "../api/vacancyService";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { vacancySelectors } from "../model/store/vacancySlice";
import { VACANCY_ALL_QUERY } from "../lib/queryKeys";

export const useGetVacancy = () => {
  const vacancyFilters = useAppSelector(vacancySelectors.vacancyFIlters);

  return useQuery({
    queryKey: [VACANCY_ALL_QUERY, vacancyFilters],
    queryFn: () => getAllVacancy(vacancyFilters),
  });
};
