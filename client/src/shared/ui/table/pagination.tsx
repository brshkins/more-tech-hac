import { Candidate } from "@/entities/candidate/types/types";
import { Button } from "@/shared/ui/button";
import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function TablePagination({ table }: { table: Table<Candidate> }) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const pageCount = table.getPageCount();
  const visiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  let endPage = Math.min(pageCount, startPage + visiblePages - 1);

  if (endPage - startPage + 1 < visiblePages) {
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  const handlePreviousPage = () => table.previousPage();
  const handleNextPage = () => table.nextPage();

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        onClick={handlePreviousPage}
        disabled={!table.getCanPreviousPage()}
        className="gap-1 px-2 flex text-zinc-300 items-center cursor-pointer"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {startPage > 1 && (
        <>
          <Button
            variant={currentPage === 1 ? "indigo" : "link"}
            size="sm"
            onClick={() => table.setPageIndex(0)}
            className="w-8 h-8 p-0 text-white"
          >
            1
          </Button>
          {startPage > 2 && <span className="px-2">...</span>}
        </>
      )}

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
        <Button
          key={startPage + i}
          variant={currentPage === startPage + i ? "indigo" : "link"}
          size="sm"
          onClick={() => table.setPageIndex(startPage + i - 1)}
          className="w-8 h-8 p-0 rounded-full text-white"
        >
          {startPage + i}
        </Button>
      ))}

      {endPage < pageCount && (
        <>
          {endPage < pageCount - 1 && <span className="px-2">...</span>}
          <Button
            variant={currentPage === pageCount ? "indigo" : "link"}
            size="sm"
            onClick={() => table.setPageIndex(pageCount - 1)}
            className="w-8 h-8 p-0 text-white"
          >
            {pageCount}
          </Button>
        </>
      )}

      <button
        onClick={handleNextPage}
        disabled={!table.getCanNextPage()}
        className="gap-1 px-2 flex text-zinc-300 items-center cursor-pointer"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
