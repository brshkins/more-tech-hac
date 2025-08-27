import { ProfileCvDrawer } from "@/features/profile/ui/profileCvDrawer";
import { ProfileInfoDrawer } from "@/features/profile/ui/profileInfoDrawer";
import { VacancyFilterDrawer } from "@/features/vacancy/ui/vacancyFilterDrawer";
import { JSX } from "react";

export const enum EDrawerVariables {
  VACANCY_DRAWER = "vacancy-drawer",
  PROFILE_DRAWER = "profile-drawer",
  PROFILE_CV_DRAWER = "profile-cv-drawer",
}

export const drawerComponents: Record<EDrawerVariables, JSX.Element> = {
  [EDrawerVariables.VACANCY_DRAWER]: <VacancyFilterDrawer />,
  [EDrawerVariables.PROFILE_DRAWER]: <ProfileInfoDrawer />,
  [EDrawerVariables.PROFILE_CV_DRAWER]: <ProfileCvDrawer />,
};

export const getDrawerComponent = (type: EDrawerVariables): React.ReactNode => {
  return drawerComponents[type];
};
