import { z } from "zod";

export const RegisterSchema = z
  .object({
    email: z
      .string({
        message: "Email обязателен",
      })
      .email({
        message: "Введите корректный email-адрес",
      })
      .max(254, {
        message: "Email не должен превышать 254 символа",
      })
      .trim(),
    password: z
      .string({
        message: "Пароль обязателен",
      })
      .min(8, {
        message: "Пароль должен содержать минимум 8 символов",
      })
      .max(128, {
        message: "Пароль не должен превышать 128 символов",
      })
      .trim(),
    confirmPassword: z
      .string({
        message: "Подтверждение пароля обязательно",
      })
      .min(8, {
        message: "Подтверждение должно содержать минимум 8 символов",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type TypeRegisterSchema = z.infer<typeof RegisterSchema>;
