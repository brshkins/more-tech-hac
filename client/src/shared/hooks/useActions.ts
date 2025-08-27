import { drawerActions } from "@/entities/drawer/model/store/drawerSlice";
import { socketActions } from "@/entities/socket/model/store/socketSlice";
import { vacancyActions } from "@/entities/vacancy/model/store/vacancySlice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(
    {
      ...drawerActions,
      ...vacancyActions,
      ...socketActions,
    },
    dispatch
  );
};
