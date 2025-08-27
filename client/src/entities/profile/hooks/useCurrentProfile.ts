import { useQuery } from "@tanstack/react-query";
import { getCurrentProfile } from "../api/profileService";

export const CURRENT_PROFILE_QUERY = "current-profile";

export const useCurrentProfile = () => {
  return useQuery({
    queryKey: [CURRENT_PROFILE_QUERY],
    queryFn: getCurrentProfile,
  });
};
