// app/dashboard/bookings/components/FilterPopover.tsx

'use client';

import * as Popover from '@radix-ui/react-popover';
import { Filter } from 'lucide-react';

// Import styled components from your UI library
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Import the types and constants
import { FetchBookingsParams } from '@/services/transactions.services';
import { VALID_BOOKING_STATUS, BookingStatus } from '@/types/transactions/transactions';

// Define the component's props
type FilterPopoverProps = {
  filters: FetchBookingsParams;
  onFilterChange: (key: keyof FetchBookingsParams, value: string | null) => void;
  onClearFilters: () => void;
};

export const FilterPopover = ({
  filters,
  onFilterChange,
  onClearFilters,
}: FilterPopoverProps) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="w-80 rounded-lg border bg-white p-4 shadow-md outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
          sideOffset={7}
        >
          <div className="grid gap-6">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Filters</h4>
              <p className="text-sm text-muted-foreground">
                Refine the results based on your criteria.
              </p>
            </div>
            
            <div className="grid gap-4">
              {/* --- Status Filter --- */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => onFilterChange('status', value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    {VALID_BOOKING_STATUS.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* --- Sort Filter --- */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sort" className="text-right">
                  Sort By
                </Label>
                <Select
                  value={filters.sort}
                  onValueChange={(value) => onFilterChange('sort', value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">Newest First</SelectItem>
                    <SelectItem value="asc">Oldest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* --- Start Date Filter --- */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="start-date" className="text-right">
                  Start Date
                </Label>
                <Input
                  id="start-date"
                  type="date"
                  className="col-span-3"
                  value={filters.start || ''}
                  onChange={(e) => onFilterChange('start', e.target.value)}
                />
              </div>

              {/* --- Booking ID Filter --- */}

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="start-date" className="text-right">
                  Booking ID
                </Label>
                <Input
                  id="booking-id"
                  type="search"
                  className="col-span-3"
                  value={filters.bookingId || ''}
                  ={(e) => onFilterChange('bookingId', e.target.value)}
                />
              </div>
            </div>

            <Button variant="ghost" size="sm" onClick={onClearFilters}>
              Clear All Filters
            </Button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};