import { useMutation, useQuery } from "@tanstack/react-query";
import { getCurrentProfile, updateCurrentProfile } from "../api/profileService";
import { queryClient } from "@/shared/api/queryClient";

export const CURRENT_PROFILE_QUERY = "current-profile";

export const useCurrentProfile = () => {
  return useQuery({
    queryKey: [CURRENT_PROFILE_QUERY],
    queryFn: getCurrentProfile,
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateCurrentProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CURRENT_PROFILE_QUERY] });
    },
  });
};
