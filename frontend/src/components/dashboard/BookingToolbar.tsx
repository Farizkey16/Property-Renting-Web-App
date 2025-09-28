import { FetchBookingsParams } from "@/services/transactions.services";
import { CardTitle } from "../ui/card";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { FilterPopover } from "../fragment/filter-popover/FilterPopover";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

type BookingsToolbarProps = {
  filters: FetchBookingsParams;
  onFilterChange: (
    key: keyof FetchBookingsParams,
    value: string | null
  ) => void;
  onClearFilters: () => void;
};

export const BookingsToolbar = ({
  filters,
  onFilterChange,
  onClearFilters,
}: BookingsToolbarProps) => {
  const [inputValue, setInputValue] = useState(filters.bookingId || "");
  const [debouncedSearchTerm] = useDebounce(inputValue, 500);

  useEffect(() => {
    onFilterChange('bookingId', debouncedSearchTerm)
  }, [debouncedSearchTerm, onFilterChange])

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-5">
      <CardTitle className="text-xl font-semibold">Your Bookings</CardTitle>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by Booking Ref. ID..."
            className="pl-10 w-full sm:w-64"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <FilterPopover
          filters={filters}
          onFilterChange={onFilterChange}
          onClearFilters={onClearFilters}
        />
      </div>
    </div>
  );
};
