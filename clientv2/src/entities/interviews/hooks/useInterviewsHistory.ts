import { useQuery } from "@tanstack/react-query";
import { getInterviewsHistory } from "../api/interviewService";

export const INTERVIEWS_HISTORY_QUERY = "interviews-history";

export const useInterviewsHistory = () => {
  return useQuery({
    queryKey: [INTERVIEWS_HISTORY_QUERY],
    queryFn: getInterviewsHistory,
  });
};
