import { SearchInput } from "@/shared/ui/input/searchInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select/select";
import { Input } from "@/shared/ui/input";
import { Table } from "@tanstack/react-table";
import { motion } from "framer-motion";
import { Button } from "@/shared/ui";
import { X } from "lucide-react";
import React, { ChangeEvent } from "react";
import { Candidate } from "@/entities/candidate/types/types";

interface CandidateFilterContentProps {
  table: Table<Candidate>;
}

export const CandidateFilterContent = ({
  table,
}: CandidateFilterContentProps) => {
  const [nameFilter, setNameFilter] = React.useState<string>(
    (table.getColumn("name")?.getFilterValue() as string) ?? ""
  );

  const [vacancyFilter, setVacancyFilter] = React.useState<string>(
    (table.getColumn("vacancy")?.getFilterValue() as string) ?? ""
  );

  const [dateFilter, setDateFilter] = React.useState<string>(
    (table.getColumn("date")?.getFilterValue() as string) ?? ""
  );

  const [statusFilter, setStatusFilter] = React.useState<string>(
    (table.getColumn("status")?.getFilterValue() as string) ?? ""
  );

  const handleClearFilters = () => {
    table.getColumn("name")?.setFilterValue("");
    table.getColumn("status")?.setFilterValue("");
    table.getColumn("vacancy")?.setFilterValue("");
    table.getColumn("date")?.setFilterValue("");

    setNameFilter("");
    setVacancyFilter("");
    setDateFilter("");
  };

  const handleSetNameFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNameFilter(value);
    table.getColumn("name")?.setFilterValue(value);
  };

  const handleSetVacancyFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setVacancyFilter(value);
    table.getColumn("vacancy")?.setFilterValue(value);
  };

  const handleSetDateFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDateFilter(value);
    table.getColumn("date")?.setFilterValue(value);
  };

  const handleSetStatusFilter = (value: string) => {
    setStatusFilter(value);
    table.getColumn("status")?.setFilterValue(value);
  };

  return (
    <motion.section
      className="flex flex-col items-start sm:items-center w-full space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="w-full"
      >
        <SearchInput
          placeholder="Поиск по имени..."
          value={nameFilter}
          onChange={handleSetNameFilter}
          className="text-[13px] bg-neutral-900 border border-zinc-700 focus:ring-indigo-500 rounded-xl"
          containerClassName="w-full"
          iconClassName="text-zinc-300"
        />
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="w-full"
      >
        <Select value={statusFilter} onValueChange={handleSetStatusFilter}>
          <SelectTrigger className="w-full rounded-xl bg-neutral-900 border-zinc-700 text-zinc-300 text-[13px] focus:ring-1 focus:ring-indigo-500">
            <SelectValue placeholder="Фильтр по статусу" />
          </SelectTrigger>
          <SelectContent className="bg-neutral-900 border-zinc-700 text-zinc-300 rounded-xl">
            <SelectItem value="цв">Все статусы</SelectItem>
            <SelectItem value="В обработке">В обработке</SelectItem>
            <SelectItem value="Прошли">Прошли</SelectItem>
            <SelectItem value="Отказ">Отказ</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="w-full"
      >
        <SearchInput
          placeholder="Фильтр по вакансии"
          value={vacancyFilter}
          onChange={handleSetVacancyFilter}
          className="text-[13px] bg-neutral-900 border border-zinc-700 focus:ring-indigo-500 rounded-xl"
          containerClassName="w-full"
          iconClassName="text-zinc-300"
        />
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="w-full"
      >
        <Input
          type="date"
          placeholder="Фильтр по дате"
          value={dateFilter}
          onChange={handleSetDateFilter}
          className="w-full rounded-xl border bg-neutral-900 border-zinc-700 text-zinc-300 text-[13px] focus:ring-1 focus:ring-indigo-500"
        />
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="w-full"
      >
        <Button
          className="flex items-center space-x-1 w-full rounded-xl text-zinc-300 text-[13px] p-2 px-4 hover:bg-zinc-800 font-medium bg-neutral-900 border border-zinc-700 focus:ring-1 focus:ring-indigo-500"
          onClick={handleClearFilters}
        >
          <X className="w-4 h-4" />
          <span>Сбросить</span>
        </Button>
      </motion.div>
    </motion.section>
  );
};
