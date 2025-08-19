import { Image } from "@/shared/ui";
import { IconButton } from "@/shared/ui/button/iconButton";
import { Check, ChevronRight, X } from "lucide-react";
import { Interview } from "../types/types";

interface InterviewItemProps {
  interview: Interview;
}

export const InterviewItem = ({ interview }: InterviewItemProps) => {
  return (
    <div className="bg-neutral-900 text-white rounded-3xl p-4 flex flex-col gap-2 shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={interview.company.iconUrl}
            alt={interview.company.name}
            width={20}
            height={20}
            className="rounded-md object-cover"
          />
          <p className="font-semibold text-sm text-zinc-500">
            {interview.company.name}
          </p>
        </div>
        <button className="p-1">
          {interview.status === "cancelled" ? (
            <X className="text-red-600" />
          ) : (
            <Check className="text-blue-600" />
          )}
        </button>
      </div>

      <section className="flex justify-between items-center">
        <div className="flex flex-col">
          <h3 className="text-lg font-medium">{interview.post}</h3>
          <p className="text-zinc-600">{interview.date}</p>
        </div>

        <div className="flex">
          <IconButton
            value={interview.id}
            ariaLabel="Перейти к вакансии"
            className="bg-zinc-800 hover:bg-neutral-700"
          >
            <ChevronRight className="w-5 h-5 text-zinc-500" />
          </IconButton>
        </div>
      </section>
    </div>
  );
};
