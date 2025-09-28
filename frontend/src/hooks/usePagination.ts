import { useMemo } from "react";

export const ellipses = "...";

interface UsePaginationProps {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
}

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: UsePaginationProps) => {
  const {paginationRange, totalPageCount} = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    const pages = new Set<number>();

    for (let i = -siblingCount; i <= siblingCount; i++) {
      const page = currentPage + i;
      if (page > 0 && page <= totalPageCount) {
        pages.add(page);
      }
    }

    pages.add(1);
    pages.add(totalPageCount);

    const sortedPages = Array.from(pages).sort((a, b) => a - b);
    const result: (number | string)[] = [];
    let lastPage: number | null = null;

    for (const page of sortedPages) {
      if (lastPage !== null && page - lastPage > 1) {
        result.push(ellipses);
      }
      result.push(page);
      lastPage = page;
    }

    return {paginationRange: result, totalPageCount}
  }, [totalCount, pageSize, siblingCount, currentPage]);
  return {paginationRange, totalPageCount};
};
