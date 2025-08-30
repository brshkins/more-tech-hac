import { drawerSelectors } from "@/entities/drawer/model/store/drawerSlice";
import { EDrawerVariables } from "@/shared";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { Drawer, DrawerContent, DrawerTitle } from "@/shared/ui/drawer";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

export const CandidateFilterDrawer = () => {
  const isOpen = useAppSelector(drawerSelectors.isOpen);
  const type = useAppSelector(drawerSelectors.selectType);
  const { children } = useAppSelector(drawerSelectors.data) as {
    children: ReactNode;
  };

  const { toggleDrawer } = useActions();

  const isDrawerOpen =
    isOpen && type === EDrawerVariables.CANDIDATE_FILTER_DRAWER;

  const handleClose = () => {
    toggleDrawer(false);
  };

  return (
    <Drawer
      direction={window.innerWidth > 640 ? "right" : "bottom"}
      open={isDrawerOpen}
      onClose={handleClose}
    >
      <AnimatePresence>
        <DrawerContent className="border border-zinc-800 bg-neutral-900 text-zinc-300 max-w-md sm:max-w-full">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mx-auto w-full max-w-md px-4 py-6"
          >
            <div className="flex justify-between items-center mb-4">
              <DrawerTitle className="text-xl text-zinc-300 font-semibold">
                Фильтры кандидатов
              </DrawerTitle>
            </div>
            {children}
          </motion.div>
        </DrawerContent>
      </AnimatePresence>
    </Drawer>
  );
};
