import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModalSlice, ModalData } from "../types/types";
import { EModalVariables } from "@/shared/lib/utils/modalVariables";

interface ModalPayload {
  type: EModalVariables;
  isOpen: boolean;
  data?: ModalData;
}

const initialState: IModalSlice = {
  selectType: null,
  isOpen: false,
  data: null,
};

export const modalSlice = createSlice({
  name: "modal-slice",
  initialState,
  selectors: {
    selectType: (state) => state.selectType,
    isOpen: (state) => state.isOpen,
    data: (state) => state.data,
  },
  reducers: (create) => ({
    setOpenModal: create.reducer(
      (state, { payload }: PayloadAction<ModalPayload>) => {
        state.isOpen = payload.isOpen;
        state.selectType = payload.type;
        state.data = payload.data;
      }
    ),
    toggleModal: create.reducer(
      (state, { payload }: PayloadAction<boolean>) => {
        state.isOpen = payload;
        state.selectType = null;
      }
    ),
  }),
});

export const modalActions = modalSlice.actions;
export const modalSelectors = modalSlice.selectors;
