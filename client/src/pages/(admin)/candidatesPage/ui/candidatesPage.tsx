import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, SlidersHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table/table";
import { cn } from "@/shared/lib/utils/twMerge";
import { useActions } from "@/shared/hooks/useActions";
import { EDrawerVariables } from "@/shared";
import { IconButton } from "@/shared/ui/button/iconButton";
import { useNavigate } from "react-router-dom";
import { CandidateFilterContent } from "@/features/candidate/ui/candidateFilterContent";
import { TablePagination } from "@/shared/ui/table/pagination";
import { Candidate } from "@/entities/candidate/types/types";
import { useGetCandidates } from "@/entities/candidate/hooks/useGetCandidates";

export const CandidatesPage = () => {
  const navigate = useNavigate();
  const { setOpenDrawer } = useActions();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const { data: candidates } = useGetCandidates();

  const handleOpenCandidateDrawer = (candidate: Candidate) => {
    setOpenDrawer({
      isOpen: true,
      type: EDrawerVariables.CANDIDATE_DRAWER,
      data: { candidate },
    });
  };
  const handleOpenCandidateFilterDrawer = () => {
    setOpenDrawer({
      isOpen: true,
      type: EDrawerVariables.CANDIDATE_FILTER_DRAWER,
      data: {
        children: <CandidateFilterContent table={table} />,
      },
    });
  };

  const handleBackPage = () => navigate(-1);

  const columns: ColumnDef<Candidate>[] = [
    {
      accessorKey: "name",
      header: () => (
        <div className="text-start uppercase font-semibold text-xs text-zinc-300">
          Имя
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-start text-[13px] text-zinc-300">
          {row.getValue("name")}
        </div>
      ),
    },
    {
      accessorKey: "vacancy",
      header: () => (
        <div className="text-start uppercase font-semibold text-xs text-zinc-300">
          Вакансия
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-start text-[13px] text-zinc-300">
          {(row.getValue("vacancy") as Candidate["vacancy"]).post}
        </div>
      ),
      filterFn: (row: Row<Candidate>, id: string, value: string) =>
        (row.getValue(id) as string)
          .toLowerCase()
          .includes(value.toLowerCase()),
    },
    {
      accessorKey: "status",
      header: () => (
        <div className="text-start uppercase font-semibold text-xs text-zinc-300">
          Статус
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-start text-[13px] text-zinc-300">
          {row.getValue("status")}
        </div>
      ),
    },
    {
      accessorKey: "match",
      header: () => (
        <div className="text-start uppercase font-semibold text-xs text-zinc-300">
          Процент соответствия
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-start text-[13px] text-zinc-300">
          {row.getValue("match")}%
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <button
          className="uppercase font-semibold text-xs text-zinc-300"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Дата обработки
        </button>
      ),
      cell: ({ row }) => (
        <div className="lowercase text-[13px] text-zinc-300">
          {row.getValue("date")}
        </div>
      ),
    },
  ];

  const table = useReactTable<Candidate>({
    data: candidates ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full rounded-xl max-w-[1070px] mx-auto shadow-lg">
      <div className="flex justify-start items-center">
        <IconButton
          ariaLabel="вернуться назад"
          onClick={handleBackPage}
          className="bg-neutral-900"
        >
          <ChevronLeft className="h-6 w-6 text-zinc-300" />
        </IconButton>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 gap-4">
        <h2 className="text-zinc-300 hidden md:inline font-semibold text-xl">
          Кандидаты
        </h2>
        <button
          className="flex cursor-pointer items-center gap-2 w-full text-zinc-300 justify-between  bg-neutral-900 hover:bg-neutral-800 transition-colors px-4 py-3 rounded-xl"
          onClick={handleOpenCandidateFilterDrawer}
        >
          <div className="flex space-x-2 items-center">
            <SlidersHorizontal className="w-4 h-4 text-zinc-400" />
            <span className="text-sm">Расширенные фильтры</span>
          </div>
          <span className="bg-[#3361EC] text-xs px-2 py-0.5 rounded-full ml-1">
            1
          </span>
        </button>
      </div>
      <div className="rounded-xl p-2 overflow-x-auto bg-neutral-900 ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-zinc-700 hover:bg-zinc-800/50 transition-colors"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-zinc-300 text-[13px] font-semibold uppercase py-3"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-zinc-700 hover:bg-zinc-800/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "text-zinc-300 text-[13px] py-5",
                        cell.column.id === "actions" && "text-end"
                      )}
                      onClick={() =>
                        handleOpenCandidateDrawer(cell.row.original)
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-zinc-300 text-[13px]"
                >
                  Нет результатов
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 p-4">
        <div className="flex-1 text-sm text-zinc-300">
          Выбрано: {table.getFilteredSelectedRowModel().rows.length} из{" "}
          {table.getFilteredRowModel().rows.length} строк
        </div>
        <TablePagination table={table} />
      </div>
    </div>
  );
};

export default CandidatesPage;
