import { drawerSelectors } from "@/entities/drawer/model/store/drawerSlice";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { getDrawerComponent } from "../utils";

export const DrawerProvider = () => {
  const selectType = useAppSelector(drawerSelectors.selectType);
  if (!selectType) return null;

  return getDrawerComponent(selectType);
};
