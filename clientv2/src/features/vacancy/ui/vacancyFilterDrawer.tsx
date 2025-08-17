import { drawerSelectors } from "@/entities/drawer/model/store/drawerSlice";
import { EDrawerVariables } from "@/shared";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { Button } from "@/shared/ui";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/ui/drawer";
import { VacancyFilterContent } from "./vacancyFilterContent";
import { useRef } from "react";

export const VacancyFilterDrawer = () => {
  const contentRef = useRef<null | {
    applyFilters: () => void;
    resetFilters: () => void;
  }>(null);

  const isOpen = useAppSelector(drawerSelectors.isOpen);
  const type = useAppSelector(drawerSelectors.selectType);
  const { toggleDrawer } = useActions();

  const isDrawerOpen = isOpen && type === EDrawerVariables.VACANCY_DRAWER;

  const handleClose = () => {
    toggleDrawer(false);
  };

  const handleReset = () => {
    contentRef.current?.resetFilters();
    handleClose();
  };
  const handleApply = () => {
    contentRef.current?.applyFilters();
    handleClose();
  };

  return (
    <Drawer open={isDrawerOpen} onClose={handleClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle className="text-lg text-white font-semibold text-center">
              Фильтры вакансий
            </DrawerTitle>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto max-h-[56vh]">
            <VacancyFilterContent ref={contentRef} />
          </div>

          <div className="px-4 py-6 flex gap-3">
            <div className="w-full">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleReset}
              >
                Сбросить
              </Button>
            </div>

            <div className="w-full">
              <Button
                className="bg-blue-600 w-full hover:bg-blue-500"
                onClick={handleApply}
              >
                Применить
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
