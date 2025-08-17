import { ChevronRight } from "lucide-react";

export const InfoCard = ({
  icon,
  title,
  onClick,
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-neutral-900 rounded-3xl h-full flex flex-col justify-between p-4 gap-2 cursor-pointer"
    >
      <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-zinc-600 leading-4">{title}</span>
        <ChevronRight className="text-zinc-600" />
      </div>
    </div>
  );
};
