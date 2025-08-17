import { queryClient } from "@/shared/api/queryClient";
import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { Vacancy } from "../types/types";
import { getVacancyById } from "../api/vacancyService";
import { ERouteNames } from "@/shared";
import { VACANCY_ALL_QUERY, VACANCY_DETAIL_QUERY } from "../lib/queryKeys";

const getVacancyCachedById = ({
  vacancies,
  vacancyId,
}: {
  vacancies: Array<Vacancy>;
  vacancyId: string;
}) => {
  return vacancies.find((vacancy) => vacancy.id === vacancyId);
};

export const vacancyDetailAction = async ({
  params: { vacancyId },
}: LoaderFunctionArgs) => {
  if (!vacancyId) return null;

  const loadVacancy = async () => {
    const cached = queryClient.getQueryData<Vacancy[]>([VACANCY_ALL_QUERY]);

    if (cached) {
      return getVacancyCachedById({ vacancies: cached, vacancyId });
    }

    return await getVacancyById({ vacancyId });
  };

  const selectVacancy = await loadVacancy();

  if (!selectVacancy) {
    return redirect(`/${ERouteNames.DASHBOARD_ROUTE}`);
  }

  queryClient.setQueryData([VACANCY_DETAIL_QUERY], selectVacancy);

  return selectVacancy;
};
