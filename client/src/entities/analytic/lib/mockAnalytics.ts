import { AnalyticsData } from "../types/types";

export const mockAnalyticsData: AnalyticsData = {
  totalCandidates: 150,
  candidatesThisMonth: 45,
  statusDistribution: [
    { name: "В обработке", value: 75, fill: "#FFCE56" },
    { name: "Прошли", value: 50, fill: "#36A2EB" },
    { name: "Отказ", value: 25, fill: "#FF6384" },
  ],
  averageMatch: 67,
  topVacancies: [
    { name: "Frontend Developer", value: 40, fill: "#36A2EB" },
    { name: "Data Scientist", value: 30, fill: "#FFCE56" },
    { name: "UX Designer", value: 20, fill: "#FF6384" },
  ],
};
