"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { addDays, format, startOfMonth, endOfMonth, subDays } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AnalyticsDateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined;
  onDateChange: (date: DateRange | undefined) => void;
}

export function AnalyticsDateRangePicker({
  className,
  date,
  onDateChange,
}: AnalyticsDateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handlePresetClick = (range: '7d' | '30d' | 'thisMonth') => {
    const today = new Date();
    let newDate: DateRange | undefined;

    switch (range) {
      case '7d':
        newDate = { from: subDays(today, 6), to: today };
        break;
      case '30d':
        newDate = { from: subDays(today, 29), to: today };
        break;
      case 'thisMonth':
        newDate = { from: startOfMonth(today), to: endOfMonth(today) };
        break;
    }
    onDateChange(newDate);
    setIsOpen(false); 
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 flex" align="end">
          
          <div className="flex flex-col space-y-2 border-r p-3">
            <Button variant="ghost" className="justify-start px-2" onClick={() => handlePresetClick('7d')}>Last 7 days</Button>
            <Button variant="ghost" className="justify-start px-2" onClick={() => handlePresetClick('30d')}>Last 30 days</Button>
            <Button variant="ghost" className="justify-start px-2" onClick={() => handlePresetClick('thisMonth')}>This Month</Button>
          </div>
          
          
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onDateChange}
            numberOfMonths={2}
            
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}