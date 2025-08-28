import { drawerSlice } from "@/entities/drawer/model/store/drawerSlice";
import { modalSlice } from "@/entities/modal/model/store/modalSlice";
import { socketSlice } from "@/entities/socket/model/store/socketSlice";
import { vacancySlice } from "@/entities/vacancy/model/store/vacancySlice";
import {
  combineSlices,
  configureStore,
  ThunkAction,
  UnknownAction,
} from "@reduxjs/toolkit";

export const rootReducer = combineSlices(
  drawerSlice,
  vacancySlice,
  socketSlice,
  modalSlice
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<R = void> = ThunkAction<
  R,
  RootState,
  unknown,
  UnknownAction
>;
