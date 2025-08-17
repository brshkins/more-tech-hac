import { useNavigate } from "react-router-dom";
import { useGetVacancy } from "../hooks/useGetVacancy";
import { VacancyItem } from "./vacancyItem";
import { ERouteNames } from "@/shared";
import { useCallback } from "react";

export const VacancyList = () => {
  const { data: vacancies, isSuccess } = useGetVacancy();
  const navigate = useNavigate();

  const handleNavigateToDetail = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const vacancyId = event.currentTarget.value;
      if (vacancyId) {
        navigate(`${ERouteNames.VACANCY_DETAIL_ROUTE}/${vacancyId}`);
      }
    },
    [navigate]
  );

  return (
    <div className="space-y-3">
      {isSuccess &&
        vacancies.map((vacancy) => (
          <VacancyItem
            key={vacancy.id}
            vacancy={vacancy}
            onNavigate={handleNavigateToDetail}
          />
        ))}
    </div>
  );
};
