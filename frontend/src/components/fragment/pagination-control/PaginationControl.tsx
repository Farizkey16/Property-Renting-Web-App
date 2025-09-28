
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../ui/pagination";
import { usePagination, ellipses } from "@/hooks/usePagination";

type PaginationControlsProps = {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
  siblingCount?: number;
};

export const PaginationControl = ({
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
}: PaginationControlsProps) => {
  const {paginationRange, totalPageCount} = usePagination({
    currentPage,
    totalCount: totalItems,
    pageSize,
  });


  if (currentPage === 0 || !paginationRange || paginationRange.length < 1) {
    return null;
  }

  return (
    <Pagination className="py-3">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer"
            onClick={() =>
              onPageChange(currentPage <= 1 ? currentPage : currentPage - 1)
            }
          />
        </PaginationItem>

        {paginationRange!.map((pageNum, index) => {
          if (pageNum === ellipses) {
            return (
              <PaginationItem key={`ellipses-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                className="cursor-pointer"
                onClick={() => onPageChange(pageNum as number)}
                isActive={currentPage === pageNum}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            className="cursor-pointer"
            onClick={() =>
              onPageChange(
                currentPage >= totalPageCount ? currentPage : currentPage + 1
              )
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
