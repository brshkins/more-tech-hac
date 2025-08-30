import { mockAnalyticsData } from "../lib/mockAnalytics";
import { AnalyticsData } from "../types/types";

class AnalyticsService {
  public async getAnalyticsData(): Promise<AnalyticsData> {
    return new Promise((resolve) => resolve(mockAnalyticsData));
  }
}

export const { getAnalyticsData } = new AnalyticsService();
