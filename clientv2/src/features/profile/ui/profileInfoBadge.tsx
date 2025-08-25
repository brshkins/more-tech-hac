import { Profile } from "@/entities/profile/types/types";
import { Image } from "@/shared/ui";
import { Pen, UserRound } from "lucide-react";

interface IProfileInfoBadgeProps {
  onClick: () => void;
  currentProfile: Profile;
}

export const ProfileInfoBadge = ({
  currentProfile,
  onClick,
}: IProfileInfoBadgeProps) => {
  return (
    <div className="bg-neutral-900 rounded-3xl p-4 flex justify-between items-start h-[124px]">
      <div className="flex space-x-4">
        {currentProfile.imageUrl ? (
          <Image
            width={96}
            height={96}
            alt="avatar"
            src={currentProfile.imageUrl}
            className="rounded-xl"
          />
        ) : (
          <div className="h-24 w-24 flex items-center justify-center">
            <UserRound className="h-16 w-16" />
          </div>
        )}

        <div className="flex flex-col justify-between">
          <p className="font-medium text-xl">
            {currentProfile.firstname} <br />
            {currentProfile.surname}
          </p>
          <p className="text-gray-400 text-sm">{currentProfile.birthday}</p>
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
