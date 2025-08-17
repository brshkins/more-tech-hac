import { Vacancy, VacancyFilter } from "../types/types";
import { mockVacancies } from "../lib/mockVacancy";

class VacancyService {
  public async getAllVacancy(
    _: Partial<VacancyFilter> | null
  ): Promise<Array<Vacancy>> {
    return new Promise((resolve) => {
      resolve(mockVacancies);
    });
  }

  public async getVacancyById({
    vacancyId,
  }: {
    vacancyId: string;
  }): Promise<Vacancy | null> {
    return new Promise((resolve) => {
      const vacancy = mockVacancies.find((vac) => vac.id === vacancyId);
      resolve(vacancy || null);
    });
  }
}

export const { getAllVacancy, getVacancyById } = new VacancyService();
