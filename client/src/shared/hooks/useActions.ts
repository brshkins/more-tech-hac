import { drawerActions } from "@/entities/drawer/model/store/drawerSlice";
import { modalActions } from "@/entities/modal/model/store/modalSlice";
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
      ...modalActions,
    },
    dispatch
  );
};
