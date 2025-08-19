import { z } from "zod";

export const ProfileFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Имя должно содержать минимум 2 символа" })
    .max(50, { message: "Имя не должно превышать 50 символов" }),
  lastName: z
    .string()
    .min(2, { message: "Фамилия должна содержать минимум 2 символа" })
    .max(50, { message: "Фамилия не должна превышать 50 символов" }),
  photo: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || ["image/jpeg", "image/png"].includes(file.type),
      {
        message: "Разрешены только изображения (JPEG, PNG).",
      }
    )
    .refine((file) => !file || file.size <= 2 * 1024 * 1024, {
      message: "Максимальный размер изображения: 2MB.",
    }),
});

export type TypeProfileFormSchema = z.infer<typeof ProfileFormSchema>;
