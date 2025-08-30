export interface AnalyticsData {
  totalCandidates: number;
  candidatesThisMonth: number;
  statusDistribution: Array<{
    name: string;
    value: number;
    fill: string;
  }>;
  averageMatch: number;
  topVacancies: Array<{
    name: string;
    value: number;
    fill: string;
  }>;
}
