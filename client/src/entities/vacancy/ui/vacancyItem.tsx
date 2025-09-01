import { ChevronRight, Heart } from "lucide-react";
import { Vacancy } from "../types/types";
import { cn } from "@/shared/lib/utils/twMerge";
import { Image } from "@/shared/ui";
import { TagGroup } from "@/shared/ui/badge/ui/badgeGroup";
import { IconButton } from "@/shared/ui/button/iconButton";

interface VacancyItemProps {
  vacancy: Vacancy;
  onNavigate: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const VacancyItem = ({ vacancy, onNavigate }: VacancyItemProps) => {
  return (
    <div className="bg-neutral-900 text-white rounded-3xl p-4 flex flex-col gap-3 shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={vacancy.company.icon_url}
            alt={vacancy.company.name}
            width={20}
            height={20}
            className="rounded-md object-cover"
          />
          <p className="font-semibold text-sm text-zinc-500">
            {vacancy.company.name}
          </p>
        </div>
        <button>
          <Heart
            className={cn(
              "w-5 h-5",
              vacancy.isFavorite
                ? "fill-[#3361EC] text-[#3361EC]"
                : "text-gray-400"
            )}
          />
        </button>
      </div>

      <div>
        <h3 className="text-lg font-medium">{vacancy.post}</h3>
        <p className="text-zinc-500 font-medium">{vacancy.salary}</p>
      </div>

      <section className="flex justify-between items-center">
        <TagGroup tags={vacancy.tags} variant="solidDark" size="sm" />

        <div className="flex">
          <IconButton
            value={vacancy.id}
            ariaLabel="Перейти к вакансии"
            className="bg-zinc-800 hover:bg-neutral-700"
            onClick={onNavigate}
          >
            <ChevronRight className="w-5 h-5 text-zinc-500" />
          </IconButton>
        </div>
      </section>
    </div>
  );
};
