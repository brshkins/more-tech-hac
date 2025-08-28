import { EModalVariables } from "@/shared/lib/utils/modalVariables";

export type ModalData =
  | Date
  | string
  | number
  | null
  | undefined
  | Record<string, unknown>
  | unknown[];

export interface IModalSlice {
  isOpen: boolean;
  selectType: EModalVariables | null;
  data: ModalData;
}
