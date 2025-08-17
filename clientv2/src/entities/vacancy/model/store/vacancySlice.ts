import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VacancySlice } from "../types/types";
import { VacancyFilter } from "../../types/types";

const initialState: VacancySlice = {
  vacancyFIlters: null,
};

export const vacancySlice = createSlice({
  name: "vacancy-slice",
  initialState,
  selectors: {
    vacancyFIlters: (state) => state.vacancyFIlters,
  },
  reducers: (create) => ({
    setVacancyFilters: create.reducer(
      (state, { payload }: PayloadAction<Partial<VacancyFilter>>) => {
        if (state.vacancyFIlters) {
          state.vacancyFIlters = {
            ...state.vacancyFIlters,
            ...payload,
          };
        } else {
          state.vacancyFIlters = payload;
        }
      }
    ),
    resetFilters: create.reducer((state) => {
      state.vacancyFIlters = null;
    }),
  }),
});

export const vacancyActions = vacancySlice.actions;
export const vacancySelectors = vacancySlice.selectors;
