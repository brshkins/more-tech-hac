import { CreateVacancyDto, Vacancy, VacancyFilter } from "../types/types";
import { axiosAuth } from "@/shared/api/baseQueryInstance";

class VacancyService {
  public async getAllVacancy(
    filters: Partial<VacancyFilter> | null
  ): Promise<Array<Vacancy>> {
    const { data } = await axiosAuth.get<Array<Vacancy>>("/client/vacancy", {});

    return data;
  }

  public async getVacancyById({
    vacancyId,
  }: {
    vacancyId: string;
  }): Promise<Vacancy | null> {
    const { data } = await axiosAuth.get<Vacancy>(
      `/client/vacancy/${vacancyId}`
    );

    return data;
  }

  public async createVacancy(vacancyData: CreateVacancyDto): Promise<Vacancy> {
    const { data } = await axiosAuth.post<Vacancy>("/client/vacancy", {
      ...vacancyData,
    });

    return data;
  }
}

export const { getAllVacancy, getVacancyById, createVacancy } =
  new VacancyService();
