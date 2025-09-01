import z from "zod";

export const VacancyFormSchema = z.object({
  region: z.string().min(1, "Region is required"),
  post: z.string().min(1, "Job title is required"),
  salary: z.string().min(1, "Salary is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  responsibilities: z.object({
    title: z.string().min(1, "Responsibilities title is required").optional(),
    description: z.array(z.string().min(1, "Description cannot be empty")),
  }),
  requirements: z.object({
    title: z.string().min(1, "Requirements title is required").optional(),
    description: z.array(z.string().min(1, "Description cannot be empty")),
  }),
});

export type VacancyFormData = z.infer<typeof VacancyFormSchema>;
