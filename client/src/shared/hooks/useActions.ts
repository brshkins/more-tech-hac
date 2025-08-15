import { messageActions } from "@/entities/message/models/store/messageSlice";
import { socketActions } from "@/entities/socket/model/store/socketSlice";
import { viewerActions } from "@/entities/viewer/models/store/viewerSlice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(
    {
      ...messageActions,
      ...socketActions,
      ...viewerActions,
    },
    dispatch
  );
};
