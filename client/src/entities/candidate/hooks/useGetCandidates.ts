import { useQuery } from "@tanstack/react-query";
import { getCandidates } from "../api/candidateService";

export const CANDIDATES_QUERY_KEY = "candidates-query";

export const useGetCandidates = () => {
  return useQuery({
    queryKey: [CANDIDATES_QUERY_KEY],
    queryFn: getCandidates,
  });
};
