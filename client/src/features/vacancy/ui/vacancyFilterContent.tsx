import { vacancySelectors } from "@/entities/vacancy/model/store/vacancySlice";
import { VacancyFilter } from "@/entities/vacancy/types/types";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { Input } from "@/shared/ui/input";
import { Slider } from "@/shared/ui/slider/slider";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle/toggle-group";
import {
  ChangeEvent,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";

export const VacancyFilterContent = forwardRef((_, ref) => {
  const vacancyFIlters = useAppSelector(vacancySelectors.vacancyFIlters);
  const { setVacancyFilters, resetFilters } = useActions();
  const [vacancyLocalFilters, setVacancyLocalFilters] = useState<
    Partial<VacancyFilter>
  >({ ...vacancyFIlters });

  const handleSetVacancyFilter = useCallback((selectFilter: string) => {
    const [key, value] = selectFilter.split(":");

    if (!key || !value) {
      return;
    }

    setVacancyLocalFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSalaryChange = useCallback((value: number[]) => {
    setVacancyLocalFilters((prev) => ({ ...prev, salary: String(value) }));
  }, []);

  const handleChangeVacancyFilter = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setVacancyLocalFilters((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );

  useImperativeHandle(ref, () => ({
    applyFilters: () => setVacancyFilters(vacancyLocalFilters),
    resetFilters: () => resetFilters(),
  }));

  return (
    <div className="flex flex-col px-4 py-2 space-y-4">
      <div className="flex flex-col space-y-2">
        <span className="text-sm font-medium text-gray-300">
          Ключевые слова
        </span>
        <Input
          value={vacancyLocalFilters.tags ?? ""}
          name="tags"
          className={
            "py-6 bg-neutral-900 text-zinc-300 rounded-xl shadow-sm border-neutral-900"
          }
          placeholder="Ключевые слова"
          onChange={handleChangeVacancyFilter}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <span className="text-sm font-medium text-gray-300">Зарплата</span>
        <Slider
          defaultValue={[0]}
          max={300000}
          step={10000}
          value={[Number(vacancyLocalFilters.salary ?? 0)]}
          onValueChange={handleSalaryChange}
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>от 40 000 ₽</span>
          <span>до 300 000 ₽</span>
        </div>
        {vacancyLocalFilters.salary && (
          <div className="text-xs text-gray-300">
            Выбрано: от{" "}
            {Number(vacancyLocalFilters.salary).toLocaleString("ru-RU")} ₽
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <span className="text-sm font-medium text-gray-300">Регион</span>
        <Input
          value={vacancyLocalFilters.region ?? ""}
          name="region"
          className={
            "py-6 bg-neutral-900 text-zinc-300 rounded-xl shadow-sm border-neutral-900"
          }
          placeholder="Регион"
          onChange={handleChangeVacancyFilter}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <span className="text-sm font-medium text-gray-300">Занятость</span>
        <ToggleGroup
          type="single"
          value={
            vacancyLocalFilters.busyness
              ? `busyness:${vacancyLocalFilters.busyness}`
              : ""
          }
          className="flex gap-2"
          onValueChange={handleSetVacancyFilter}
        >
          <ToggleGroupItem
            value="busyness:Фултайм"
            className="rounded-full px-4 py-1 text-gray-300 
               bg-neutral-900 transition 
               data-[state=on]:bg-blue-600 data-[state=on]:text-white 
               data-[state=on]:border-blue-600 shadow-sm"
          >
            Фултайм
          </ToggleGroupItem>
          <ToggleGroupItem
            value="busyness:Частичная"
            className="rounded-full px-4 py-1 text-gray-300 
               bg-neutral-900 transition 
               data-[state=on]:bg-blue-600 data-[state=on]:text-white 
               data-[state=on]:border-blue-600 shadow-sm"
          >
            Частичная
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex flex-col space-y-2">
        <span className="text-sm font-medium text-gray-300">Опыт работы</span>
        <ToggleGroup
          type="single"
          value={
            vacancyLocalFilters.experience
              ? `experience:${vacancyLocalFilters.experience}`
              : ""
          }
          className="flex gap-2"
          onValueChange={handleSetVacancyFilter}
        >
          <ToggleGroupItem
            value="experience:Нет опыта"
            className="rounded-full px-8 py-1 text-gray-300 
               bg-neutral-900 transition 
               data-[state=on]:bg-blue-600 data-[state=on]:text-white 
               data-[state=on]:border-blue-600 shadow-sm"
          >
            Нет опыта
          </ToggleGroupItem>
          <ToggleGroupItem
            value="experience:1-3"
            className="rounded-full px-4 py-1 text-gray-300 
               bg-neutral-900 transition 
               data-[state=on]:bg-blue-600 data-[state=on]:text-white 
               data-[state=on]:border-blue-600 shadow-sm"
          >
            1-3
          </ToggleGroupItem>
          <ToggleGroupItem
            value="experience:3-6"
            className="rounded-full px-4 py-1 text-gray-300 
               bg-neutral-900 transition 
               data-[state=on]:bg-blue-600 data-[state=on]:text-white 
               data-[state=on]:border-blue-600 shadow-sm"
          >
            3-6
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex flex-col space-y-2">
        <span className="text-sm font-medium text-gray-300">Формат</span>
        <ToggleGroup
          type="single"
          value={
            vacancyLocalFilters.format
              ? `format:${vacancyLocalFilters.format}`
              : ""
          }
          className="flex gap-2"
          onValueChange={handleSetVacancyFilter}
        >
          <ToggleGroupItem
            value="format:Офис"
            className="rounded-full px-4 py-1 text-gray-300 
               bg-neutral-900 transition 
               data-[state=on]:bg-blue-600 data-[state=on]:text-white 
               data-[state=on]:border-blue-600 shadow-sm"
          >
            Офис
          </ToggleGroupItem>
          <ToggleGroupItem
            value="format:Гибрид"
            className="rounded-full px-4 py-1 text-gray-300 
               bg-neutral-900 transition 
               data-[state=on]:bg-blue-600 data-[state=on]:text-white 
               data-[state=on]:border-blue-600 shadow-sm"
          >
            Гибрид
          </ToggleGroupItem>
          <ToggleGroupItem
            value="format:Удалённо"
            className="rounded-full px-5 py-1 text-gray-300 
               bg-neutral-900 transition 
               data-[state=on]:bg-blue-600 data-[state=on]:text-white 
               data-[state=on]:border-blue-600 shadow-sm"
          >
            Удалённо
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
});
