import { CandidateDrawer } from "@/features/candidate/ui/candidateDrawer";
import { CandidateFilterDrawer } from "@/features/candidate/ui/candidateFilterDrawer";
import { ProfileCvDrawer } from "@/features/profile/ui/profileCvDrawer";
import { ProfileInfoDrawer } from "@/features/profile/ui/profileInfoDrawer";
import { VacancyFilterDrawer } from "@/features/vacancy/ui/vacancyFilterDrawer";
import { JSX } from "react";

export const enum EDrawerVariables {
  VACANCY_DRAWER = "vacancy-drawer",
  PROFILE_DRAWER = "profile-drawer",
  PROFILE_CV_DRAWER = "profile-cv-drawer",
  CANDIDATE_DRAWER = "candidate-drawer",
  CANDIDATE_FILTER_DRAWER = "candidate-filter-drawer",
}

export const drawerComponents: Record<EDrawerVariables, JSX.Element> = {
  [EDrawerVariables.VACANCY_DRAWER]: <VacancyFilterDrawer />,
  [EDrawerVariables.PROFILE_DRAWER]: <ProfileInfoDrawer />,
  [EDrawerVariables.PROFILE_CV_DRAWER]: <ProfileCvDrawer />,
  [EDrawerVariables.CANDIDATE_DRAWER]: <CandidateDrawer />,
  [EDrawerVariables.CANDIDATE_FILTER_DRAWER]: <CandidateFilterDrawer />,
};

export const getDrawerComponent = (type: EDrawerVariables): React.ReactNode => {
  return drawerComponents[type];
};
