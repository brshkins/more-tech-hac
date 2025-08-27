import { VacancyContent } from "@/features/vacancy/ui/vacancyContent";
import { ProfileWidget } from "@/widgets/profileWidget";

const DashboardPage = () => {
  return (
    <div className="text-white space-y-8 pb-4">
      <ProfileWidget />
      <VacancyContent />
    </div>
  );
};

export default DashboardPage;
