import { routes } from "@/pages/routes";
import { queryClient } from "@/shared/api/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "../store";
import { DrawerProvider } from "./drawerProvider";

export const Providers = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <DrawerProvider />
      <RouterProvider router={routes} />
    </Provider>
  </QueryClientProvider>
);
