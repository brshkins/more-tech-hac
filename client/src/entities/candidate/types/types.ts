import { Vacancy } from "@/entities/vacancy/types/types";

export interface Candidate {
  id: number;
  name: string;
  vacancy: Vacancy;
  status: string;
  match: number;
  date: string;
  strengths?: string;
  gaps?: string;
  transcript?: string;
  recommendation?: string;
  technicalScore?: number;
  communicationScore?: number;
  casesScore?: number;
}
