export type MessageType = "user" | "question" | "assistant" | "clarification";
export interface Message {
  id: string;
  text: string;
  from_user: boolean;
  created_at: string;
  type: MessageType;
  clarificationMessages?: Message[];
  questions?: string[];
}
