import { useMutation } from "@tanstack/react-query";
import { userRegister } from "../api/authService";
import { useNavigate } from "react-router-dom";

export const REGISTER_QUERY = "register-query";

export const useRegisterMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [REGISTER_QUERY],
    mutationFn: userRegister,
    onSuccess: () => navigate(`/`),
  });
};
