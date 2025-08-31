import { VacancyCreateForm } from "@/entities/vacancy/ui/vacancyCreateForm";
import { Image } from "@/shared/ui";
import { IconButton } from "@/shared/ui/button/iconButton";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManagementPage = () => {
  const navigate = useNavigate();

  const handleBackPage = () => navigate(-1);
  return (
    <div className="space-y-3">
      <div className="flex justify-start items-center">
        <IconButton
          ariaLabel="вернуться назад"
          onClick={handleBackPage}
          className="bg-neutral-900"
        >
          <ChevronLeft className="h-6 w-6 text-zinc-300" />
        </IconButton>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="shadow-xl space-y-4 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="relative"
          >
            <Image
              src="/images/vacancy_main.png"
              alt="vacancy-banner"
              className="rounded-3xl w-full"
            />
            <div className="absolute inset-0 flex flex-col justify-between p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-xl font-medium text-white">
                    Удобно создавайте вакансии
                  </h1>
                </div>
              </div>
            </div>
          </motion.div>
          <VacancyCreateForm />
        </div>
      </motion.div>
    </div>
  );
};

export default ManagementPage;
