import { useQuery } from "@tanstack/react-query";
import { getAnalyticsData } from "../api/analyticsService";

export const ANALYTICS_QUERY_KEY = "analytics-query";

export const useAnalytics = () => {
  return useQuery({
    queryKey: [ANALYTICS_QUERY_KEY],
    queryFn: () => getAnalyticsData(),
  });
};
