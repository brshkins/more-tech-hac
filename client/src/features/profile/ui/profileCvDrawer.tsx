import { drawerSelectors } from "@/entities/drawer/model/store/drawerSlice";
import { UploadFileButton } from "@/features/files/ui/uploadFileButton";
import { EDrawerVariables } from "@/shared";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { motion } from "framer-motion";

import { Drawer, DrawerContent, DrawerTitle } from "@/shared/ui/drawer";
import { FileTextIcon } from "lucide-react";

export const ProfileCvDrawer = () => {
  const isOpen = useAppSelector(drawerSelectors.isOpen);
  const type = useAppSelector(drawerSelectors.selectType);
  const { onFileChange } = useAppSelector(drawerSelectors.data) as {
    onFileChange: (file: File | null) => void;
  };
  const { toggleDrawer } = useActions();

  const isDrawerOpen = isOpen && type === EDrawerVariables.PROFILE_CV_DRAWER;

  const handleClose = () => {
    toggleDrawer(false);
  };

  const handleUploadFile = (file: File | null) => {
    onFileChange(file);
    handleClose();
  };

  return (
    <Drawer open={isDrawerOpen} onClose={handleClose}>
      <DrawerContent className="border border-zinc-800 bg-black text-white">
        <div className="mx-auto w-full max-w-md px-4 pb-2">
          <DrawerTitle className="hidden text-xl text-white font-semibold text-center">
            CV
          </DrawerTitle>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex w-full flex-col items-center gap-4 mt-2"
          >
            <div className="rounded-2xl p-6 w-full flex flex-col items-center border-zinc-700 shadow-md">
              <FileTextIcon className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-zinc-500 text-sm text-center mb-2">
                Загрузите ваш CV в виде PDF файла
              </p>
              <div className="w-full">
                <UploadFileButton
                  acceptedExtensions={["pdf"]}
                  onFileChange={handleUploadFile}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Максимальный размер файла: 5MB
              </p>
            </div>
          </motion.div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
