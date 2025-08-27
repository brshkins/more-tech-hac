import { EDrawerVariables } from "@/shared";

export type DrawerData =
  | Date
  | string
  | number
  | null
  | undefined
  | Record<string, unknown>
  | unknown[];

export interface IDrawerSlice {
  isOpen: boolean;
  selectType: EDrawerVariables | null;
  data: DrawerData;
}
