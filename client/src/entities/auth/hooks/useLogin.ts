import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { TypeLoginSchema } from "../lib/schemes/loginSchema";
import { adminLogin, userLogin } from "../api/authService";
import { AuthResponse } from "../types/types";
import { ERouteNames } from "@/shared";
import { setAccessToken } from "@/entities/token";

export const LOGIN_QUERY = "login-query";

export const useLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [LOGIN_QUERY],
    mutationFn: (data: TypeLoginSchema) =>
      data.role === "admin" ? adminLogin(data) : userLogin(data),
    onSuccess: (data: AuthResponse) => {
      setAccessToken(crypto.randomUUID());
      if (data.is_admin) {
        return navigate(`/${ERouteNames.DASHBOARD_ADMIN_ROUTE}`);
      }

      if (!data.is_admin) {
        return navigate(`/${ERouteNames.DASHBOARD_ROUTE}`);
      }
    },
  });
};
