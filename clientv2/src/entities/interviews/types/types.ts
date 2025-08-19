import { Vacancy } from "@/entities/vacancy/types/types";

export interface Interview extends Pick<Vacancy, "post" | "company" | "id"> {
  candidate: string;
  date: string;
  status: "completed" | "cancelled";
}
