import z from "zod";

export const VacancyFormSchema = z.object({
  company: z.object({
    name: z.string().min(1, "Company name is required"),
    iconUrl: z.string().url("Invalid URL"),
    industry: z.string().min(1, "Industry is required"),
    siteUrl: z.string().url("Invalid URL"),
  }),
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
