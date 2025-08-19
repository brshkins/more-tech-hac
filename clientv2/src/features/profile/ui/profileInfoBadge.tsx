import { Image } from "@/shared/ui";
import { Pen } from "lucide-react";

interface IProfileInfoBadgeProps {
  onClick: () => void;
}

export const ProfileInfoBadge = ({ onClick }: IProfileInfoBadgeProps) => {
  return (
    <div className="bg-neutral-900 rounded-3xl p-4 flex justify-between items-start h-[124px]">
      <div className="flex space-x-4">
        <Image
          width={96}
          height={96}
          alt="avatar"
          src="/images/mock-danya.png"
          className="rounded-xl"
        />
        <div className="flex flex-col justify-between">
          <p className="font-medium text-xl">
            Даниил <br />
            Хатунцев
          </p>
          <p className="text-gray-400 text-sm">16.11.2003</p>
        </div>
      </div>
      <button
        className="text-gray-400 hover:text-white border-zinc-600 border cursor-pointer bg-zinc-800 flex items-center rounded-full p-2"
        onClick={onClick}
      >
        <Pen className="h-4 w-4 ml-0.5" />
      </button>
    </div>
  );
};
