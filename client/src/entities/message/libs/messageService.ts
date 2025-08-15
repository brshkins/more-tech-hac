import { axiosAuth } from "@/shared/api/baseQueryInstance";
import { IAnalyticsMessage, IMessage } from "../types/types";

class MessageService {
  private static instance: MessageService;

  public constructor() {}

  public static getInstance() {
    if (!MessageService.instance) {
      MessageService.instance = new MessageService();
    }

    return MessageService.instance;
  }

  public async getMessageHistory(): Promise<Array<IMessage>> {
    const { data } = await axiosAuth.get<Array<IMessage>>("/get_history");

    return data;
  }
  public async saveMessageInHistory({ message }: { message: IMessage }) {
    const { data } = await axiosAuth.post("/save_history", { ...message });

    return data;
  }
  public async deleteMessageHistory() {
    const { data } = await axiosAuth.delete("/delete_history");

    return data;
  }

  public async messageReaction({
    like,
    messageId,
  }: {
    like: null | boolean;
    messageId: string;
  }) {
    const { data } = await axiosAuth.put(
      `/islike/%!d(string=${messageId})?like=${like}`
    );
    return data;
  }

  public async getChatHistory() {
    const { data } = await axiosAuth.get("/finish");

    return data;
  }

  public async getChatAnalytics(): Promise<IAnalyticsMessage> {
    const { data } = await axiosAuth.get<IAnalyticsMessage>("/like-statistic");

    return data;
  }
}

export const {
  getMessageHistory,
  saveMessageInHistory,
  getChatHistory,
  getChatAnalytics,
  messageReaction,
  deleteMessageHistory,
} = MessageService.getInstance();
