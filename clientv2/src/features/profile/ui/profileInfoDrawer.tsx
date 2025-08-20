import { drawerSelectors } from "@/entities/drawer/model/store/drawerSlice";
import { EDrawerVariables } from "@/shared";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { Button } from "@/shared/ui";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/ui/drawer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ProfileFormSchema,
  TypeProfileFormSchema,
} from "../lib/schemes/profileInfoSchemes";
import { Form, FormField, FormItem, FormMessage } from "@/shared/ui/form/form";
import { CircleAlert, User, X } from "lucide-react";
import { FloatingLabelInput } from "@/shared/ui/input/floatingInputLabel";
import { cn } from "@/shared/lib/utils/twMerge";
import { UploadFileButton } from "@/features/files/ui/uploadFileButton";

const mockProfile = {
  id: "user-001",
  firstName: "Даниил",
  lastName: "Хатунцев",
  photoUrl: "/images/profile/mock-danya.png",
  createdAt: "16.11.2003",
};

export const ProfileInfoDrawer = () => {
  const isOpen = useAppSelector(drawerSelectors.isOpen);
  const type = useAppSelector(drawerSelectors.selectType);
  const { toggleDrawer } = useActions();

  const isDrawerOpen = isOpen && type === EDrawerVariables.PROFILE_DRAWER;

  const handleClose = () => {
    toggleDrawer(false);
  };

  const form = useForm<TypeProfileFormSchema>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      firstName: mockProfile.firstName,
      lastName: mockProfile.lastName,
      photo: undefined,
    },
  });

  const {
    formState: { errors },
  } = form;

  const onSubmit = (data: TypeProfileFormSchema) => {
    console.log("Сохранённые данные:", data);
    handleClose();
  };

  const handleReset = () => {
    form.reset();
  };
  console.log("object");
  return (
    <Drawer open={isDrawerOpen} onClose={handleClose}>
      <DrawerContent className="border border-zinc-800 bg-black text-white">
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle className="text-lg hidden text-white font-semibold text-start">
              Профиль
            </DrawerTitle>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto max-h-[56vh] p-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center flex-col justify-center space-y-4">
                        <div className="w-24 h-24 bg-neutral-900 rounded-xl flex items-center justify-center overflow-hidden">
                          {field.value ? (
                            <img
                              src={URL.createObjectURL(field.value)}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="h-10 w-10 text-gray-500" />
                          )}
                        </div>
                        <UploadFileButton
                          acceptedExtensions={["jpg", "jpeg", "png"]}
                          onFileChange={(file) => field.onChange(file)}
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FloatingLabelInput
                        {...field}
                        label="Имя"
                        className={cn(
                          "py-1.5 bg-neutral-900 rounded-xl shadow-sm border-neutral-900",
                          errors.firstName && "border-red-700"
                        )}
                      />
                      {field.value && (
                        <button
                          className="absolute right-4 top-4.5 text-zinc-700 cursor-pointer"
                          onClick={() => field.onChange("")}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                      {errors.firstName && (
                        <button className="absolute right-4 top-4.5 text-red-800 cursor-pointer">
                          <CircleAlert className="w-4 h-4" />
                        </button>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FloatingLabelInput
                        {...field}
                        label="Фамилия"
                        className={cn(
                          "py-1.5 bg-neutral-900 rounded-xl shadow-sm border-neutral-900",
                          errors.lastName && "border-red-700"
                        )}
                      />
                      {field.value && (
                        <button
                          className="absolute right-4 top-4.5 text-zinc-700 cursor-pointer"
                          onClick={() => field.onChange("")}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                      {errors.lastName && (
                        <button className="absolute right-4 top-4.5 text-red-800 cursor-pointer">
                          <CircleAlert className="w-4 h-4" />
                        </button>
                      )}
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>

          <div className="px-4 py-6 flex gap-3">
            <div className="w-full">
              <Button
                variant="outline"
                className="w-full border-zinc-600 text-gray-400 hover:text-white"
                onClick={handleReset}
              >
                Сбросить
              </Button>
            </div>
            <div className="w-full">
              <Button
                className="bg-blue-600 w-full hover:bg-blue-500"
                onClick={form.handleSubmit(onSubmit)}
                disabled={!form.formState.isValid}
              >
                Сохранить
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
