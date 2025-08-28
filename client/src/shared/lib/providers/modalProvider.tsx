import { modalSelectors } from "@/entities/modal/model/store/modalSlice";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { getModalComponent } from "../utils/modalVariables";

const ModalProvider = () => {
  const selectType = useAppSelector(modalSelectors.selectType);
  if (!selectType) return null;

  return getModalComponent(selectType);
};

export default ModalProvider;
