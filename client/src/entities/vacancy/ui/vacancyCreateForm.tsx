import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { FormField, FormItem } from "@/shared/ui/form/form";
import { PlusCircle, X, CircleAlert, Plus } from "lucide-react";
import { FloatingLabelInput } from "@/shared/ui/input/floatingInputLabel";
import { cn } from "@/shared/lib/utils/twMerge";
import {
  VacancyFormData,
  VacancyFormSchema,
} from "../lib/schemes/createFormSchema";

export const VacancyCreateForm = () => {
  const form = useForm<VacancyFormData>({
    resolver: zodResolver(VacancyFormSchema),
    defaultValues: {
      company: { name: "", iconUrl: "", industry: "", siteUrl: "" },
      region: "",
      post: "",
      salary: "",
      tags: [],
      responsibilities: { title: "Обязанности", description: [""] },
      requirements: { title: "Требования", description: [""] },
    },
  });
  const [currentTag, setCurrentTag] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = form;
  const tags = watch("tags");

  const addTag = () => {
    if (currentTag.trim()) {
      setValue("tags", [...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (index: number) => {
    setValue(
      "tags",
      tags.filter((_, i) => i !== index)
    );
  };

  const addDescription = (section: "responsibilities" | "requirements") => {
    const currentDescriptions = watch(`${section}.description`);
    setValue(`${section}.description`, [...currentDescriptions, ""]);
  };

  const removeDescription = (
    section: "responsibilities" | "requirements",
    index: number
  ) => {
    const currentDescriptions = watch(`${section}.description`);
    setValue(
      `${section}.description`,
      currentDescriptions.filter((_, i) => i !== index)
    );
  };

  const onSubmit = (data: VacancyFormData) => {
    console.log("Form submitted:", data);
    form.reset();
  };

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-zinc-300">
              Информация о компании
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="company.name"
                render={({ field }) => (
                  <FormItem className="relative gap-1">
                    <FloatingLabelInput
                      {...field}
                      label="Название компании"
                      className={cn(
                        "py-1.5 text-white bg-neutral-900 rounded-xl shadow-sm border-neutral-900",
                        errors.company?.name && "border-red-700"
                      )}
                    />
                    {errors.company?.name && (
                      <span className="text-red-800 text-xs px-3">
                        {errors.company.name.message}
                      </span>
                    )}
                    {field.value && !errors.company?.name && (
                      <button
                        className="absolute right-4 top-4.5 text-blue-800 cursor-pointer"
                        onClick={() => field.onChange("")}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    {errors.company?.name && (
                      <button className="absolute right-4 top-4.5 text-red-800 cursor-pointer">
                        <CircleAlert className="w-4 h-4" />
                      </button>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="company.iconUrl"
                render={({ field }) => (
                  <FormItem className="relative gap-1">
                    <FloatingLabelInput
                      {...field}
                      label="Иконка"
                      className={cn(
                        "py-1.5 text-white bg-neutral-900 rounded-xl shadow-sm border-neutral-900",
                        errors.company?.iconUrl && "border-red-700"
                      )}
                    />
                    {errors.company?.iconUrl && (
                      <span className="text-red-800 text-xs px-3">
                        {errors.company.iconUrl.message}
                      </span>
                    )}
                    {field.value && !errors.company?.iconUrl && (
                      <button
                        className="absolute right-4 top-4.5 text-blue-800 cursor-pointer"
                        onClick={() => field.onChange("")}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    {errors.company?.iconUrl && (
                      <button className="absolute right-4 top-4.5 text-red-800 cursor-pointer">
                        <CircleAlert className="w-4 h-4" />
                      </button>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="company.industry"
                render={({ field }) => (
                  <FormItem className="relative gap-1">
                    <FloatingLabelInput
                      {...field}
                      label="Индустрия"
                      className={cn(
                        "py-1.5 text-white bg-neutral-900 rounded-xl shadow-sm border-neutral-900",
                        errors.company?.industry && "border-red-700"
                      )}
                    />
                    {errors.company?.industry && (
                      <span className="text-red-800 text-xs px-3">
                        {errors.company.industry.message}
                      </span>
                    )}
                    {field.value && !errors.company?.industry && (
                      <button
                        className="absolute right-4 top-4.5 text-blue-800 cursor-pointer"
                        onClick={() => field.onChange("")}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    {errors.company?.industry && (
                      <button className="absolute right-4 top-4.5 text-red-800 cursor-pointer">
                        <CircleAlert className="w-4 h-4" />
                      </button>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="company.siteUrl"
                render={({ field }) => (
                  <FormItem className="relative gap-1 md:col-span-2">
                    <FloatingLabelInput
                      {...field}
                      label="Ссылка на сайт"
                      className={cn(
                        "py-1.5 text-white bg-neutral-900 rounded-xl shadow-sm border-neutral-900",
                        errors.company?.siteUrl && "border-red-700"
                      )}
                    />
                    {errors.company?.siteUrl && (
                      <span className="text-red-800 text-xs px-3">
                        {errors.company.siteUrl.message}
                      </span>
                    )}
                    {field.value && !errors.company?.siteUrl && (
                      <button
                        className="absolute right-4 top-4.5 text-blue-800 cursor-pointer"
                        onClick={() => field.onChange("")}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    {errors.company?.siteUrl && (
                      <button className="absolute right-4 top-4.5 text-red-800 cursor-pointer">
                        <CircleAlert className="w-4 h-4" />
                      </button>
                    )}
                  </FormItem>
                )}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-zinc-300">
              Информация о вакансии
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="post"
                render={({ field }) => (
                  <FormItem className="relative gap-1">
                    <FloatingLabelInput
                      {...field}
                      label="Название"
                      className={cn(
                        "py-1.5 text-white bg-neutral-900 rounded-xl shadow-sm border-neutral-900",
                        errors.post && "border-red-700"
                      )}
                    />
                    {errors.post && (
                      <span className="text-red-800 text-xs px-3">
                        {errors.post.message}
                      </span>
                    )}
                    {field.value && !errors.post && (
                      <button
                        className="absolute right-4 top-4.5 text-blue-800 cursor-pointer"
                        onClick={() => field.onChange("")}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    {errors.post && (
                      <button className="absolute right-4 top-4.5 text-red-800 cursor-pointer">
                        <CircleAlert className="w-4 h-4" />
                      </button>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="region"
                render={({ field }) => (
                  <FormItem className="relative gap-1">
                    <FloatingLabelInput
                      {...field}
                      label="Регион"
                      className={cn(
                        "py-1.5 text-white bg-neutral-900 rounded-xl shadow-sm border-neutral-900",
                        errors.region && "border-red-700"
                      )}
                    />
                    {errors.region && (
                      <span className="text-red-800 text-xs px-3">
                        {errors.region.message}
                      </span>
                    )}
                    {field.value && !errors.region && (
                      <button
                        className="absolute right-4 top-4.5 text-blue-800 cursor-pointer"
                        onClick={() => field.onChange("")}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    {errors.region && (
                      <button className="absolute right-4 top-4.5 text-red-800 cursor-pointer">
                        <CircleAlert className="w-4 h-4" />
                      </button>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="salary"
                render={({ field }) => (
                  <FormItem className="relative gap-1 md:col-span-2">
                    <FloatingLabelInput
                      {...field}
                      label="Зарплата"
                      className={cn(
                        "py-1.5 text-white bg-neutral-900 rounded-xl shadow-sm border-neutral-900",
                        errors.salary && "border-red-700"
                      )}
                    />
                    {errors.salary && (
                      <span className="text-red-800 text-xs px-3">
                        {errors.salary.message}
                      </span>
                    )}
                    {field.value && !errors.salary && (
                      <button
                        className="absolute right-4 top-4.5 text-blue-800 cursor-pointer"
                        onClick={() => field.onChange("")}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    {errors.salary && (
                      <button className="absolute right-4 top-4.5 text-red-800 cursor-pointer">
                        <CircleAlert className="w-4 h-4" />
                      </button>
                    )}
                  </FormItem>
                )}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-zinc-300">
              Ключевые слова
            </h3>
            <div className="flex gap-2">
              <Input
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="Добавить ключевое слово"
                className="py-6 text-white bg-neutral-900 placeholder:text-zinc-400 rounded-xl shadow-sm border-neutral-900"
                onKeyPress={(e) => e.key === "Enter" && addTag()}
              />
              <Button type="button" onClick={addTag}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {errors.tags && (
              <p className="text-red-800 text-sm">{errors.tags.message}</p>
            )}
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {tags.map((tag, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
                  >
                    {tag}
                    <X
                      className="w-4 h-4 ml-2 cursor-pointer"
                      onClick={() => removeTag(index)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-zinc-300">Обязанности</h3>

            {watch("responsibilities.description").map((_, index) => (
              <div key={index} className="flex gap-2">
                <FormField
                  control={control}
                  name={`responsibilities.description.${index}`}
                  render={({ field }) => (
                    <FormItem className="relative gap-1 flex-1">
                      <textarea
                        {...field}
                        placeholder="Введите обязанность"
                        className={cn(
                          "p-3 text-white resize-none outline-none text-sm placeholder:text-sm bg-neutral-900 rounded-xl shadow-sm border-neutral-900",
                          errors.responsibilities?.description?.[index] &&
                            "border-red-700"
                        )}
                      />
                      {errors.responsibilities?.description?.[index] && (
                        <span className="text-red-800 text-xs px-3">
                          {errors.responsibilities.description[index].message}
                        </span>
                      )}
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  onClick={() => removeDescription("responsibilities", index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => addDescription("responsibilities")}
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Добавить обязанности
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-zinc-300">Требования</h3>

            {watch("requirements.description").map((_, index) => (
              <div key={index} className="flex gap-2">
                <FormField
                  control={control}
                  name={`requirements.description.${index}`}
                  render={({ field }) => (
                    <FormItem className="relative gap-1 flex-1">
                      <textarea
                        {...field}
                        placeholder="Введите требования"
                        className={cn(
                          "p-3 resize-none text-white bg-neutral-900 text-sm placeholder:text-sm outline-none rounded-xl shadow-sm border-neutral-900",
                          errors.requirements?.description?.[index] &&
                            "border-red-700"
                        )}
                      />
                      {errors.requirements?.description?.[index] && (
                        <span className="text-red-800 text-xs px-3">
                          {errors.requirements.description[index].message}
                        </span>
                      )}
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  onClick={() => removeDescription("requirements", index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => addDescription("requirements")}
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Добавить требования
            </Button>
          </motion.div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Создать вакансию
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
