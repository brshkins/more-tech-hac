import { VacancyFilterDrawer } from "@/features/vacancy/ui/vacancyFilterDrawer";
import { JSX } from "react";

export const enum EDrawerVariables {
  VACANCY_DRAWER = "vacancy-drawer",
}

export const drawerComponents: Record<EDrawerVariables, JSX.Element> = {
  [EDrawerVariables.VACANCY_DRAWER]: <VacancyFilterDrawer />,
};

export const getDrawerComponent = (type: EDrawerVariables): React.ReactNode => {
  return drawerComponents[type];
};
