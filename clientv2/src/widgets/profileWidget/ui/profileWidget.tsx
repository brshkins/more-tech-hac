import { BannerCard } from "@/widgets/bannerCard";
import { InfoCard } from "@/widgets/infoCard";
import { UserRound, Award } from "lucide-react";

export const ProfileWidget = () => {
  return (
    <section className="flex space-x-2">
      <BannerCard
        imageSrc="/images/Blue Holo (49).png"
        title="Нашли подходящую для тебя вакансию"
        highlight="«Дизайнер продукта»"
        buttonText="Пройти отбор"
        onClick={() => {}}
      />

      <div className="flex flex-col w-full space-y-2">
        <InfoCard
          icon={<UserRound className="w-5 h-5 text-gray-300" />}
          title={
            <>
              Параметры <br /> профиля
            </>
          }
          onClick={() => {}}
        />
        <InfoCard
          icon={<Award className="w-5 h-5 text-gray-300" />}
          title={
            <>
              Мои <br /> достижения
            </>
          }
          onClick={() => {}}
        />
      </div>
    </section>
  );
};
