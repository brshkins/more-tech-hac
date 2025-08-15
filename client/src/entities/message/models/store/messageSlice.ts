import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAnalyticsMessage, IMessage } from "../../types/types";
import { rootReducer } from "@/shared/model/store";
import { IMessageSlice } from "../types/types";

const initialState: IMessageSlice = {
  messages: [],
  isTyping: null,
  isLoadingRepeat: false,
  messageAnalytics: { dislike: 0, like: 0 },
};

export const messageSlice = createSlice({
  name: "message-slice",
  initialState,
  selectors: {
    messages: (state) => state.messages,
    isTyping: (state) => state.isTyping,
    isLoadingRepeat: (state) => state.isLoadingRepeat,
    messageAnalytics: (state) => state.messageAnalytics,
  },
  reducers: (create) => ({
    setNewMessage: create.reducer(
      (state, { payload }: PayloadAction<IMessage>) => {
        if (!payload?.id || !payload.text) return;

        const messageIndex = state.messages.findIndex(
          (message) => message.id === payload.id
        );

        if (messageIndex !== -1) {
          const updatedMessages = [...state.messages];
          const existingMessage = updatedMessages[messageIndex];

          updatedMessages[messageIndex] = {
            ...existingMessage,
            text: `${existingMessage.text}${payload.text}`.trim(),
          };

          state.messages = updatedMessages;
        } else {
          state.messages = [...state.messages, payload];
        }
      }
    ),
    setAnalytics: create.reducer(
      (state, { payload }: PayloadAction<IAnalyticsMessage>) => {
        state.messageAnalytics = payload;
      }
    ),
    resetMessage: create.reducer((state) => {
      state.messages = [];
    }),
    setChatMessages: create.reducer(
      (state, { payload }: PayloadAction<Array<IMessage>>) => {
        state.messages = payload;
      }
    ),
    setIsLoadingRepeat: create.reducer(
      (state, { payload }: PayloadAction<boolean>) => {
        state.isLoadingRepeat = payload;
      }
    ),
    toggleReaction: create.reducer(
      (
        state,
        { payload }: PayloadAction<{ id: string; liked: boolean | null }>
      ) => {
        const messageIndex = state.messages.findIndex(
          (message) => message.id === payload.id
        );

        if (messageIndex !== -1) {
          const updatedMessages = [...state.messages];
          const existingMessage = updatedMessages[messageIndex];
          const previousReaction = existingMessage.liked;

          updatedMessages[messageIndex] = {
            ...existingMessage,
            liked: payload.liked,
          };

          if (previousReaction === true) {
            state.messageAnalytics.like -= 1;
          } else if (previousReaction === false) {
            state.messageAnalytics.dislike -= 1;
          }

          if (payload.liked === true) {
            state.messageAnalytics.like += 1;
          } else if (payload.liked === false) {
            state.messageAnalytics.dislike += 1;
          }

          state.messages = updatedMessages;
        }
      }
    ),
    setIsTyping: create.reducer((state, { payload }: PayloadAction<string>) => {
      state.isTyping = payload;
    }),
  }),
}).injectInto(rootReducer);

export const messageActions = messageSlice.actions;
export const messageSelectors = messageSlice.selectors;
