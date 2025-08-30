import { useForm } from "react-hook-form";
import { LoginSchema, TypeLoginSchema } from "../lib/schemes/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "@/shared/ui/form/form";
import { FloatingLabelInput } from "@/shared/ui/input/floatingInputLabel";
import { cn } from "@/shared/lib/utils/twMerge";
import { CircleAlert, X } from "lucide-react";
import { Button } from "@/shared/ui";
import { Link, useNavigate } from "react-router-dom";
import { ERouteNames } from "@/shared";
import clsx from "clsx";

export const LoginForm = () => {
  const navigate = useNavigate();

  const form = useForm<TypeLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const onSubmit = (data: TypeLoginSchema) => {
    reset();
    if (data.role === "admin") {
      navigate(`/${ERouteNames.DASHBOARD_ADMIN_ROUTE}`);
      return;
    }
    if (data.role === "user") {
      navigate(`/${ERouteNames.DASHBOARD_ROUTE}`);
      return;
    }
  };
  return (
    <div className="space-y-2 w-full flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 flex flex-col w-full h-full justify-between max-w-xs"
        >
          <section className="space-y-3">
            <h2 className="font-medium text-white text-lg text-center">
              C возвращением!
            </h2>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative gap-1">
                  <FloatingLabelInput
                    {...field}
                    label="Почта"
                    className={cn(
                      "py-1.5 text-white bg-neutral-900 rounded-xl shadow-sm border-neutral-900",
                      errors.email && "border-red-700"
                    )}
                  />
                  {errors.email && (
                    <span className="text-red-800 text-xs px-3">
                      {errors.email.message}
                    </span>
                  )}
                  {field.value && !errors.email && (
                    <button
                      className="absolute right-4 top-4.5 text-blue-800 cursor-pointer"
                      onClick={() => field.onChange("")}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  {errors.email && (
                    <button className="absolute right-4 top-4.5 text-red-800 cursor-pointer">
                      <CircleAlert className="w-4 h-4" />
                    </button>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative gap-1">
                  <FloatingLabelInput
                    {...field}
                    label="Пароль"
                    type="password"
                    className={cn(
                      "py-1.5 text-white bg-neutral-900 rounded-xl shadow-sm border-neutral-900",
                      errors.password && "border-red-700"
                    )}
                  />
                  {errors.password && (
                    <span className="text-red-800 text-xs px-3">
                      {errors.password.message}
                    </span>
                  )}
                  {field.value && !errors.password && (
                    <button
                      className="absolute right-4 top-4.5 text-blue-800 cursor-pointer"
                      onClick={() => field.onChange("")}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  {errors.password && (
                    <button className="absolute right-4 top-4.5 text-red-800 cursor-pointer">
                      <CircleAlert className="w-4 h-4" />
                    </button>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="flex">
                  <div className="w-full">
                    <Button
                      variant={"outline"}
                      type="button"
                      className={clsx(
                        "rounded-lg w-full border bg-neutral-900 text-zinc-300 border-neutral-900",
                        field.value === "user" &&
                          "text-blue-700 border border-blue-700 hover:text-blue-800"
                      )}
                      onClick={() => field.onChange("user")}
                    >
                      Я – Пользователь
                    </Button>
                  </div>

                  <div className="w-full">
                    <Button
                      variant={"outline"}
                      type="button"
                      className={clsx(
                        "rounded-lg w-full border bg-neutral-900 text-zinc-300 border-neutral-900",
                        field.value === "admin" &&
                          "text-pink-700 border border-pink-700 hover:text-pink-800"
                      )}
                      onClick={() => field.onChange("admin")}
                    >
                      Я – Админ
                    </Button>
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant={"outline"}
              className="px-6 py-5 w-full"
            >
              Войти
            </Button>
          </section>
          <p className="text-white text-center text-sm">
            У меня нет аккаунта,{" "}
            <Link
              to={`/${ERouteNames.AUTH_ROUTE}/${ERouteNames.REGISTER_ROUTE}`}
              className="text-blue-600 cursor-pointer"
            >
              зарегестрироваться
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};
