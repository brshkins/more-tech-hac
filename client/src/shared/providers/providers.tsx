"use client";

import React, { FC, PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "../model/store";
import SocketProvider from "./socketProvider";
import ModalProvider from "./modalProvider";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      <SocketProvider>
        <ModalProvider />
        {children}
      </SocketProvider>
    </Provider>
  );
};
