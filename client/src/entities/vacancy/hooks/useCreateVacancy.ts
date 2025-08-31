import { useMutation } from "@tanstack/react-query";
import { createVacancy } from "../api/vacancyService";

export const useCreateVacancy = () => {
  return useMutation({
    mutationFn: createVacancy,
  });
};
