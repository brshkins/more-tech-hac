import { IAnalyticsMessage, IMessage } from "../../types/types";

export interface IMessageSlice {
  messages: Array<IMessage>;
  isTyping: null | string;
  isLoadingRepeat: boolean;
  messageAnalytics: IAnalyticsMessage;
}
