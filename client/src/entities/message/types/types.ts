export interface IMessage {
  created_at: string;
  from_user: boolean;
  id: string;
  text: string;
  liked: boolean | null;
  questions?: Array<string>;
  link?: string;
}

export interface IAnalyticsMessage {
  dislike: number;
  like: number;
}
