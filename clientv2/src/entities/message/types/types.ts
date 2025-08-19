export type MessageType = "assistant" | "user" | "system" | "question";

export interface Message {
  id: string;
  text: string;
  created_at: string;
  from_user: boolean;
  type?: MessageType;
  detail?: string;
}
