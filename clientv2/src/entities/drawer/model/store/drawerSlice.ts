import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DrawerData, IDrawerSlice } from "../types/types";
import { EDrawerVariables } from "@/shared";

interface DrawerPayload {
  type: EDrawerVariables;
  isOpen: boolean;
  data?: DrawerData;
}

const initialState: IDrawerSlice = {
  selectType: null,
  isOpen: false,
  data: null,
};

export const drawerSlice = createSlice({
  name: "drawer-slice",
  initialState,
  selectors: {
    selectType: (state) => state.selectType,
    isOpen: (state) => state.isOpen,
    data: (state) => state.data,
  },
  reducers: (create) => ({
    setOpenDrawer: create.reducer(
      (state, { payload }: PayloadAction<DrawerPayload>) => {
        state.isOpen = payload.isOpen;
        state.selectType = payload.type;
        state.data = payload.data;
      }
    ),
    toggleDrawer: create.reducer(
      (state, { payload }: PayloadAction<boolean>) => {
        state.isOpen = payload;
        state.selectType = null;
      }
    ),
  }),
});

export const drawerActions = drawerSlice.actions;
export const drawerSelectors = drawerSlice.selectors;
