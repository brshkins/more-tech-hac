import { VacancyFilter } from "../../types/types";

export interface VacancySlice {
  vacancyFIlters: Partial<VacancyFilter> | null;
}
