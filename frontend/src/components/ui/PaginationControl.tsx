"use client";

import { Booking, Meta } from "@/types/transactions/transactions";

import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

type PaginationControlsProps = {
  meta: Meta;
  onPageChange: (newPage: number) => void;
  nextPageLink: string;
  prevPageLink: string;
};

// export const PaginationControls = ({meta, onPageChange}: PaginationControlsProps) => {
//     return (
//         <div className="flex items-center justify-center space-x-4 mt-6">
//       <span className="text-sm font-medium text-muted-foreground">
//         Page {meta.page} of {meta.totalPages}
//       </span>
//       <div className="flex items-center space-x-2">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => onPageChange(meta.page - 1)}
//           disabled={meta.page <= 1}
//         >
//           <ChevronLeft className="h-4 w-4" />
//           <span className="sr-only">Previous Page</span>
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => onPageChange(meta.page + 1)}
//           disabled={meta.page >= meta.totalPages}
//         >
//           <span className="sr-only">Next Page</span>
//           <ChevronRight className="h-4 w-4" />
//         </Button>
//       </div>
//     </div>
//     )
// }

const Paginations = ({ meta, onPageChange }: PaginationControlsProps) => {
  const totalPages = meta.totalPages;
  const totalItems = meta.totalItems;
  const currentPage = meta.page;
  const limit = meta.limit;

  const allPages = [];

  for (let i = 0; i < totalPages; i++) {
    allPages.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() =>
              onPageChange(currentPage < 1 ? currentPage : currentPage - 1)
            }
          />
        </PaginationItem>

        {Array.from(
          allPages.map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink isActive={currentPage === index + 1}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))
        )}

        <PaginationItem>
          <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
