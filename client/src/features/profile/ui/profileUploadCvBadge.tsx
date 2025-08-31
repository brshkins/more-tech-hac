import { FileTextIcon, Pen } from "lucide-react";

interface ProfileUploadCvBadgeProps {
  profileCv: string;
  onClick: VoidFunction;
}

export const ProfileUploadCvBadge = ({
  profileCv,
  onClick,
}: ProfileUploadCvBadgeProps) => {
  const currentDate = new Date().toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="bg-neutral-900 rounded-3xl p-4 flex justify-between items-start h-[124px]">
      <div className="flex flex-col justify-between h-full">
        <button className="text-gray-400 h-9 w-9 justify-center hover:text-white border-zinc-600 border cursor-pointer bg-zinc-800 flex items-center rounded-full p-2">
          <FileTextIcon className="w-4 h-4" />
        </button>
        {profileCv ? (
          <div>
            <a
              href={profileCv}
              className="text-sm font-medium underline text-blue-600"
            >
              Ваше резюме
            </a>
            <p className="text-xs text-gray-400">{currentDate}</p>
          </div>
        ) : (
          <p className="text-red-500 text-sm font-medium">CV не загружено</p>
        )}
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
