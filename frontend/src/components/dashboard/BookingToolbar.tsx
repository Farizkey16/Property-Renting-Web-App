import { FetchBookingsParams } from "@/services/transactions.services"
import { CardTitle } from "../ui/card";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { FilterPopover } from "../ui/FilterPopover";

type BookingsToolbarProps = {
    filters: FetchBookingsParams
    onFilterChange: (key: keyof FetchBookingsParams, value: string | null) => void;
    onClearFilters: () => void;
}




export const BookingsToolbar = ({filters, onFilterChange, onClearFilters}: BookingsToolbarProps) => {

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-5">
            <CardTitle className="text-xl font-semibold">
              Your Bookings
            </CardTitle>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search bookings..."
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <FilterPopover
                filters={filters}
                onFilterChange={onFilterChange}
                onClearFilters={onClearFilters}
              />
            </div>
          </div>
    )
}